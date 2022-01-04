import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, listOfWishes } = createUserDto;
    const wishes = [];

    listOfWishes.forEach((wish) => {
      const newWish = new Wish();
      newWish.wish = wish;
      wishes.push(newWish);
    });
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.wishes = wishes;
    await this.wishRepository.save(wishes);
    return this.userRepository.save(user);
  }

  async findOne(id: number) {
    return this.userRepository.findOne(id, { relations: ['wishes'] });
  }

  async randomizeUsers() {
    const users = await this.findAll();
    if (users.length < 3) {
      throw new BadRequestException('Not enough users to play Secret Santa');
    }
    if (users.length > 500) {
      throw new BadRequestException('Too many users to play Secret Santa');
    }
    const randomUsers = _.shuffle(users);
    const pairOfUsers = _.chunk(randomUsers, 2);
    if (pairOfUsers.length % 2 !== 0) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const last = pairOfUsers[pairOfUsers.length - 1];
      last.push(randomUser);
    }
    return pairOfUsers;
  }

  async findAll() {
    return this.userRepository.find();
  }
}
