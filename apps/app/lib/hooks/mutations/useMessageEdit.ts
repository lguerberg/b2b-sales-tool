import { EditCampaignMessageBody } from '@api/infrastructure/schemas/campaign/edit-campaign-message.schema'
import { useToast } from '@app/components/ui/use-toast'
import api, { ApiError } from '@app/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useMessageEdit(campaignId: string, leadId: string, onEditSuccess: () => void) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { mutate: editMessage, isPending: isEditing } = useMutation({
    mutationKey: ['EditMessage', campaignId, leadId],
    mutationFn: async (values: EditCampaignMessageBody) =>
      api.put(`campaigns/${campaignId}/leads/${leadId}/message`, values),
    onSuccess: () => {
      onEditSuccess()
      queryClient.invalidateQueries({
        queryKey: ['CampaignDetails', campaignId],
      })
      toast({
        title: 'Message edited!',
        description: 'The message will be sent as you configured when you launch the campaign.',
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

  return { editMessage, isEditing }
}
