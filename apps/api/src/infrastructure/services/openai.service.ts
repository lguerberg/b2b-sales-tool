import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'

import { Lead } from '@/domain/lead'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

@Injectable()
export class OpenAiService {
  async generateLeadMessage(lead: Lead, userContext?: string) {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are ${userContext || 'A BDR of a SaaS product'}. You are targeting ${lead.firstName} ${lead.lastName} (${lead.currentPosition.jobTitle} in ${lead.currentPosition.company.name}. Responsabilities are: ${lead.currentPosition.jobDescription}). You are trying to book a meeting with them to show your product. You are writing an email to them.`,
        },
        {
          role: 'system',
          content: `Response should be just the email content.`,
        },
      ],
      seed: 12345,
      temperature: 0.2,
      model: 'gpt-4o-2024-05-13',
    })
    return response.choices[0].message.content || ''
  }
}
