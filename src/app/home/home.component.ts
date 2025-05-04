import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../search.service';
import { Recipe } from '../models/recipe.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class HomeComponent implements OnInit {
  categories: { id: string; name: string }[] = [];
  allRecipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  selectedCategory: string = '';
  searchQuery: string = '';

  constructor(private http: HttpClient, private searchService: SearchService) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchRecipes();

    this.searchService.currentQuery.subscribe(query => {
      this.searchQuery = query.toLowerCase();
      this.applyFilters();
    });
  }

  fetchCategories(): void {
    this.http.get<{ id: string; name: string }[]>('http://localhost:3000/categories')
      .subscribe(data => {
        this.categories = data;
        console.log(this.categories);
      });
  }

  fetchRecipes(): void {
    this.http.get<Recipe[]>('http://localhost:3000/recipes')
      .subscribe(data => {
        this.allRecipes = data;
        this.filteredRecipes = data;
        this.applyFilters();
      });
  }
  filterByCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.applyFilters();
  }


  applyFilters(): void {
    this.filteredRecipes = this.allRecipes.filter(recipe => {
      const matchesCategory =
        !this.selectedCategory || recipe.cuisine === this.selectedCategory;

      const matchesSearch =
        this.searchQuery === '' ||
        (recipe.name && recipe.name.toLowerCase().includes(this.searchQuery));

      return matchesCategory && matchesSearch;
    });
  }

  getCategoryNameById(id: string): string | undefined {
    return this.categories.find(cat => cat.id === id)?.name;
  }
}
