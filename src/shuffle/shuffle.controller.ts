import { Controller, Delete, Post } from '@nestjs/common';
import { ShuffleService } from './shuffle.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('shuffle')
export class ShuffleController {
  constructor(private shuffleService: ShuffleService) {}

  @Post()
  @ApiTags('shuffle')
  @ApiOperation({ summary: 'Create list of Secret Santas' })
  @ApiResponse({ status: 201, description: 'Create list of Secret Santas' })
  getRandomSanta() {
    return this.shuffleService.getRandomSanta();
  }

  @Delete()
  @ApiTags('shuffle')
  @ApiOperation({ summary: 'Remove list of Secret Santas' })
  @ApiResponse({ status: 200, description: 'Remove list of Secret Santas' })
  removeData() {
    return this.shuffleService.removeData();
  }
}
