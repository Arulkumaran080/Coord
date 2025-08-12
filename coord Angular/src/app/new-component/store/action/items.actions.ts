import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
  Action,
} from '@ngrx/store';

export enum ItemsActionTypes {
  LOAD_ITEMS = '[Items] Load Items',
  ADD_ITEMS = '[Items] Add Items',
}

export const ItemsActions = createActionGroup({
  source: 'Items',
  events: {
    'Load Itemss': emptyProps(),
  },
});

export const addItems = createAction(
  '[Items] Add Items',
  props<{ items: any[] }>()
);

export class AddItems implements Action {
  readonly type = ItemsActionTypes.ADD_ITEMS;
  constructor(public payload: { items: any[] }) {}
}

export type ItemsActionsTypes = AddItems;
