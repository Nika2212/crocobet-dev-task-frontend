import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateTodo } from '../../../shared/models/create-todo.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/user.model';
import { UpdateTodo } from '../../../shared/models/update-todo.model';

@Component({
  selector: 'croco-update-todo-modal',
  templateUrl: './update-todo-modal.component.html',
  styleUrls: ['./update-todo-modal.component.scss']
})
export class UpdateTodoModalComponent implements OnInit {
  @Output() public onUpdateEvent: EventEmitter<UpdateTodo> = new EventEmitter<UpdateTodo>();
  @Input() set modelInput(model: UpdateTodo) {
    this.updateTodoModel = model;
  }
  public updateTodoModel: UpdateTodo;
  public isLoading: boolean;
  public currentUser: User;
  public assignedUserList: User[] = [];

  constructor(
    private authService: AuthService
  ) { }

  private getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(payload => {
      this.currentUser = payload;
      this.updateTodoModel.AssignedUserIds = [];
      this.updateTodoModel.AssignedUserIds.push(this.currentUser.Id);
    });
  }

  private normalizeModel(): void {
    this.updateTodoModel.ExpirationDate = new Date(this.updateTodoModel.ExpirationDate).getTime();

    if (this.updateTodoModel.ExpirationDate < new Date().getTime()) {
      this.updateTodoModel.ExpirationDate = new Date().getTime();
    }
  }

  public ngOnInit(): void {
    this.getCurrentUser();
  }

  public onSubmit(form: NgForm): void {
    this.normalizeModel();
    this.onUpdateEvent.emit(this.updateTodoModel);
  }
}
