import { getModelToken } from '@nestjs/sequelize';
import { Test } from '@nestjs/testing';

import { Password } from './password.model';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(Password),
          useValue: {
            create: jest.fn(),
            sequelize: {
              transaction: jest.fn(() => ({
                commit: jest.fn(),
                rollback: jest.fn(),
              })),
            },
          },
        },
      ],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('createPassword should create normally', async () => {
    await service.createPassword({ userId: 123, password: 'test-test' });
    expect(service['passwordRepository'].create).toBeCalled();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
