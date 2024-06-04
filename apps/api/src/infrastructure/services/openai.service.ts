import { Injectable, Logger } from '@nestjs/common'
import OpenAI from 'openai'

import { Lead } from '@/domain/lead'
import { User } from '@/domain/user'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

@Injectable()
export class OpenAiService {
  async generateLeadMessage(lead: Lead, user: User, subject: string) {
    try {
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Your name is: ${user.firstName} ${user.lastName}. You are ${user.company?.onboardData?.salesSpeechContext || 'A BDR of a SaaS product'}. You are targeting ${lead.firstName} ${lead.lastName} (${lead.currentPosition.jobTitle} in ${lead.currentPosition.company.name}. Responsabilities are: ${lead.currentPosition.jobDescription}). You are trying to book a meeting with them to show your product. You are writing an email to them.`,
          },
          {
            role: 'system',
            content: `Response should be just the email body (not the subject). The subject of the email is ${subject}. Email should be professional and concise. You can include a brief introduction of yourself and your company, and a call to action to book a meeting with you.`,
          },
        ],
        seed: 12345,
        temperature: 0.2,
        model: 'gpt-3.5-turbo-0125',
      })
      return response.choices[0].message.content || ''
    } catch (error) {
      Logger.error('Error creating custom message', error)
      return ''
    }
  }
}
