import { Body, Controller, Post } from '@nestjs/common'

import { User } from '@/domain/user'

import { CreateGroup } from '../../application/group/create-group.usecase'
import { LoggedUser } from '../decorators/logged-user.decorator'
import { mapToGroupResponse } from '../mappers/group.mapper'
import { CreateGroupBody } from '../schemas/group/create-group.schema'

@Controller('groups')
export class GroupController {
  constructor(private createGroup: CreateGroup) {}

  @Post()
  async create(@Body() body: CreateGroupBody, @LoggedUser() user: User) {
    const group = await this.createGroup.execute(user.id, body.leadsIds, {
      name: body.name,
      description: body.description,
    })
    return mapToGroupResponse(group)
  }
}
