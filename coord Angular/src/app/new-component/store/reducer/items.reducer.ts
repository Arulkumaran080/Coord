import { ItemsActionTypes, ItemsActions } from '../action/items.actions';
import { Item } from 'src/app/Models/Item';
import { CurrentUsers } from 'src/app/Models/CurrentUser';
import { createFeatureSelector, createSelector } from '@ngrx/store';
// import * as ItemsActions from '../action/items.actions';

export const itemsFeatureKey = 'items';

export interface ItemAndUserState {
  items: Item[];
}

export const initialState: ItemAndUserState = {
  items: [],
};

export function itemsReducer(state: ItemAndUserState = initialState, action: ItemsActions): ItemAndUserState {
  console.log('Action received:', action);
  switch (action.type) {
    case ItemsActionTypes.ADD_ITEMS:
      return {
        ...state,
        items: [...action.payload.items],
      };

    default:
      return state;
  }
}

export const selectItems = createFeatureSelector<ItemAndUserState>(itemsFeatureKey);

export const itemsSelector = createSelector(selectItems, state =>
  state && state.items
);
