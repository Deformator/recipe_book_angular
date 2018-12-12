import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('shopping', [
      state('in', style({
        opacity: 1,
      })),
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(700)
      ]),
      transition('* => void', [
        animate(700, style({
          'background-color': 'red',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ShoppingListComponent implements OnInit {

  shoppingListState: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
