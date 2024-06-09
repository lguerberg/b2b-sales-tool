import { Group } from '.'
import { Paginated } from '../../infrastructure/types/paginate'

export abstract class GroupRepository {
  abstract findById(id: string): Promise<Group | null>

  abstract findByUserId(id: string, limit: number, offset: number): Promise<Paginated<Group>>

  abstract create(creatorId: string, leadIds: string[], data: Partial<Group>): Promise<Group>
}
