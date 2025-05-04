import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../search.service';
import { Recipe } from '../models/recipe.model';
import {RouterLink} from '@angular/router';

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
  allDiets: string[] = [];
  selectedDiets: string[] = [];
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
    this.http.get<{ categories: { id: string; name: string }[] }>('http://localhost:3000/categories')
      .subscribe(data => {
        this.categories = data.categories;
      });
  }

  fetchRecipes(): void {
    this.http.get<Recipe[]>('http://localhost:3000/recipes')
      .subscribe(data => {
        this.allRecipes = data;
        this.filteredRecipes = data;
        this.allDiets = [...new Set(data.flatMap(recipe => recipe.diet || []))];
        this.applyFilters();
      });
  }

  filterRecipes(): void {
    const dietCheckboxes = document.querySelectorAll('input[type="checkbox"][value]');
    this.selectedDiets = Array.from(dietCheckboxes)
      .filter((checkbox: any) => checkbox.checked)
      .map((checkbox: any) => checkbox.value);

    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredRecipes = this.allRecipes.filter(recipe => {
      const matchesDiet =
        this.selectedDiets.length === 0 ||
        (Array.isArray(recipe.diet) &&
          this.selectedDiets.some(selectedDiet =>
            recipe.diet.some(diet => diet.toLowerCase() === selectedDiet.toLowerCase())
          ));

      const matchesSearch =
        this.searchQuery === '' ||
        (recipe.name && recipe.name.toLowerCase().includes(this.searchQuery));

      return matchesDiet && matchesSearch;
    });
  }
}
