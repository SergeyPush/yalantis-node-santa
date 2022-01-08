import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';

const mockUserRepository = {
  save: jest.fn().mockImplementation((dto) => ({
    id: 1,
    ...dto,
  })),
  findOne: jest.fn().mockImplementation((id) => ({
    id,
    firstName: 'John',
    lastName: 'Snow',
  })),
};
const mockWishRepository = {
  save: jest.fn().mockImplementation((list) => ({
    id: 1,
    wishes: list,
  })),
};

describe('TestService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: getRepositoryToken(Wish), useValue: mockWishRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockUserRepository).toBeDefined();
    expect(mockWishRepository).toBeDefined();
  });

  describe('Create user', () => {
    it('should create a new user', async () => {
      const dto = {
        firstName: 'John',
        lastName: 'Snow',
        listOfWishes: ['iPhone', 'iPad'],
      };
      const user1 = new User();
      user1.firstName = 'John';
      user1.lastName = 'Snow';
      const wish1 = new Wish();
      wish1.wish = 'iPhone';
      const wish2 = new Wish();
      wish2.wish = 'iPad';
      const listOfWishes = [wish1, wish2];

      const user = await service.createUser(dto);
      expect(user).toEqual({
        id: expect.any(Number),
        firstName: 'John',
        lastName: 'Snow',
        wishes: listOfWishes,
      });
    });

    it('should return one user', async () => {
      const user = await service.findOne(1);
      expect(user).toEqual({
        id: expect.any(Number),
        firstName: 'John',
        lastName: 'Snow',
      });
    });
  });
});
