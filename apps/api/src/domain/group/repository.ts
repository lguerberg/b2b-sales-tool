import { Group } from '.'

export abstract class GroupRepository {
  abstract create(creatorId: string, leadIds: string[], data: Partial<Group>): Promise<Group>
}
