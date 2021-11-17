import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly appService: TaskService) {}

  @Get(':amount?')
  findAll(@Param('amount') amount): Promise<Task[]> {
    return this.appService.findAll(amount);
  }

  @Put()
  update(@Body() updateTask: Task) {
    return this.appService.updateStatus(updateTask);
  }
}
