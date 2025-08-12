import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as ItemsReducer from '../reducer/items.reducer';

export const selectItemsState = createFeatureSelector<ItemsReducer.State>(
  ItemsReducer.itemsFeatureKey
);

export const selectItems = createSelector(
  selectItemsState,
  (state: ItemsReducer.State) => state.items
);
