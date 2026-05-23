import { Team } from '../models/Team';
import { createResourceRouter } from './createResourceRouter';

export const teamsRouter = createResourceRouter(Team, 'Team');