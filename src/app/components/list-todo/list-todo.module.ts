import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {AddTaskComponent} from './add-task/add-task.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatButtonModule,
    AddTaskComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AddTaskComponent]
})
export class ListTodoModule {
}
