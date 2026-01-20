
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage: string;
  rating: number;
  available: boolean;
  year: number;
}

export interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
