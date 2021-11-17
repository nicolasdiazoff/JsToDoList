import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import axios from 'axios';
import { randomUUID } from 'crypto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(amount: string): Promise<Task[]> {
    const titles = await axios.get(
      `https://lorem-faker.vercel.app/api?quantity=${amount ? amount : 3}`,
    );

    const data = titles.data.map((title) => {
      return {
        id: randomUUID(),
        title: title,
        status: false,
      };
    });

    return data;

    // return this.taskRepository.find({ take: parseInt(amount) });
  }

  updateStatus(task: Task): Task {
    task.status = true;
    return task;
    // return this.taskRepository.findOne(id);
  }
}
