import CampaignsTable from '@app/components/campaigns/CampaignsTable'
import SectionDescription from '@app/components/titles/SectionDescription'
import SectionTitle from '@app/components/titles/SectionTitle'

export default function Campaigns() {
  return (
    <div>
      <div className="flex flex-row justify-between gap-5">
        <div className="mb-5">
          <SectionTitle>Your campaigns</SectionTitle>
          <SectionDescription>Check your existing campaings, edit messages and analyze results</SectionDescription>
        </div>
      </div>
      <CampaignsTable />
    </div>
  )
}
