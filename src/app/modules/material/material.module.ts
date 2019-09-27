import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatCheckboxModule,
  MatGridListModule,
  MatListModule, MatProgressSpinnerModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';

/**
 * MaterialModule the module of the material angular.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {
}
