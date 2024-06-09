import BarChart from '@app/components/charts/BarChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@app/components/ui/card'
import { Skeleton } from '@app/components/ui/skeleton'
import useDashboardData from '@app/lib/hooks/queries/useDashboardData'

export default function IndustryBarChart() {
  const { data, isLoading } = useDashboardData()

  return isLoading ? (
    <Skeleton className="w-full h-[500px]" />
  ) : (
    <Card>
      <CardHeader>
        <CardTitle className="text-md font-medium lg:text-lg">Campaigns impact by month</CardTitle>
        <CardDescription> How many calls have been scheduled in the industry by month </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <BarChart
          data={Object.keys(data?.callsPerMonthByIndustry || {}).map(key => ({
            name: key,
            total: data!.callsPerMonthByIndustry[key],
          }))}
        />
      </CardContent>
    </Card>
  )
}
