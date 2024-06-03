import { Lead } from '.'

export abstract class LeadRepository {
  abstract findById(id: string): Promise<Lead | null>
}
