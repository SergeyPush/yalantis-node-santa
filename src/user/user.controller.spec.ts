import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BadRequestException } from '@nestjs/common';

describe('TestController', () => {
  let controller: UserController;

  const testUser = {
    id: '1',
    firstName: 'John',
    secondName: 'Doe',
    listOfWishes: ['iPod', 'Macbook Air M1'],
  };
  const mockUserService = {
    createUser: jest.fn().mockImplementation((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    findOne: jest.fn().mockImplementation((id) => ({
      ...testUser,
      id,
    })),
    findAll: jest.fn().mockImplementation(() => [testUser]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined', () => {
    expect(mockUserService).toBeDefined();
  });

  it('should create a user', () => {
    const dto = {
      firstName: 'John',
      lastName: 'Snow',
      listOfWishes: ['iPod', 'Macbook Air M1'],
    };
    expect(controller.createUser(dto)).toEqual({
      id: expect.any(Number),
      firstName: 'John',
      lastName: 'Snow',
      listOfWishes: ['iPod', 'Macbook Air M1'],
    });
    expect(mockUserService.createUser).toHaveBeenCalledWith(dto);
  });

  it('should return one user', async () => {
    mockUserService.findOne.mockReturnValue(testUser);
    const user = await controller.findOne(1);
    expect(user).toEqual(testUser);
    expect(mockUserService.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw an error if user does not exist', async () => {
    mockUserService.findOne.mockReturnValue(
      new BadRequestException('User with id 1 does not exist'),
    );
    const user = controller.findOne(1);
    expect(user).toEqual(
      new BadRequestException('User with id 1 does not exist'),
    );
  });

  it('should return all users', () => {
    expect(controller.findAll()).toEqual([testUser]);
    expect(mockUserService.findAll).toHaveBeenCalled();
  });
});
