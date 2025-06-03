import Charity from '../models/Charity';
import Category from '../models/Category';

export const getAllCharities = async (_req, res) => {
  try {
    const charities = await Charity.find().populate({path: 'donationDetails.userId' 
    });

    res.status(200).json(charities);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createCharity = async (req, res) => {
  try {
    const { title,category, name, description } = req.body;

    const categoryDoc = await Category.findOne({ category: category });

    if (!categoryDoc) {
    
      return res.status(404).json({ error: 'Category "Environment" not found' });
    }

    const charity = await Charity.create({
      title,
      name,
      description,
      category: categoryDoc._id
    });

    res.status(201).json(charity);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};


export const donateToCharity = async (req, res) => {
  const { id } = req.params;
  const { userId, donatedPoints } = req.body;

  try {
    const charity = await Charity.findById(id);
    if (!charity) {
      return res.status(404).json({ error: 'Charity not found' });
    }

    charity.donationDetails.push({ userId, donatedPoints });
    await charity.save();

    res.status(200).json({ message: 'Donation added successfully', charity });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const addCharityToCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const charity = await Charity.create(req.body);
    const updatedCategory = await Category.findOneAndUpdate(
      { category },
      { $push: { projects: charity._id } },
      { new: true }
    ).populate({
      path: 'projects',
      populate: { path: 'users' }
    });

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(201).json(updatedCategory);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getCharitiesByCategoryName = async (req, res) => {
  const { category } = req.params;

  try {
    const foundCategory = await Category.findOne({ category })
      .populate({
        path: 'projects',
        populate: { path: 'users' }
      });

    if (!foundCategory) {
      return res.status(404).json({ error: `Category "${category}" not found` });
    }

    res.status(200).json(foundCategory.projects);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
