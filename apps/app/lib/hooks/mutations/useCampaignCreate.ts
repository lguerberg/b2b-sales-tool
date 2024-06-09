import { CreateCampaignBody } from '@api/infrastructure/schemas/group/create-group-campaign.schema'
import { useToast } from '@app/components/ui/use-toast'
import api, { ApiError } from '@app/lib/api'
import { useMutation } from '@tanstack/react-query'

export default function useCampaignCreate(groupId: string) {
  const { toast } = useToast()

  const { mutate: createCampaign, isPending: isCreating } = useMutation({
    mutationKey: ['CampaignCreate'],
    mutationFn: async (values: CreateCampaignBody) => api.post(`/groups/${groupId}/campaign`, values),
    onSuccess: () => {
      toast({
        title: 'Campaign created!',
        description: 'We are creating personalized messages for each lead. This may take a few minutes.',
      })
    },
    onError: (error: ApiError) => {
      console.log('error', error)
      toast({
        title: 'Error',
        description: error.data.errors.join(', '),
        variant: 'destructive',
      })
    },
  })

  return { createCampaign, isCreating }
}
