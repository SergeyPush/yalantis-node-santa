import { Module } from '@nestjs/common';
import { ShuffleService } from './shuffle.service';
import { ShuffleController } from './shuffle.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Santa } from './entites/secret-santa.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Santa])],
  providers: [ShuffleService],
  controllers: [ShuffleController],
})
export class ShuffleModule {}
