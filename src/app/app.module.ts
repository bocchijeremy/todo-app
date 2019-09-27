import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {ListTodoComponent} from './components/list-todo/list-todo.component';
import {MaterialModule} from './modules/material/material.module';
import {appReducers} from './store/reducers/app.reducer';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {TodoListEffects} from './store/effects/todo-list.effects';
import { NavbarComponent } from './components/navbar/navbar.component';
import {environment} from '../environments/environment';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {MockTodoListService} from './services/mock-todo-list.service';
import {AppRoutingModule} from './modules/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ListTodoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(MockTodoListService),
    MaterialModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([TodoListEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
