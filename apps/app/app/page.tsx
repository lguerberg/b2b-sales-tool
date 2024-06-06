'use client'

import MetricsCard from '@app/components/dashboard/MetricsCard'
import SectionTitle from '@app/components/titles/SectionTitle'

export default function Dashboard() {
  const metrics = {
    campaigns: 3,
    groups: 5,
    scheduledCalls: 267,
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <SectionTitle>Welcome Leo! Here is a resume of your activity</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-evenly gap-4">
          <MetricsCard title="Campaigns" Icon={() => <div>Icon</div>}>
            <div className="min-w-40">{metrics.campaigns}</div>
          </MetricsCard>
          <MetricsCard title="Groups" Icon={() => <div>Icon</div>}>
            <div className="min-w-40">{metrics.groups}</div>
          </MetricsCard>
          <MetricsCard title="Scheduled Calls" Icon={() => <div>Icon</div>}>
            <div className="min-w-40">{metrics.scheduledCalls}</div>
          </MetricsCard>
          <MetricsCard title="Scheduled Calls" Icon={() => <div>Icon</div>}>
            <div className="min-w-40">{metrics.scheduledCalls}</div>
          </MetricsCard>
        </div>
      </div>

      <div className="flex flex-col">
        <SectionTitle>Check this potential data about your potential leads</SectionTitle>
      </div>
    </div>
  )
}
