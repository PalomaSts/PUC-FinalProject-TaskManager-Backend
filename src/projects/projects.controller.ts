import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('google'))
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body('name') name: string, @Req() req) {
    return this.projectsService.create(req.user.id, name);
  }

  @Get()
  async findAll(@Req() req) {
    return this.projectsService.findAll(req.user.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Req() req,
  ) {
    return this.projectsService.update(req.user.id, id, name);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    return this.projectsService.remove(req.user.id, id);
  }
}
