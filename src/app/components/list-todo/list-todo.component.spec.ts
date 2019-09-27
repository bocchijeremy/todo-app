import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListTodoComponent} from './list-todo.component';
import {MaterialModule} from '../../modules/material/material.module';
import {Store, StoreModule} from '@ngrx/store';
import {appReducers, IAppState} from '../../store/reducers/app.reducer';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

describe('ListTodoComponent', () => {
  let component: ListTodoComponent;
  let fixture: ComponentFixture<ListTodoComponent>;

  let store: MockStore<IAppState>;
  const initialState: IAppState = {
    todoState: {
      tasks: [],
      loading: false,
      success: true
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        provideMockStore({initialState})
      ],
      declarations: [ListTodoComponent]
    })
      .compileComponents();

    store = TestBed.get<Store<IAppState>>(Store);

    fixture = TestBed.createComponent(ListTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of tasks', () => {
    store.setState({
      todoState: {
        tasks: [
          {
            id: 1,
            title: 'TASK 1',
            done: true
          },
          {
            id: 2,
            title: 'TASK 2',
            done: false
          }
        ],
        loading: false,
        success: true
      }
    });

    fixture.detectChanges();

    const element: ParentNode = fixture.nativeElement;
    const allTdTable = element.querySelectorAll('td');

    expect(allTdTable[0].innerText).toEqual('Done');
    expect(allTdTable[1].innerText).toEqual('TASK 1');
    expect(allTdTable[2].innerText).toEqual('Todo');
    expect(allTdTable[3].innerText).toEqual('TASK 2');
  });

  it('should render an error message', () => {
    store.setState({
      todoState: {
        tasks: [],
        loading: false,
        success: false
      }
    });

    fixture.detectChanges();

    const element: ParentNode = fixture.nativeElement;
    expect(element.children.length).toBe(0);
  });

});
