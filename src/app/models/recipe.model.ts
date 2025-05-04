export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  diet: string[];
  prepTime: string;
  likes: number;
  rating: number;
  image: string;
  instructions: string;
  author: string;
  authorId: string;
}

export interface Comment {
  id: string;
  recipeId: string;
  userId: string;
  author: string;
  content: string;
}

interface UserComment {
  id: string;
  targetUserId: string;
  userId: string;
  author: string;
  content: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}
export interface AuthResponse {
  user: User;
  token?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Database {
  recipes: Recipe[];
  comments: Comment[];
  userComments: UserComment[];
  users: User[];
  categories: Category[];
}
