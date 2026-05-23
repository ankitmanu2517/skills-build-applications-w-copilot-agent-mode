import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');
  console.log(`Connecting to ${MONGO_URI}`);

  await mongoose.connect(MONGO_URI);

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      username: 'maya_runner',
      name: 'Maya Patel',
      email: 'maya.patel@mergington.edu',
      role: 'student',
      team: 'Blue Barracudas',
      fitnessLevel: 'advanced',
    },
    {
      username: 'jordan_lifts',
      name: 'Jordan Lee',
      email: 'jordan.lee@mergington.edu',
      role: 'student',
      team: 'Green Geckos',
      fitnessLevel: 'intermediate',
    },
    {
      username: 'sofia_steps',
      name: 'Sofia Rodriguez',
      email: 'sofia.rodriguez@mergington.edu',
      role: 'student',
      team: 'Blue Barracudas',
      fitnessLevel: 'beginner',
    },
    {
      username: 'ethan_cycle',
      name: 'Ethan Brooks',
      email: 'ethan.brooks@mergington.edu',
      role: 'student',
      team: 'Red Rockets',
      fitnessLevel: 'intermediate',
    },
    {
      username: 'coach_octo',
      name: 'Paul Octo',
      email: 'paul.octo@mergington.edu',
      role: 'coach',
      team: 'Mergington Fitness',
      fitnessLevel: 'advanced',
    },
  ]);

  const userByUsername = new Map(users.map((user) => [user.username, user]));

  await Team.insertMany([
    {
      name: 'Blue Barracudas',
      description: 'Distance-focused team building weekly cardio streaks.',
      coach: 'Paul Octo',
      members: ['maya_runner', 'sofia_steps'],
      totalPoints: 520,
    },
    {
      name: 'Green Geckos',
      description: 'Strength and conditioning crew focused on balanced training.',
      coach: 'Paul Octo',
      members: ['jordan_lifts'],
      totalPoints: 310,
    },
    {
      name: 'Red Rockets',
      description: 'High-energy cyclists and interval training fans.',
      coach: 'Paul Octo',
      members: ['ethan_cycle'],
      totalPoints: 275,
    },
  ]);

  await Activity.insertMany([
    {
      userId: userByUsername.get('maya_runner')?._id.toString(),
      type: 'Running',
      durationMinutes: 45,
      distanceMiles: 4.8,
      points: 180,
      loggedAt: new Date('2026-05-18T15:30:00Z'),
    },
    {
      userId: userByUsername.get('jordan_lifts')?._id.toString(),
      type: 'Strength Training',
      durationMinutes: 50,
      points: 150,
      loggedAt: new Date('2026-05-19T20:00:00Z'),
    },
    {
      userId: userByUsername.get('sofia_steps')?._id.toString(),
      type: 'Walking',
      durationMinutes: 35,
      distanceMiles: 2.1,
      points: 90,
      loggedAt: new Date('2026-05-20T13:15:00Z'),
    },
    {
      userId: userByUsername.get('ethan_cycle')?._id.toString(),
      type: 'Cycling',
      durationMinutes: 60,
      distanceMiles: 12.4,
      points: 175,
      loggedAt: new Date('2026-05-21T14:45:00Z'),
    },
    {
      userId: userByUsername.get('maya_runner')?._id.toString(),
      type: 'Yoga',
      durationMinutes: 25,
      points: 70,
      loggedAt: new Date('2026-05-22T12:00:00Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    {
      userId: userByUsername.get('maya_runner')?._id.toString(),
      username: 'maya_runner',
      team: 'Blue Barracudas',
      points: 250,
      rank: 1,
    },
    {
      userId: userByUsername.get('ethan_cycle')?._id.toString(),
      username: 'ethan_cycle',
      team: 'Red Rockets',
      points: 175,
      rank: 2,
    },
    {
      userId: userByUsername.get('jordan_lifts')?._id.toString(),
      username: 'jordan_lifts',
      team: 'Green Geckos',
      points: 150,
      rank: 3,
    },
    {
      userId: userByUsername.get('sofia_steps')?._id.toString(),
      username: 'sofia_steps',
      team: 'Blue Barracudas',
      points: 90,
      rank: 4,
    },
  ]);

  await Workout.insertMany([
    {
      title: 'Fresh Start Walk',
      description: 'A low-impact walk with gentle mobility work for new fitness trackers.',
      level: 'beginner',
      activityTypes: ['Walking', 'Mobility'],
      estimatedMinutes: 25,
    },
    {
      title: 'Cardio Builder Run',
      description: 'Intervals that alternate steady running with short recovery periods.',
      level: 'intermediate',
      activityTypes: ['Running'],
      estimatedMinutes: 35,
    },
    {
      title: 'Total Body Strength Circuit',
      description: 'A balanced circuit using bodyweight movements and light resistance.',
      level: 'intermediate',
      activityTypes: ['Strength Training'],
      estimatedMinutes: 40,
    },
    {
      title: 'Endurance Challenge Ride',
      description: 'A sustained cycling workout for students ready to build stamina.',
      level: 'advanced',
      activityTypes: ['Cycling'],
      estimatedMinutes: 55,
    },
  ]);

  console.log('Seed complete: users=5 teams=3 activities=5 leaderboard=4 workouts=4');
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });