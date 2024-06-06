import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui/card'

import { MetricsCardProps } from './types'

export default function MetricsCard({ title, children, Icon }: MetricsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium lg:text-lg">{title}</CardTitle>
        <Icon className="w-15 h-15" />
      </CardHeader>
      <CardContent className="text-2xl font-bold">{children}</CardContent>
    </Card>
  )
}
