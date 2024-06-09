import { CreateCampaignBody } from '@api/infrastructure/schemas/group/create-group-campaign.schema'
import { useToast } from '@app/components/ui/use-toast'
import api, { ApiError } from '@app/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useCampaignCreate(groupId: string, onCreateSuccess: () => void) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { mutate: createCampaign, isPending: isCreating } = useMutation({
    mutationKey: ['CampaignCreate'],
    mutationFn: async (values: CreateCampaignBody) => api.post(`/groups/${groupId}/campaign`, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'MyCampaigns',
      })
      onCreateSuccess()
      toast({
        title: 'Campaign created!',
        duration: 10000,
        description:
          'We are creating personalized messages for each lead. This may take a few minutes. You can check the progress in the campaigns table.',
      })
    },
    onError: (error: ApiError) => {
      toast({
        title: 'Error',
        description: error.data.errors.join(', '),
        variant: 'destructive',
      })
    },
  })

  return { createCampaign, isCreating }
}
