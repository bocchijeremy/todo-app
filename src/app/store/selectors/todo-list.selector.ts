import {createSelector} from '@ngrx/store';
import {IAppState} from '../reducers/app.reducer';
import {ITodoListState} from '../reducers/todo-list.reducer';
import {ITask} from '../../models/ITask';

/**
 * selectTodoState selects the property todoState of IAppState.
 * @param state the main state of the app (IAppState).
 */
export const selectTodoState = (state: IAppState) => state.todoState;

/**
 * selectTasks selects the tasks of the ITodoListState with the accoring priority : first tasks are tasks with the TODOstatus.
 * And after the tasks with the DONE status.
 */
export const selectTasks = createSelector(
  selectTodoState,
  (state: ITodoListState) => state.tasks.sort((a: ITask, b: ITask) => {
    if (a.done === b.done) {
      return 0;
    } else if (a.done) {
      return 1;
    }

    return -1;
  })
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
