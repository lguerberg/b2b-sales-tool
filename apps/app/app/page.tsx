'use client'

import CampaignsBarChart from '@app/components/dashboard/CampaignsBarChart'
import UserMetrics from '@app/components/dashboard/UserMetrics'
import SectionDescription from '@app/components/titles/SectionDescription'
import SectionTitle from '@app/components/titles/SectionTitle'
import { Button } from '@app/components/ui/button'
import { ROUTES } from '@app/lib/constants'
import useDashboardData from '@app/lib/hooks/queries/useDashboardData'
import useLoggedUser from '@app/lib/hooks/queries/useLoggedUser'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { loggedUser, isLoading: isUserLoading } = useLoggedUser()
  const { isLoading: isLoadingData } = useDashboardData()

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="justify-between items-center flex">
          <SectionTitle isLoading={isUserLoading}>
            Welcome {loggedUser?.firstName}! Here is a resume of your activity
          </SectionTitle>
          <Link className="hidden md:block" href={ROUTES.PROSPECT.path}>
            <Button>
              <div className="flex justify-between items-center">
                <p> Start prospecting </p>
                <ArrowRight className="w-5 h-5 ml-3" />
              </div>
            </Button>
          </Link>
        </div>
        <UserMetrics />
      </div>
      <div className="flex flex-col">
        <SectionTitle isLoading={isLoadingData}>Global data that can be useful for you</SectionTitle>
        <SectionDescription isLoading={isLoadingData}>
          Here you will see updated information about what is going on in the market.
        </SectionDescription>
      </div>
      <CampaignsBarChart />
    </div>
  )
}
