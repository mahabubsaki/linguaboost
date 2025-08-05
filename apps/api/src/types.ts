// Example API endpoint using shared custom types
import type { User, Lesson } from '@repo/types/shared';

// Mock data using our shared types
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://example.com/alice.jpg',
    level: 'intermediate'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://example.com/bob.jpg',
    level: 'beginner'
  }
];

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Basic Greetings',
    description: 'Learn how to greet people in Spanish',
    language: {
      code: 'es',
      name: 'Spanish',
      flag: '🇪🇸'
    },
    level: 'beginner',
    duration: 15,
    completed: false
  },
  {
    id: '2',
    title: 'French Pronunciation',
    description: 'Master French pronunciation basics',
    language: {
      code: 'fr',
      name: 'French',
      flag: '🇫🇷'
    },
    level: 'intermediate',
    duration: 25,
    completed: true
  }
];

export { mockUsers, mockLessons };
export type { User, Lesson };
