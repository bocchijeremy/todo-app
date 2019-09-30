import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/reducers/app.reducer';
import {loadTaskAction} from '../../../store/actions/todo-list.actions';
import {selectSelectedTask, selectSelectedTaskSuccess} from '../../../store/selectors/todo-list.selector';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

/**
 * The DetailTodoComponent display the detail of task.
 */
@Component({
  selector: 'app-detail-todo',
  templateUrl: './detail-todo.component.html',
  styleUrls: ['./detail-todo.component.scss']
})
export class DetailTodoComponent implements OnInit, OnDestroy {

  /** The task$ Observable gets the detail of the task. */
  task$ = this.store.select(selectSelectedTask);

  statusTask$ = this.store.select(selectSelectedTaskSuccess);

  /** The Subject of component. */
  private isDestroy$ = new Subject();

  /**
   * Constructor of DetailTodoComponent.
   * @param store the Ngrx store of the app.
   * @param snackBar the material angular dependency of MatSnackBar to show alert message if the API of get task is in error.
   */
  constructor(private store: Store<IAppState>, private snackBar: MatSnackBar) {
    this.statusTask$.pipe(takeUntil(this.isDestroy$)).subscribe((success: boolean) => {
      if (!success) {
        this.snackBar.open('Error Server, not retrieve the task', null, {
          duration: 3000
        });
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(loadTaskAction());
  }

  ngOnDestroy(): void {
    this.isDestroy$.next();
    this.isDestroy$.complete();
  }

}
