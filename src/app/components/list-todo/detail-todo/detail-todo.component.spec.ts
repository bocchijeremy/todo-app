import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {DetailTodoComponent} from './detail-todo.component';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/reducers/app.reducer';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {DetailTodoModule} from './detail-todo.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../../app-routing.module';
import {ListTodoModule} from '../list-todo.module';
import {ListTodoComponent} from '../list-todo.component';
import {Router} from '@angular/router';

describe('DetailTodoComponent', () => {
  let component: DetailTodoComponent;
  let fixture: ComponentFixture<DetailTodoComponent>;
  let router: Router;

  let store: MockStore<IAppState>;
  const initialState: IAppState = {
    todoState: {
      tasks: [],
      selectedTask: {
        task: null,
        success: true,
        loading: false
      },
      loading: false,
      success: true
    },
    router: null
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailTodoComponent,
        ListTodoComponent
      ],
      imports: [
        BrowserAnimationsModule,
        DetailTodoModule,
        ListTodoModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
      .compileComponents();

    store = TestBed.get<Store<IAppState>>(Store);
    router = TestBed.get(Router);

    fixture = TestBed.createComponent(DetailTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an error message', fakeAsync(() => {
    store.setState({
      todoState: {
        tasks: [],
        selectedTask: {
          task: null,
          loading: false,
          success: false
        },
        loading: false,
        success: false
      },
      router: null
    });

    fixture.detectChanges();

    const element: ParentNode = fixture.nativeElement;
    expect(element.children.length).toBe(0);
    tick(6000);
    expect('/todo-list').toEqual(router.url);
  }));

});
