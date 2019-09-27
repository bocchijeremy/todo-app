import {createSelector} from '@ngrx/store';
import {IAppState} from '../reducers/app.reducer';
import {ITodoListState} from '../reducers/todo-list.reducer';

/**
 * selectTodoState selects the property todoState of IAppState.
 * @param state the main state of the app (IAppState).
 */
export const selectTodoState = (state: IAppState) => state.todoState;

/**
 * selectTasks selects the tasks of the ITodoListState.
 */
export const selectTasks = createSelector(
  selectTodoState,
  (state: ITodoListState) => state.tasks
);

/**
 * isTodoListLoaded selects the loading status of the ITodoListState.
 */
export const isTodoListLoaded = createSelector(
  selectTodoState,
  (state: ITodoListState) => state.loading
);

/**
 * isTodoListLoaded selects the success status of the ITodoListState.
 */
export const isTodoListSuccess = createSelector(
  selectTodoState,
  (state: ITodoListState) => state.success
);
