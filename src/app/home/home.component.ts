import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterLink } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class HomeComponent implements OnInit {
  allrecipes: Recipe[] = [];

  constructor(private recipeservice: RecipesService) {}

  ngOnInit(): void {
    this.afficherrecipes();
  }

  afficherrecipes() {
    this.recipeservice.getRecipes().subscribe((rec) => {
      this.allrecipes = rec;
    });
  }
}
