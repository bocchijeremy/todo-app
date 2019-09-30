import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TodoListService} from '../../services/todo-list.service';
import {
  IAddTaskPayload,
  IIdTaskPayload,
  ITaskPayload,
  ITasksPayload,
  loadTaskAction,
  loadTodoListAction, taskAddedSuccessAction, taskLoadedErrorAction, taskLoadedSuccessAction,
  todoListLoadedErrorAction,
  todoListLoadedSuccessAction, toggleTaskStatusSuccessAction, tryAddTaskAction, tryToggleTaskStatusAction
} from '../actions/todo-list.actions';
import {catchError, switchMap, withLatestFrom} from 'rxjs/operators';
import {ITask} from '../../models/ITask';
import {of, pipe} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../reducers/app.reducer';
import {selectRouter} from '../selectors/todo-list.selector';

/**
 * TodoListEffects the effects if TodoList.
 */
@Injectable()
export class TodoListEffects {

  /**
   * loadTodos$ catches the action of loadTodoListAction, then calls the API service (TodoListService) to get all tasks.
   * If this API is success, it notifies the store with action of todoListLoadedSuccessAction. Otherwise, the todoListLoadedErrorAction
   * action is notified for the store.
   */
  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(loadTodoListAction),
    switchMap(() => this.todoListService.getTasks()),
    pipe(
      switchMap((todos: Array<ITask>) => {
        const iTasksPayload: ITasksPayload = {payload: todos};
        return of(todoListLoadedSuccessAction(iTasksPayload));
      }),
      catchError(() => of(todoListLoadedErrorAction()))
    )
  ));

  /**
   * updateTodo$ catches the action of tryToggleTaskStatusAction, then calls the API service to update the task.
   */
  updateTodo$ = createEffect(() => this.actions$.pipe(
    ofType(tryToggleTaskStatusAction),
    switchMap((task: ITaskPayload) => {
      const iTask: ITask = {
        ...task.payload,
        done: !task.payload.done
      };
      return this.todoListService.updateTask(iTask);
    }),
    pipe(
      switchMap((task) => {
        const iIdTaskPayload: IIdTaskPayload = {payload: task.id};
        return of(toggleTaskStatusSuccessAction(iIdTaskPayload));
      })
    )
  ));

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(tryAddTaskAction),
    switchMap((payload: IAddTaskPayload) => {
      return this.todoListService.addTask(payload.title, payload.description);
    }),
    pipe(
      switchMap((task) => {
        const iTaskPayload: ITaskPayload = {payload: task};
        return of(taskAddedSuccessAction(iTaskPayload));
      })
    )
  ));

  /**
   * loadTask$ catches the action of loadTaskAction, then intercepts the router to get the id of the task. Then, we request the
   * backend with this id to retrieve the task.
   */
  loadTask$ = createEffect(() => this.actions$.pipe(
    ofType(loadTaskAction),
    withLatestFrom(
      this.store.select(selectRouter),
      (a, payload) => {
        return {
          payload: +payload.state.params.id
        };
      }
    ),
    switchMap((p: IIdTaskPayload) => this.todoListService.getTask(p.payload)),
    pipe(
      switchMap((task: ITask) => {
        const iTaskPayload: ITaskPayload = {payload: task};
        return of(taskLoadedSuccessAction(iTaskPayload));
      }),
      catchError((err, caught) => {
        this.store.dispatch(taskLoadedErrorAction());
        return caught;
        }
      )
    )
    )
  );

  /**
   * Constructor of TodoListEffects.
   * @param actions$ the actions of the store.
   * @param todoListService the Http service of tasks.
   * @param store the store of the app.
   */
  constructor(private actions$: Actions,
              private todoListService: TodoListService,
              private store: Store<IAppState>) {
  }

}
