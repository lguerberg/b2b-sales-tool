import { User } from '.'

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>
}
