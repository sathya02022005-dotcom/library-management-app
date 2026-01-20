
import { Book } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    description: 'A story of wealth, love, and the American Dream in the 1920s.',
    coverImage: 'https://picsum.photos/seed/gatsby/400/600',
    rating: 4.5,
    available: true,
    year: 1925
  },
  {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Sci-Fi',
    description: 'A sprawling space epic about politics, religion, and giant sandworms.',
    coverImage: 'https://picsum.photos/seed/dune/400/600',
    rating: 4.8,
    available: true,
    year: 1965
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    description: 'An easy and proven way to build good habits and break bad ones.',
    coverImage: 'https://picsum.photos/seed/habits/400/600',
    rating: 4.9,
    available: false,
    year: 2018
  },
  {
    id: '4',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    category: 'Thriller',
    description: 'A woman shoots her husband five times and then never speaks another word.',
    coverImage: 'https://picsum.photos/seed/silent/400/600',
    rating: 4.2,
    available: true,
    year: 2019
  },
  {
    id: '5',
    title: 'Educated',
    author: 'Tara Westover',
    category: 'Memoir',
    description: 'A memoir about a young woman who leaves her survivalist family to pursue an education.',
    coverImage: 'https://picsum.photos/seed/educated/400/600',
    rating: 4.7,
    available: true,
    year: 2018
  },
  {
    id: '6',
    title: 'Circe',
    author: 'Madeline Miller',
    category: 'Fantasy',
    description: 'A bold reimagining of the myth of Circe, the daughter of Helios.',
    coverImage: 'https://picsum.photos/seed/circe/400/600',
    rating: 4.6,
    available: true,
    year: 2018
  }
];

export const CATEGORIES = ['All', 'Classic', 'Sci-Fi', 'Self-Help', 'Thriller', 'Memoir', 'Fantasy'];
