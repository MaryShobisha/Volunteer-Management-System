import Category from '../models/Category';
import Project from '../models/Project';

export const addProjectToCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const project = await Project.create(req.body);
    const updated = await Category.findOneAndUpdate(
      {category},
      { $push: { projects: project._id } },
      { new: true }
    )
    .populate({
      path: 'projects',
      populate: { path: 'users' }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.status(201).json(updated);
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
};

export const getProjectsByCategoryName = async (req, res) => {
    const { category } = req.params;
    try {
      // 1. Find the category by name and populate its projects → users
      const found = await Category.findOne({ category })
        .populate({
          path: 'projects',
          populate: { path: 'users' }
        });
  
      if (!found) {
        return res.status(404).json({ error: `Category "${category}" not found` });
      }
  
      // 2. Return the populated projects array
      return res.status(200).json(found.projects);
    } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
    }
  };
