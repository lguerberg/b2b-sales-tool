'use client'

import useDashboardData from '@app/lib/hooks/queries/useDashboardData'
import { Headset, Mail, MailOpen, Megaphone } from 'lucide-react'

import MetricsCard from '../MetricsCard'

export default function UserMetrics() {
  const { data, isLoading } = useDashboardData()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-evenly gap-4">
      <MetricsCard title="Campaigns" Icon={Megaphone} isLoading={isLoading}>
        <div className="min-w-40">{data?.campaigns}</div>
      </MetricsCard>
      <MetricsCard title="Emails sent" Icon={Mail} isLoading={isLoading}>
        <div className="min-w-40">{data?.emailsSent}</div>
      </MetricsCard>
      <MetricsCard title="Emails opened" Icon={MailOpen} isLoading={isLoading}>
        <div className="min-w-40">{data?.emailsOpened}</div>
      </MetricsCard>
      <MetricsCard title="Scheduled Calls" Icon={Headset} isLoading={isLoading}>
        <div className="min-w-40">{data?.scheduledCalls}</div>
      </MetricsCard>
    </div>
  )
}
