import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Project } from '../../generated/prisma';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, name: string): Promise<Project> {
    return this.prisma.project.create({
      data: {
        name,
        userId,
      },
    });
  }

  async findAll(userId: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(userId: string, id: string, name: string): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data: { name },
    });
  }

  async remove(userId: string, id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }

  async findAllWithTasks(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        tasks: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }
}
