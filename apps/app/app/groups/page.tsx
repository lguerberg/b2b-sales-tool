import GroupsTable from '@app/components/groups/GroupsTable'
import SectionDescription from '@app/components/titles/SectionDescription'
import SectionTitle from '@app/components/titles/SectionTitle'
import { Button } from '@app/components/ui/button'
import { ROUTES } from '@app/lib/constants'
import Link from 'next/link'

export default function Groups() {
  return (
    <div>
      <div className="flex flex-row justify-between gap-5">
        <div className="mb-5">
          <SectionTitle>Your groups</SectionTitle>
          <SectionDescription>Manage your group of leads and create campaigns</SectionDescription>
        </div>
        <Link href={ROUTES.PROSPECT.path}>
          <Button>Prospect leads</Button>
        </Link>
      </div>
      <GroupsTable />
    </div>
  )
}
