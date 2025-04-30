export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  diet: string[];
  prepTime: string;
  likes: number;
  rating: number;
  image: string;
  instructions: string;
}
