import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/reducers/app.reducer';
import {loadTaskAction} from '../../../store/actions/todo-list.actions';
import {selectSelectedTask, selectSelectedTaskLoading, selectSelectedTaskSuccess} from '../../../store/selectors/todo-list.selector';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

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

  /** The statusTask$ Observable gets the success status of the task. */
  statusTask$ = this.store.select(selectSelectedTaskSuccess);

  /** The loadingTask$ Observable gets the success status of the task. */
  loadingTask$ = this.store.select(selectSelectedTaskLoading);

  /** The Subject of component. */
  private isDestroy$ = new Subject();

  /**
   * Constructor of DetailTodoComponent.
   * @param store the Ngrx store of the app.
   * @param snackBar the material angular dependency of MatSnackBar to show alert message if the API of get task is in error.
   * @param router the router to redirect the app when the API is in error to get the task.
   */
  constructor(private store: Store<IAppState>,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.statusTask$.pipe(takeUntil(this.isDestroy$)).subscribe((success: boolean) => {
      if (!success) {
        this.snackBar.open('Error Server, not retrieve the task', null, {
          duration: 3000
        });

        setTimeout(() => {
          this.router.navigate(['todo-list']);
        }, 3000);

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
