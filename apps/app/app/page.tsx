import BarChart from '@app/components/charts/BarChart'
import MetricsCard from '@app/components/dashboard/MetricsCard'
import SectionDescription from '@app/components/titles/SectionDescription'
import SectionTitle from '@app/components/titles/SectionTitle'
import { Button } from '@app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@app/components/ui/card'
import { ROUTES } from '@app/lib/constants'
import { ArrowRight, Headset, Mail, MailOpen, Megaphone } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const metrics = {
    campaigns: 10,
    emails: 1253,
    opened: 543,
    scheduledCalls: 46,
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="justify-between items-center flex">
          <SectionTitle>Welcome Leo! Here is a resume of your activity</SectionTitle>
          <Link className="hidden md:block" href={ROUTES.PROSPECT.path}>
            <Button>
              <div className="flex justify-between items-center">
                <p> Start prospecting </p>
                <ArrowRight className="w-5 h-5 ml-3" />
              </div>
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-evenly gap-4">
          <MetricsCard title="Campaigns" Icon={Megaphone}>
            <div className="min-w-40">{metrics.campaigns}</div>
          </MetricsCard>
          <MetricsCard title="Emails sent" Icon={Mail}>
            <div className="min-w-40">{metrics.emails}</div>
          </MetricsCard>
          <MetricsCard title="Emails opened" Icon={MailOpen}>
            <div className="min-w-40">{metrics.opened}</div>
          </MetricsCard>
          <MetricsCard title="Scheduled Calls" Icon={Headset}>
            <div className="min-w-40">{metrics.scheduledCalls}</div>
          </MetricsCard>
        </div>
      </div>

      <div className="flex flex-col">
        <SectionTitle>Check this data about your potential leads</SectionTitle>
        <SectionDescription> Here you will see updated information about Fintech leads</SectionDescription>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-md font-medium lg:text-lg">Campaigns impact by month</CardTitle>
          <CardDescription> How many calls have been scheduled in the industry by month </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <BarChart />
        </CardContent>
      </Card>
    </div>
  )
}
