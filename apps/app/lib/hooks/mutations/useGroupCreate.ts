import { CreateGroupBody } from '@api/infrastructure/schemas/group/create-group.schema'
import { useToast } from '@app/components/ui/use-toast'
import api, { ApiError } from '@app/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useGroupCreate() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { mutate: createGroup, isPending: isCreating } = useMutation({
    mutationKey: ['GroupCreate'],
    mutationFn: async (values: CreateGroupBody) => api.post(`/groups`, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['MyGroups', 0],
      })
      toast({
        title: 'Group created!',
        duration: 10000,
        description: 'Go to the groups table to see it created.',
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

  return { createGroup, isCreating }
}
