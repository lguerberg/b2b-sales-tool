import { Group } from '.'

export abstract class GroupRepository {
  abstract findById(id: string): Promise<Group | null>

  abstract create(creatorId: string, leadIds: string[], data: Partial<Group>): Promise<Group>
}
