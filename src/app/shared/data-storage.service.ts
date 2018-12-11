import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';


@Injectable()
export class DataStorageService {

    token: string;

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private store: Store<fromApp.AppState>) {
            this.getToken();

    }

    getToken() {
        return this.store.select('auth')
            .pipe(
                map((authState: fromAuth.State) => {

                    return authState.token
                })
            ).subscribe(token => this.token = token)
    }

    storeRecipes() {
        return this.http.put(`https://recipe-book-angular-3085d.firebaseio.com/recipes.json`, this.recipeService.getRecipes(), {
            params: new HttpParams().set('auth', this.token)
        });


    }

    getRecipes() {

        return this.http.get(`https://recipe-book-angular-3085d.firebaseio.com/recipes.json`, {
            params: new HttpParams().set('auth', this.token)
        })
            .pipe(
                map((recipes: Recipe[]) => {
                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                })
            )
            .subscribe((recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            })
    }
}
