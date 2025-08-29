import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddItems, GetItemsBasedOnTabName, ItemsActionTypes } from './action/items.actions';
import { map, mergeMap } from 'rxjs';
import { ItemService } from 'src/app/Services/item.service';



@Injectable()
export class ItemEffects {


  constructor(
    private actions$: Actions,
    private itemService: ItemService
  ) { }

  getItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<GetItemsBasedOnTabName>(ItemsActionTypes.GET_ITEMS_BASED_ON_TAB_NAME),
      mergeMap(({ payload }) =>
        this.itemService.getItemByIdBasedOnTabName(payload.tabName, payload.userId).pipe(
          map(items => {
            if (items && items.length > 0) {
              return new AddItems({ items });
            }
            return new AddItems({ items: [] });
          })
        )
      )
    )
  })
}
