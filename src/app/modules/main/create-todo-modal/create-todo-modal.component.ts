import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateTodo } from '../../../shared/models/create-todo.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'croco-create-todo-modal',
  templateUrl: './create-todo-modal.component.html',
  styleUrls: ['./create-todo-modal.component.scss']
})
export class CreateTodoModalComponent implements OnInit {
  @Output() public onCreateEvent: EventEmitter<CreateTodo> = new EventEmitter<CreateTodo>();
  public createTodoModel: CreateTodo;
  public isLoading: boolean;
  public currentUser: User;
  public assignedUserList: User[] = [];

  constructor(
    private authService: AuthService
  ) { }

  private resetTodoModel(): void {
    this.createTodoModel = new CreateTodo();
  }

  private getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(payload => {
      this.currentUser = payload;
      this.createTodoModel.AssignedUserIds = [];
      this.createTodoModel.AssignedUserIds.push(this.currentUser.Id);
    });
  }

  private normalizeModel(): void {
    this.createTodoModel.Status = false;
    this.createTodoModel.ExpirationDate = new Date(this.createTodoModel.ExpirationDate).getTime();

    if (this.createTodoModel.ExpirationDate < new Date().getTime()) {
      this.createTodoModel.ExpirationDate = new Date().getTime();
    }
  }

  public ngOnInit(): void {
    this.resetTodoModel();
    this.getCurrentUser();
  }

  public onSubmit(form: NgForm): void {
    this.normalizeModel();
    this.onCreateEvent.emit(this.createTodoModel);
  }

}
