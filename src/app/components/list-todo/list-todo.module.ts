import {NgModule} from '@angular/core';
import {MatCheckboxModule, MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';


@NgModule({
  imports: [
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule
  ]
})
export class ListTodoModule {
}
