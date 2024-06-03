import { UserRepository } from '@/domain/user/repository'

export class MockUserRepository implements UserRepository {
  findByEmail = jest.fn()
}
