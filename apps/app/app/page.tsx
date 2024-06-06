'use client'

import LineChart from '@app/components/charts/LineChart'
import PieChart from '@app/components/charts/PieChart'
import MetricsCard from '@app/components/dashboard/MetricsCard'

export default function Dashboard() {
  const metrics = {
    campaigns: 3,
    groups: 5,
    scheduledCalls: 267,
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <p className="text-xl lg:text-2xl font-extrabold text-center">Welcome Leo! Here is a resume of your activity</p>
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
        <p className="text-xl lg:text-2xl font-extrabold text-center mb-5">
          Check this potential data about your potential leads
        </p>
        <div className="grid grid-rows-2 gap-5">
          <div className="grid grid-cols-2 gap-5">
            <PieChart />
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  )
}
