import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import axios from 'axios';
import { randomUUID } from 'crypto';

@Injectable()
export class TaskService {
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
  }

  updateStatus(task: Task): Task {
    task.status = true;
    return task;
  }
}
