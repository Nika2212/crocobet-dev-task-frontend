import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Todo } from '../../shared/models/todo.model';
import { UpdateTodo } from '../../shared/models/update-todo.model';
import { CreateTodo } from '../../shared/models/create-todo.model';

@Injectable()
export class TodoService extends BaseService {
  constructor(http: HttpClient) {
    super(http, 'Todos');
  }

  public getCurrentUserBasedTodos(): Observable<Todo[]> {
    return this.get('GetCurrentUserBased');
  }

  public createTodo(model: CreateTodo): Observable<Todo> {
    return this.post('Create', model);
  }

  public updateTodo(model: UpdateTodo): Observable<Todo> {
    return this.put('Update', model);
  }

  public deleteTodo(model: Todo): Observable<void> {
    return this.delete('Remove/' + model.Id);
  }
}
