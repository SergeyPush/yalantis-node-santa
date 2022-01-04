import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Santa } from './entites/secret-santa.entity';

@Injectable()
export class ShuffleService {
  constructor(
    private userService: UserService,
    @InjectRepository(Santa) private santaRepository: Repository<Santa>,
  ) {}

  async getRandomSanta() {
    const allSantas = await this.findAll();
    if (allSantas.length > 0) {
      return allSantas;
    }
    const randomUsers = await this.userService.randomizeUsers();
    const secretSantaPair = [];

    randomUsers.forEach((user) => {
      const santa = new Santa();
      santa.name = `${user[0].firstName} ${user[0].lastName}`;
      santa.user_id = user[0].id;
      santa.santa = `${user[1].firstName} ${user[1].lastName}`;
      secretSantaPair.push(santa);
    });
    return this.santaRepository.save(secretSantaPair);
  }

  async findAll() {
    return this.santaRepository.find();
  }

  async removeData() {
    return this.santaRepository.clear();
  }
}
