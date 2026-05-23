import { Activity } from '../models/Activity';
import { createResourceRouter } from './createResourceRouter';

export const activitiesRouter = createResourceRouter(Activity, 'Activity');