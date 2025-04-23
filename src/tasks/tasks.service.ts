import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    title: string,
    projectId?: string,
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title,
        userId,
        projectId,
      },
    });
  }

  async findAll(userId: string, projectId?: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { userId, ...(projectId && { projectId }) },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string): Promise<Task> {
    return this.prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async update(userId: string, id: string, data: Partial<Task>): Promise<Task> {
    return this.prisma.task
      .updateMany({
        where: { id, userId },
        data,
      })
      .then(() => this.findOne(userId, id));
  }

  async remove(userId: string, id: string): Promise<void> {
    await this.prisma.task.deleteMany({
      where: { id, userId },
    });
  }
}
