import { Router } from 'express';
import mongoose, { type Model } from 'mongoose';

export function createResourceRouter(model: Model<any>, resourceName: string) {
  const router = Router();

  router.get('/', async (_req, res, next) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        res.json([]);
        return;
      }

      const items = await model.find().lean();
      res.json(items);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        res.status(503).json({ message: 'Database unavailable' });
        return;
      }

      const item = await model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        res.status(503).json({ message: 'Database unavailable' });
        return;
      }

      const item = await model.findById(req.params.id).lean();

      if (!item) {
        res.status(404).json({ message: `${resourceName} not found` });
        return;
      }

      res.json(item);
    } catch (error) {
      next(error);
    }
  });

  return router;
}