import {NgModule} from '@angular/core';
import {MatCardModule, MatCheckboxModule, MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';


@NgModule({
  imports: [
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule
  ]
})
export class DetailTodoModule {
}
