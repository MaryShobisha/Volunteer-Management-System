import { Request, Response } from 'express';
import Project from '../models/Project';
import Badge from '../models/badge';

/**
 * Create a new badge
 */
export const createBadge = async (req, res) => {
  try {
    const { name, imageUrl, description, projectsThreshold } = req.body;
    const badge = await Badge.create({ name, imageUrl, description, projectsThreshold });
    return res.status(201).json(badge);
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
};

/**
 * Get all badges
 */
export const getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find().populate('users');
    return res.status(200).json(badges);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

/**
 * Get a badge by ID
 */
export const getBadgeById = async (req, res) => {
  try {
    const { id } = req.params;
    const badge = await Badge.findById(id).populate('users');
    if (!badge) return res.status(404).json({ error: 'Badge not found' });
    return res.status(200).json(badge);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

/**
 * Assign a user to badge when threshold met
 */
export const assignBadgeToUser = async (req, res) => {
  try {
    const { badgeId, userId } = req.params;
    // Verify user has completed enough projects
    const userProjectCount = await Project.countDocuments({ users: userId });
    const badge = await Badge.findById(badgeId);
    if (!badge) return res.status(404).json({ error: 'Badge not found' });
    if (userProjectCount < badge.projectsThreshold) {
      return res.status(400).json({ error: `User needs ${badge.projectsThreshold} projects to earn this badge.` });
    }
    // Add user to badge.users if not already
    if (!badge.users.includes(userId as any)) {
      badge.users.push(userId as any);
      await badge.save();
    }
    return res.status(200).json(badge);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
};

/**
 * Remove a user from a badge
 */
export const removeBadgeFromUser = async (req, res) => {
  try {
    const { badgeId, userId } = req.params;
    const badge = await Badge.findById(badgeId);
    if (!badge) return res.status(404).json({ error: 'Badge not found' });
    badge.users = badge.users.filter(u => u.toString() !== userId);
    await badge.save();
    return res.status(200).json(badge);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
};