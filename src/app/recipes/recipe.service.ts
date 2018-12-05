import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

   private recipes: Recipe[] = [
        new Recipe('Shnizzel', 'I did not try a shnizzel', 'http://blumfarr.de/wp-content/uploads/2015/03/gg.de-15.jpg', [new Ingredient('meat', 1), new Ingredient('Fry potato', 5)]),
        new Recipe('Burger', 'Supper burger', 'https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg', [new Ingredient('Kolbasa', 2), new Ingredient('Carrot', 7)])
      ];

      constructor(private shoppingListServise: ShoppingListService) {}

      getRecipes(){
          return this.recipes.slice();
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListServise.addIngredients(ingredients);
      }

      getRecipe(index: number){
        return this.recipes[index];
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
      
}