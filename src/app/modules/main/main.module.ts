import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { TodoService } from '../../core/services/todo.service';
import { UserService } from '../../core/services/user.service';
import { HeaderModule } from '../../shared/components/header/header.module';
import { FooterModule } from '../../shared/components/footer/footer.module';
import { CreateTodoModalComponent } from './create-todo-modal/create-todo-modal.component';
import { FormsModule } from '@angular/forms';
import { UpdateTodoModalComponent } from './update-todo-modal/update-todo-modal.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [MainComponent, CreateTodoModalComponent, UpdateTodoModalComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    HeaderModule,
    FooterModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    UserService,
    TodoService
  ]
})
export class MainModule { }
