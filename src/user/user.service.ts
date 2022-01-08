import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';

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
    const user = await this.userRepository.findOne(id, {
      relations: ['wishes'],
    });
    if (!user) {
      throw new BadRequestException(`User with id ${id} does not exist`);
    }
    return user;
  }

  async randomizeUsers() {
    const users = await this.findAll();
    if (users.length < 3) {
      throw new BadRequestException('Not enough users to play Secret Santa');
    }
    if (users.length > 500) {
      throw new BadRequestException('Too many users to play Secret Santa');
    }
    const getCandidate = () => users[Math.floor(Math.random() * users.length)];
    const santas = [];
    const checkUsage = (candidate) =>
      santas.find((item) => item.id === candidate.id);

    return users.map((user) => {
      let candidate = getCandidate();
      let isUsed = checkUsage(candidate);
      while (user.id === candidate.id || !!isUsed) {
        candidate = getCandidate();
        isUsed = checkUsage(candidate);
      }
      santas.push(candidate);
      return [user, candidate];
    });
  }

  async findAll() {
    return this.userRepository.find();
  }
}
