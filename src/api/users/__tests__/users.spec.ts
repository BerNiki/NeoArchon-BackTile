import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ConflictException } from '@nestjs/common';

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

const mockUser: User = {
  id: 'test-id',
  email: 'test@email.zorg',
  username: 'testBuddy06',
  passwordHash: 'test-password-hash',
  jti: 'test-jti',
  elo: 1000,
  games: [],
  created_at: new Date(),
  updated_at: new Date(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<User>;

  beforeEach(async () => {
    const mockRepo = {
      findOneBy: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<MockRepository<User>>(getRepositoryToken(User));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user by Id', async () => {
    repository.findOneBy?.mockReturnValue(mockUser);
    expect(await service.findById('test-id')).toEqual(mockUser);
    expect(repository.findOneBy).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundException if user id is incorrect', async () => {
    repository.findOneBy?.mockReturnValue(null);
    await expect(service.findById('wrong-id')).rejects.toThrow(
      'User with this email not found!',
    );
    expect(repository.findOneBy).toHaveBeenCalledTimes(1);
  });

  it('should find user by email', async () => {
    repository.findOneBy?.mockReturnValue(mockUser);
    expect(await service.findByEmail('test-id')).toEqual(mockUser);
    expect(repository.findOneBy).toHaveBeenCalledTimes(1);
  });

  it('should throw NotFoundException if email is incorrect', async () => {
    repository.findOneBy?.mockReturnValue(null);
    await expect(service.findByEmail('wrong-id')).rejects.toThrow(
      'User with this email not found!',
    );
    expect(repository.findOneBy).toHaveBeenCalledTimes(1);
  });

  it('should find user by email with safe method', async () => {
    repository.findOneBy?.mockReturnValue(mockUser);
    expect(await service.findByEmailSafe('test-id')).toEqual(mockUser);
    expect(repository.findOneBy).toHaveBeenCalledTimes(1);
  });

  it('should not throw NotFoundException if email is incorrect', async () => {
    repository.findOneBy?.mockReturnValue(null);
    expect(await service.findByEmailSafe('wrong-id')).toBe(null);
    expect(repository.findOneBy).toHaveBeenCalledTimes(1);
  });

  it('should find user by username with safe method', async () => {
    repository.findOneBy?.mockReturnValue(mockUser);
    expect(await service.findByUsernameSafe('test-id')).toEqual(mockUser);
    expect(repository.findOneBy).toHaveBeenCalledTimes(1);
  });

  it('should not throw NotFoundException if username is incorrect', async () => {
    repository.findOneBy?.mockReturnValue(null);
    expect(await service.findByUsernameSafe('wrong-id')).toBe(null);
    expect(repository.findOneBy).toHaveBeenCalledTimes(1);
  });

  it('should save user', async () => {
    repository.create?.mockReturnValue(mockUser);
    repository.save?.mockReturnValue(mockUser);
    expect(await service.saveUser(mockUser)).toEqual(mockUser);
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledTimes(1);
  });

  it('should delete user', async () => {
    repository.findOneBy?.mockResolvedValue(mockUser);
    expect(await service.deleteUser('test-id')).toBeFalsy();
    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith('test-id');
    expect(repository.findOneBy).toHaveBeenCalledTimes(1);
  });

  describe('updateUser', () => {
    let findByIdSpy: jest.SpyInstance;
    let findByEmailSafeSpy: jest.SpyInstance;
    let findByUsernameSafeSpy: jest.SpyInstance;

    const updateUserDto: UpdateUserDto = {
      email: 'new@b.com',
      username: 'userB',
    };
    const updatedUser: User = { ...mockUser, ...updateUserDto };

    beforeEach(() => {
      findByIdSpy = jest.spyOn(service, 'findById').mockImplementation();
      findByEmailSafeSpy = jest
        .spyOn(service, 'findByEmailSafe')
        .mockImplementation();
      findByUsernameSafeSpy = jest
        .spyOn(service, 'findByUsernameSafe')
        .mockImplementation();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should update a user successfully', async () => {
      findByIdSpy.mockResolvedValueOnce(mockUser);

      findByEmailSafeSpy.mockResolvedValue(null);
      findByUsernameSafeSpy.mockResolvedValue(null);

      repository.update?.mockResolvedValue({ affected: 1 });

      findByIdSpy.mockResolvedValueOnce(updatedUser);

      const result = await service.updateUser(mockUser.id, updateUserDto);

      expect(result).toEqual(updatedUser);

      expect(findByIdSpy).toHaveBeenCalledWith(mockUser.id);
      expect(findByEmailSafeSpy).toHaveBeenCalledWith(updateUserDto.email);
      expect(findByUsernameSafeSpy).toHaveBeenCalledWith(
        updateUserDto.username,
      );
      expect(repository.update).toHaveBeenCalledWith(
        mockUser.id,
        updateUserDto,
      );

      expect(findByIdSpy).toHaveBeenCalledTimes(2);
    });

    it('should throw ConflictException if email already exists', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'existing@email.mail',
        username: 'existingName',
      };

      findByIdSpy.mockResolvedValue(mockUser);

      findByEmailSafeSpy.mockResolvedValue(mockUser);

      await expect(
        service.updateUser(mockUser.id, updateUserDto),
      ).rejects.toThrow(ConflictException);

      expect(repository.update).not.toHaveBeenCalled();
    });
  });
});
