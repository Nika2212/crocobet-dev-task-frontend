import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CreateTodo } from '../../../shared/models/create-todo.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/user.model';
import { UpdateTodo } from '../../../shared/models/update-todo.model';
import { UserService } from '../../../core/services/user.service';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'croco-update-todo-modal',
  templateUrl: './update-todo-modal.component.html',
  styleUrls: ['./update-todo-modal.component.scss']
})
export class UpdateTodoModalComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() public onUpdateEvent: EventEmitter<UpdateTodo> = new EventEmitter<UpdateTodo>();
  @Output() public onCloseEvent: EventEmitter<null> = new EventEmitter<null>();
  @Input() set modelInput(model: UpdateTodo) {
    this.updateTodoModel = model;
  }
  public updateTodoModel: UpdateTodo;
  public isLoading: boolean;
  public allUsers: User[] = [];
  public currentUser: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super();
  }

  private getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(payload => {
      this.currentUser = payload;
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
    this.updateTodoModel.ExpirationDate = new Date(this.updateTodoModel.ExpirationDate).getTime();

    if (this.updateTodoModel.ExpirationDate < new Date().getTime()) {
      this.updateTodoModel.ExpirationDate = new Date().getTime();
    }
  }

  public ngOnInit(): void {
    this.getCurrentUser();
    this.getUsers();
  }

  public ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  public onSubmit(form: NgForm): void {
    this.normalizeModel();
    this.onUpdateEvent.emit(this.updateTodoModel);
  }

  public onClose(): void {
    this.onCloseEvent.next();
  }
}
