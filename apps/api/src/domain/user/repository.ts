import { User } from '.'

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | null>

  abstract findByEmail(email: string): Promise<User | null>
}
