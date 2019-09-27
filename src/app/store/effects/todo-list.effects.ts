import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TodoListService} from '../../services/todo-list.service';
import {ITasksPayload, loadTodoListAction, todoListLoadedErrorAction, todoListLoadedSuccessAction} from '../actions/todo-list.actions';
import {catchError, switchMap} from 'rxjs/operators';
import {ITask} from '../../models/ITask';
import {EMPTY, of, pipe} from 'rxjs';

/**
 * TodoListEffects the effects if TodoList.
 */
@Injectable()
export class TodoListEffects {

  /**
   * loadTodos$ catch the action of loadTodoListAction, then calls the API service (TodoListService) to get all tasks.
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
   * Constructor of TodoListEffects.
   * @param actions$ the actions of the store.
   * @param todoListService the Http service of tasks.
   */
  constructor(private actions$: Actions, private todoListService: TodoListService) {
  }

}
