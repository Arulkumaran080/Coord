import { Action } from '@ngrx/store';
import { CurrentUser } from 'src/app/Models/user';

export enum ItemsActionTypes {
  LOAD_ITEMS = '[Items] Load Items',
  ADD_ITEMS = '[Items] Add Items',
  UPDATE_USER_DETAILS = '[Items] Update User Details',
  GET_ITEMS_BASED_ON_TAB_NAME = '[Items] Get Items Based on Tab Name'
}

export class AddItems implements Action {
  readonly type = ItemsActionTypes.ADD_ITEMS;
  constructor(public payload: { items: any[] }) { }
}

export class GetItemsBasedOnTabName implements Action {
  readonly type = ItemsActionTypes.GET_ITEMS_BASED_ON_TAB_NAME;
  constructor(public payload: { tabName: string, userId: number }) { }
}

export class UpdateUserDetails implements Action {
  readonly type = ItemsActionTypes.UPDATE_USER_DETAILS;
  constructor(public payload: CurrentUser) { }
}

export type ItemsActions = AddItems | UpdateUserDetails | GetItemsBasedOnTabName;
