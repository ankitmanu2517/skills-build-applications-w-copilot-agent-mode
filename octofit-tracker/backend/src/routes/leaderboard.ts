import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { createResourceRouter } from './createResourceRouter';

export const leaderboardRouter = createResourceRouter(LeaderboardEntry, 'Leaderboard entry');