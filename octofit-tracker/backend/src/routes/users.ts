import { User } from '../models/User';
import { createResourceRouter } from './createResourceRouter';

export const usersRouter = createResourceRouter(User, 'User');