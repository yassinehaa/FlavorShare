import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from './models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private httpclient: HttpClient) {
  }

  getRecipes(): Observable<Recipe[]> {
    return this.httpclient.get<Recipe[]>(this.apiUrl);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.httpclient.get<Recipe>(`${this.apiUrl}/${id}`);
  }
}
