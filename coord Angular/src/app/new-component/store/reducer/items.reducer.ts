import { createReducer, on } from '@ngrx/store';
import * as ItemsActions from '../action/items.actions';
import { Item } from 'src/app/Models/Item';
// import * as ItemsActions from '../action/items.actions';

export const itemsFeatureKey = 'items';

export interface State {
  items: Item[]; // Define the type of items as needed
}

export const initialState: State = {
  items: [],
};

export const reducer = createReducer(
  initialState,
  on(ItemsActions.addItems, (state, { items }) => ({
    ...state,
    items: [...state.items, ...items], // Append new items to the existing list
  }))
);

export function itemsReducer(
  state: State | undefined = initialState,
  action: ItemsActions.ItemsActionsTypes
): State {
  switch (action.type) {
    case ItemsActions.addItems.type:
      return {
        ...state,
        items: [...state.items, ...action.payload.items],
      };

    default:
      return state;
  }
}
