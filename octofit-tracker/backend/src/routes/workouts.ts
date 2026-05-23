import { Workout } from '../models/Workout';
import { createResourceRouter } from './createResourceRouter';

export const workoutsRouter = createResourceRouter(Workout, 'Workout');