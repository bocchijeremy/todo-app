import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MaterialModule} from './modules/material/material.module';
import {AppRoutingModule} from './modules/app-routing.module';
import {ListTodoComponent} from './components/list-todo/list-todo.component';
import {NavbarComponent} from './components/navbar/navbar.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, AppRoutingModule],
      declarations: [
        AppComponent,
        ListTodoComponent,
        NavbarComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
