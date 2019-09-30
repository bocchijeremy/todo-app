import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ListTodoComponent} from './components/list-todo/list-todo.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {DetailTodoComponent} from './components/list-todo/detail-todo/detail-todo.component';
import {NavbarModule} from './components/navbar/navbar.module';
import {ListTodoModule} from './components/list-todo/list-todo.module';
import {DetailTodoModule} from './components/list-todo/detail-todo/detail-todo.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ListTodoComponent,
        NavbarComponent,
        DetailTodoComponent
      ],
      imports: [AppRoutingModule, NavbarModule, ListTodoModule, DetailTodoModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
