import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/components/base.component';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { TodoService } from '../../core/services/todo.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Todo } from '../../shared/models/todo.model';
import { UpdateTodo } from '../../shared/models/update-todo.model';
import { LoaderService } from '../../core/services/loader.service';
import { CreateTodo } from '../../shared/models/create-todo.model';

@Component({
  selector: 'croco-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit, OnDestroy {
  private currentUserTodos: Todo[];

  public currentOngoingTodos: Todo[];
  public currentCompletedTodos: Todo[];
  public selectedTodo: UpdateTodo;
  public createTodoModalState: boolean;
  public updateTodoModalState: boolean;
  public isLoading: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private todoService: TodoService,
    private loaderService: LoaderService,
    private router: Router
  ) {
    super();
  }

  private filterTodos(): void {
    this.currentOngoingTodos = this.currentUserTodos.filter(t => !t.Status);
    this.currentCompletedTodos = this.currentUserTodos.filter(t => t.Status);
    this.loaderService.stopLoader();
  }

  private getInitData(): void {
    const sub = forkJoin([
      this.authService.ping(),
      this.todoService.getCurrentUserBasedTodos()
    ]).subscribe(([currentUser, currentUserTodos]) => {
      if (!currentUser) {
        this.loaderService.stopLoader();
        return this.router.navigate(['auth']);
      }

      this.authService.setCurrentUser(currentUser);
      this.currentUserTodos = currentUserTodos;
      this.filterTodos();
    });

    this.addSubscription(sub);
  }

  private getCurrentUserTodos(): void {
    const sub = this.todoService.getCurrentUserBasedTodos()
      .subscribe(payload => {
        if (!payload) return;

        this.currentUserTodos = payload;
        this.filterTodos();
      });
  }

  private updateTodo(todo: UpdateTodo): void {
    this.loaderService.startLoader();

    const updatedTodo = new UpdateTodo();

    updatedTodo.Id = todo.Id;
    updatedTodo.Title = todo.Title;
    updatedTodo.Description = todo.Description;
    updatedTodo.ExpirationDate = todo.ExpirationDate;
    updatedTodo.Status = todo.Status;
    updatedTodo.AssignedUserIds = todo.AssignedUserIds;

    const sub = this.todoService.updateTodo(updatedTodo)
      .subscribe(payload => {
        if (!payload) return;

        this.getCurrentUserTodos();
      });

    this.addSubscription(sub);
  }

  private createTodo(todo: CreateTodo): void {
    this.loaderService.startLoader();

    const sub = this.todoService.createTodo(todo)
      .subscribe(payload => {
        if (!payload) return;

        this.getCurrentUserTodos();
      });

    this.addSubscription(sub);
  }

  private deleteTodo(todo: Todo): void {
    this.loaderService.startLoader();

    this.todoService.deleteTodo(todo)
      .subscribe(payload => {
        console.log(payload);
        this.getCurrentUserTodos();
      });
  }


  public ngOnInit(): void {
    this.loaderService.startLoader();

    this.getInitData();
  }

  public ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  public onStatusChange(todo: Todo): void {
    todo.Status = !todo.Status;
    this.updateTodo(todo);
  }

  public onCreate(): void {
    this.createTodoModalState = true;
  }

  public onUpdate(todo: Todo): void {
    const updateTodo = new UpdateTodo();

    updateTodo.Id = todo.Id;
    updateTodo.Title = todo.Title;
    updateTodo.Description = todo.Description;
    updateTodo.ExpirationDate = todo.ExpirationDate;
    updateTodo.Status = todo.Status;
    updateTodo.AssignedUserIds = todo.AssignedUserIds;

    this.selectedTodo = {...updateTodo};
    this.updateTodoModalState = true;
  }

  public onDelete(todo: Todo): void {
    this.deleteTodo(todo);
  }

  public onCreateEvent(todo: CreateTodo): void {
    this.createTodoModalState = false;
    this.createTodo(todo);
  }

  public onUpdateEvent(todo: UpdateTodo): void {
    this.updateTodoModalState = false;
    this.updateTodo(todo);
  }

  public onCreateModalClose(): void {
    this.createTodoModalState = false;
  }

  public onUpdateModalClose(): void {
    this.updateTodoModalState = false;
  }
}
