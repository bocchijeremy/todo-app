import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTodoComponent} from './components/list-todo/list-todo.component';
import {DetailTodoComponent} from './components/list-todo/detail-todo/detail-todo.component';

/**
 * routes the routing of the app.
 */
export const routes: Routes = [
  {path: '', redirectTo: 'todo-list', pathMatch: 'full'},
  {path: 'todo-list', component: ListTodoComponent},
  {path: 'todo-list/task/:id', component: DetailTodoComponent}
];

/**
 * AppRoutingModule the module of the app routing.
 */
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
