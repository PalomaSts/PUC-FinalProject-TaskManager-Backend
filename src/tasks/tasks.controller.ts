import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('google'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body('title') title: string,
    @Body('projectId') projectId: string,
    @Req() req,
  ) {
    return this.tasksService.create(req.user.id, title, projectId);
  }

  @Get()
  async findAll(@Req() req, @Body('projectId') projectId?: string) {
    return this.tasksService.findAll(req.user.id, projectId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    return this.tasksService.findOne(req.user.id, id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data, @Req() req) {
    return this.tasksService.update(req.user.id, id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    return this.tasksService.remove(req.user.id, id);
  }
}
