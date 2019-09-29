import * as TodoListPageActions from '../actions/todo-list.actions';
import {createReducer, on} from '@ngrx/store';
import {ITask} from '../../models/ITask';
import {IIdTaskPayload, ITasksPayload} from '../actions/todo-list.actions';

/**
 * ITodoListState the model of the state of TodoList.
 */
export interface ITodoListState {
  tasks: Array<ITask>;
  loading: boolean;
  success: boolean;
}

/**
 * initialTodoListState the initial state of ITodoListState.
 */
export const initialTodoListState: ITodoListState = {
  tasks: [],
  loading: false,
  success: true
};

/**
 * Get the new tasks updated.
 * @param tasks the initial tasks.
 * @param id the id of task to update.
 */
function getUpdatesTasks(tasks: Array<ITask>, id: number) {
  const indexTaskToUpdate: number = tasks.findIndex((task: ITask) => task.id === id);

  tasks[indexTaskToUpdate] = {...tasks[indexTaskToUpdate], done: !tasks[indexTaskToUpdate].done};
  return tasks;
}

/**
 * todoListReducer the reducers of ITodoListState.
 */
export const todoListReducer = createReducer(
  initialTodoListState,
  on(TodoListPageActions.loadTodoListAction, (state: ITodoListState) => ({...state, loading: true})),
  on(TodoListPageActions.todoListLoadedSuccessAction, (state: ITodoListState, action: ITasksPayload) => (
    {...state, tasks: action.payload, loading: false, success: true}
  )),
  on(TodoListPageActions.todoListLoadedErrorAction, () => ({tasks: [], loading: false, success: false})),
  on(TodoListPageActions.toggleTaskStatusAction, (state: ITodoListState, action: IIdTaskPayload) => ({
      ...state,
      tasks: getUpdatesTasks(state.tasks, action.payload)
    })
  )
);
