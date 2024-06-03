import { UserRepository } from '@/domain/user/repository'

export class MockUserRepository implements UserRepository {
  findById = jest.fn()

  findByEmail = jest.fn()
}
