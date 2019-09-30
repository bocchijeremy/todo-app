import {ActionReducerMap} from '@ngrx/store';
import {ITodoListState, todoListReducer} from './todo-list.reducer';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {IRouterStateUrl} from '../../route-serializer';

/**
 * IAppState the model of the main state of app.
 */
export interface IAppState {
  todoState: ITodoListState;
  router: RouterReducerState<IRouterStateUrl>;
}

/**
 * appReducers the map of all reducers in the app.
 */
export const appReducers: ActionReducerMap<IAppState, any> = {
  todoState: todoListReducer,
  router: routerReducer
};

