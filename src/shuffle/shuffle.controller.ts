import { Controller, Delete, Post } from '@nestjs/common';
import { ShuffleService } from './shuffle.service';

@Controller('shuffle')
export class ShuffleController {
  constructor(private shuffleService: ShuffleService) {}

  @Post()
  getRandomSanta() {
    return this.shuffleService.getRandomSanta();
  }

  @Delete()
  removeData() {
    return this.shuffleService.removeData();
  }
}
