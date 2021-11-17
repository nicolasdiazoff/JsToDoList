import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/task.entity';
import { TasksModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'todo_mysql',
      port: 3306,
      username: 'root',
      password: '381136',
      database: 'todo',
      entities: [Task],
      synchronize: true,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
