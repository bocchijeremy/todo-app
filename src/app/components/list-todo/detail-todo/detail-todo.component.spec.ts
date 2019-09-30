import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailTodoComponent} from './detail-todo.component';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../store/reducers/app.reducer';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {DetailTodoModule} from './detail-todo.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('DetailTodoComponent', () => {
  let component: DetailTodoComponent;
  let fixture: ComponentFixture<DetailTodoComponent>;

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
        DetailTodoComponent
      ],
      imports: [
        BrowserAnimationsModule,
        DetailTodoModule
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
      .compileComponents();

    store = TestBed.get<Store<IAppState>>(Store);

    fixture = TestBed.createComponent(DetailTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an error message', () => {
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
    expect(element.children.length).toBe(1);
    expect(element.querySelector('a').textContent).toBe('Home');
  });

});
