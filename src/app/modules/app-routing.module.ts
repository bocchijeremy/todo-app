import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTodoComponent} from '../components/list-todo/list-todo.component';

/**
 * routes the routing of the app.
 */
const routes: Routes = [
  { path: '', redirectTo: 'todo-list', pathMatch: 'full' },
  { path: 'todo-list', component: ListTodoComponent }
];

/**
 * AppRoutingModule the module of the app routing.
 */
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
