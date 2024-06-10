'use client'

import SectionDescription from '@app/components/titles/SectionDescription'
import SectionTitle from '@app/components/titles/SectionTitle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@app/components/ui/card'
import { Checkbox } from '@app/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipProvider } from '@app/components/ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'

import { INTEGRATIONS } from './constants'

export default function Integrations() {
  return (
    <div className="w-full">
      <div className="mb-5">
        <SectionTitle>Integrations</SectionTitle>
        <SectionDescription>
          {' '}
          Connect to other marketing services to take advantage of all of our power{' '}
        </SectionDescription>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {INTEGRATIONS.map(integration => (
          <Card>
            <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium lg:text-lg">{integration.name}</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <>
                    <TooltipTrigger>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          disabled
                          defaultChecked={integration.enabled}
                          className="w-2 h-2"
                          id={integration.name}
                        />
                        <label
                          htmlFor={integration.name}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {integration.enabled ? 'Disable' : 'Enable'}
                        </label>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {' '}
                        {integration.enabled
                          ? `You will be able to change your ${integration.name} integration in the future!`
                          : 'Coming soon!'}
                      </p>
                    </TooltipContent>
                  </>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">{integration.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
