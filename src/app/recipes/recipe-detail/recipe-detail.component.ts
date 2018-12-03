import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../resipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // const id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params
      .subscribe((params: Params) =>{
        this.id = +params['id'];
       this.recipe = this.recipeService.getRecipe(this.id);
        console.log(this.recipe)
      })
      
  }

  onAddInShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onRecipeEdit(){
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute})
  }

}
