import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {ListTodoComponent} from './components/list-todo/list-todo.component';
import {appReducers} from './store/reducers/app.reducer';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {TodoListEffects} from './store/effects/todo-list.effects';
import {environment} from '../environments/environment';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {MockTodoListService} from './services/mock-todo-list.service';
import {AppRoutingModule} from './app-routing.module';
import { DetailTodoComponent } from './components/list-todo/detail-todo/detail-todo.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {CustomSerializer} from './route-serializer';
import {NavbarModule} from './components/navbar/navbar.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ListTodoModule} from './components/list-todo/list-todo.module';
import {DetailTodoModule} from './components/list-todo/detail-todo/detail-todo.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ListTodoComponent,
    DetailTodoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(MockTodoListService),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([TodoListEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    NavbarModule,
    ListTodoModule,
    DetailTodoModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule {
}
