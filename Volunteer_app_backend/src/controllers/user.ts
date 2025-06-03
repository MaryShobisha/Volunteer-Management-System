import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { hashPassword, comparePassword, validatePasswordStrength, generateToken } from '../utils';
import Category from '../models/Category';
import Project from '../models/Project';
import { where } from 'sequelize';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {fullName, password, email,dob,contactNumber,userType } = req.body;

        const existingUser = await User.findOne({ where: { fullName } });
        if (existingUser) {
            res.status(400).json({ message: 'Username already exists.' });
            return;
        }

        try {
            validatePasswordStrength(password);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
                return;
            }
        }

        const hashedPassword = await hashPassword(password);
        await User.create({ fullName, password: hashedPassword, email,dob,contactNumber,userType });
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error registering user.' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: 'User not found.' });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid password.' });
      return;
    }

    // Include user.userType in the token
    const token = generateToken(user.id.toString(), user.userType.toString());

    res.json({
      message: 'Login successful',
      token,
      user: {
        username: user.fullName,
        email: user.email,
        userType: user.userType,      
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.' });
  }
};
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
      const resetLink = `${process.env.CLIENT_URL}/reset-password/${user.id}/${token}`;
  
      // Configure your email transporter
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 15 minutes.</p>`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending email.' });
    }
  };
  
  export const resetPassword = async (req, res) => {
    const { userId, token } = req.params;
    const { password } = req.body;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.id !== parseInt(userId)) {
        return res.status(400).json({ message: 'Invalid token.' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid or expired token.' });
    }
  };

  export const changePassword = async (req, res) => {
  const userId = req.userId;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect.' });
    }

    user.password = await hashPassword(newPassword);
    await user.save();
    console.log(newPassword)
    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

  export const getCurrentUser = async (req, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const user = await User.findById(req.userId)
        .select('-password')
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  export const updateCurrentUser = async (req, res) => {
    try {
      const userId = (req as any).userId;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { fullName, dob, contactNumber, email, address,
              emergencyContactName, emergencyContactNumber } = req.body;
  
      const updateData: any = { fullName, dob, contactNumber, email, address,
                                emergencyContactName, emergencyContactNumber };

  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }               
      )
        .select('-password')                              
        .populate('projects')                            
        .lean()
        .exec();
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User Details Updated Successfully' });
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  };


  export const applyToProject = async (req, res) => {
    try {
      const userId = (req as any).userId;
      console.log(req.body)
      const { projectId } = req.params;
      const {
        category,
        projectInterest,
        skillsInterests,
        previousExperience,
        weekdayAvailability,
        weekendAvailability,
        certificateUrl
      } = req.body;
  
      const application = {
        projectId,
        category,
        projectInterest,
        skillsInterests,
        previousExperience,
        certificateUrl,
        weekdayAvailability,
        weekendAvailability,
        appliedAt: new Date(),
      };
  
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { projects: application } },
        { new: true, runValidators: true }
      )
        .select('-password')
        .populate({
          path: 'projects.projectId',
          select: 'projectName location dateTime duration'
        })
        .lean()
        .exec();
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const added = user.projects.find(
        (app) => app.projectId._id.toString() === projectId
      );
      return res.status(201).json(added);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  };

  export const getCategoriesByUsers = async (req, res) => {
    try {
      const userId = (req as any).userId;
      const user = await User.findById(
        userId,
      )
        .select('-password')
        .populate({
          path: 'projects.projectId',
          select: 'projectName location dateTime duration'
        })
        .lean()
        .exec();

      const projects = user.projects
      const categories = [...new Set(projects.map(project => project.category))];
const categoryList = await Promise.all(
  categories.map(category => Category.findOne({ category }).select('category description').lean())
);
      return res.status(200).json(categoryList);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }

  export const getProjectsByUsers = async (req, res) => {
    try {
      const userId = (req as any).userId;
      console.log(req.userId)
      const user = await User.findById(
        userId,
      )
        .select('-password')
        .populate({
          path: 'projects.projectId',
          select: 'projectName location dateTime duration'
        })
        .lean()
        .exec();

      const projects = user.projects
      console.log()
      
      return res.status(200).json(projects);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }

  const WeekDays = Object.freeze({
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
});
  const Months = Object.freeze({
    JANUARY: 0,
    FEBRUARY: 1,
    MARCH: 2,
    APRIL: 3,
    MAY: 4,
    JUNE: 5,
    JULY: 6,
    AUGUST: 7,
    SEPTEMBER: 8,
    OCTOBER: 9,
    NOVEMBER: 10,
    DECEMBER: 11
});

// Month mapping
const monthMap = {
  January: 0, February: 1, March: 2, April: 3, May: 4,
  June: 5, July: 6, August: 7, September: 8, October: 9,
  November: 10, December: 11
};

// Parse duration like "3 months (June - August 2025)"
function parseDuration(durationStr) {
  const match = durationStr.match(/\((\w+) - (\w+) (\d{4})\)/);
  if (!match) return null;
  const [_, startMonth, endMonth, year] = match;
  const start = new Date(year, monthMap[startMonth], 1);
  const end = new Date(year, monthMap[endMonth] + 1, 0); // last day of end month
  return { start, end };
}

// Parse dateTime like "Every Saturday, 9.00 AM - 1.00 PM"
function parseDayAndTime(dateTimeStr) {
  const match = dateTimeStr.match(/Every (\w+), (\d{1,2})\.(\d{2}) [APM]{2} - (\d{1,2})\.(\d{2}) [APM]{2}/);
  if (!match) return null;
  const dayMap = {
    Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
    Thursday: 4, Friday: 5, Saturday: 6
  };
  const [, day, startH, startM, endH, endM] = match;
  return {
    dayIndex: dayMap[day],
    startHour: parseInt(startH),
    startMinute: parseInt(startM)
  };
}

  function generateEventDates(start, end, dayIndex, hour, minute) {
    const results = [];
    let current = new Date(start);
    while (current <= end) {
      if (current.getDay() === dayIndex) {
        const event = new Date(current);
        event.setHours(hour);
        event.setMinutes(minute);
        results.push(new Date(event));
      }
      current.setDate(current.getDate() + 1);
    }
    return results;
  }

  function createNewProject(project,eventDate,projectCategory,projectDescription,projectTotalSlot,projectUsersCount){

    let newProject = {
      id: project._id,
      title: project.projectName,
      date: eventDate.toString(), 
      category: projectCategory,
      description:
        projectDescription,
      location: project.location,
      slots: projectTotalSlot,
      participants: projectUsersCount,
    }
    return newProject;
  }
  export const getProjectsDetailByUsers = async (req, res) => {
    try {
      const userId = (req as any).userId;
      const user = await User.findById(
        userId,
      )
        .select('-password')
        .populate({
          path: 'projects.projectId',
          select: 'projectName location dateTime duration description totalSlot users'
        })
        .lean()
        .exec();

      const projects = user.projects;
      let newProjects = [] 
      console.log(projects)
      for(let project in projects){
      const projectDetail = projects[project]['projectId'];
      const projectCategory = projects[project]['category'];
      const projectDescription = projectDetail['description']; 
      const projectTotalSlot = projectDetail['totalSlot'];
      const projectUsersCount = projectDetail['users'].length;
      const duration = parseDuration(projectDetail['duration']);
      const timeInfo = parseDayAndTime(projectDetail['dateTime']);
      const eventDates = generateEventDates(duration.start,duration.end,timeInfo.dayIndex,timeInfo.startHour,timeInfo.startMinute)
      eventDates.map((eventDate)=>
        newProjects.push(createNewProject(projectDetail,eventDate,projectCategory,projectDescription,projectTotalSlot,projectUsersCount))
      )
      }
      
      return res.status(200).json(newProjects);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }

export const getTotalUsersCount = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    return res.status(200).json([{ UserCount: totalUsers-1 }]);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getTotalProjectsCount = async (req, res) => {
  try {
    const totalUsers = await Project.countDocuments();
    return res.status(200).json([{ UserCount: totalUsers }]);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getTotalUsers = async (req,res) => {
  try{
    const totalUsers = await User.find({ userType: { $ne: 'admin' } });
    return res.status(200).json([{ Users: totalUsers }]);
  }catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ userType: 'volunteer' })
      .sort({ userPoints: -1 })
      .limit(10)
      .select('fullName userPoints');

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.fullName,
      score: user.userPoints,
    }));

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserPoints = async (req, res) => {
  const { userId } = req.params;
  const { points } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.userPoints = points;
    await user.save();

    res.json({ message: 'Points updated', userPoints: user.userPoints });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
