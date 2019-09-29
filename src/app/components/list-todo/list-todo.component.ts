import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {IIdTaskPayload, loadTodoListAction, toggleTaskStatusAction} from '../../store/actions/todo-list.actions';
import {selectTasks, isTodoListLoaded, isTodoListSuccess} from '../../store/selectors/todo-list.selector';
import {ITask} from '../../models/ITask';
import {IAppState} from '../../store/reducers/app.reducer';
import {MatSnackBar} from '@angular/material';
import {takeUntil} from 'rxjs/operators';

/**
 * The ListTodoComponent display the list of tasks to do or done.
 */
@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit, OnDestroy {

  /** The todoList$ Observable gets the list of the tasks. */
  todoList$: Observable<Array<ITask>> = this.store.select(selectTasks);

  /** The todoListIsLoaded$ Observable gets the status if tasks is loaded or not. */
  todoListIsLoaded$: Observable<boolean> = this.store.select(isTodoListLoaded);

  /** The todoListIsLoaded$ Observable gets the status if Http request is success or not. */
  todoListIsSuccess$: Observable<boolean> = this.store.select(isTodoListSuccess);

  /** The todoList$ Observable to get the list of the tasks. */
  private isDestroy$ = new Subject();

  /**
   * Constructor of ListTodoComponent.
   * @param store the Ngrx store of the app.
   * @param snackBar the material angular dependency of MatSnackBar to show alert message if the API of tasks is in error.
   */
  constructor(private store: Store<IAppState>,
              private snackBar: MatSnackBar) {
    this.todoListIsSuccess$.pipe(takeUntil(this.isDestroy$)).subscribe((success: boolean) => {
      if (!success) {
        this.snackBar.open('Error Server', null, {
          duration: 3000
        });
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(loadTodoListAction());
  }

  /**
   * Get the explicit status of the task.
   * @param status the status of the task.
   */
  getTaskStatus(status: boolean): string {
    return status ? 'Done' : 'Todo';
  }

  /**
   * Unsubscribe the todoListIsSuccess$ Observable when this component is destroyed.
   */
  ngOnDestroy(): void {
    this.isDestroy$.next();
  }

  /**
   * Update the status of task.
   * @param id the id of task to update.
   */
  toggleStatus(id: number) {
    const iIdTaskPayload: IIdTaskPayload = {
      payload: id
    };
    this.store.dispatch(toggleTaskStatusAction(iIdTaskPayload));
  }
}
