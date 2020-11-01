import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CreateTodo } from '../../../shared/models/create-todo.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'croco-create-todo-modal',
  templateUrl: './create-todo-modal.component.html',
  styleUrls: ['./create-todo-modal.component.scss']
})
export class CreateTodoModalComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() public onCreateEvent: EventEmitter<CreateTodo> = new EventEmitter<CreateTodo>();
  @Output() public onCloseEvent: EventEmitter<null> = new EventEmitter<null>();
  public createTodoModel: CreateTodo;
  public isLoading: boolean;
  public currentUser: User;
  public allUsers: User[] = [];
  public assignedUser: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super();
  }

  private resetTodoModel(): void {
    this.createTodoModel = new CreateTodo();
    this.createTodoModel.AssignedUserIds = [];
  }

  private getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(payload => {
      this.currentUser = payload;
      this.assignedUser = this.currentUser.Id;
      this.createTodoModel.AssignedUserIds[0] = this.currentUser.Id;
    });
  }

  private getUsers(): void {
    const sub = this.userService.getAllUsers()
      .subscribe(payload => {
        this.allUsers = payload;
      });

    this.addSubscription(sub);
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
    this.getUsers();
  }

  public ngOnDestroy() {
    this.clearSubscriptions();
  }

  public onSubmit(form: NgForm): void {
    this.normalizeModel();
    this.onCreateEvent.emit(this.createTodoModel);
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public onAssignedUserChange(event: Event): void {
    this.createTodoModel.AssignedUserIds = [this.assignedUser];
  }
}
