import { IInvite, InvitesContext } from "../contexts/invitationsContext"
import { api } from "../service/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useContext } from "react"
import { IUser } from "../contexts/userContext"

export interface ILastMessageWs {
  email: string
}

export interface IAcceptInvite {
  account: IUser
  invite: IInvite
}

export const useInvites = () => {
  const { setStateInvitations } = useContext(InvitesContext)
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ['invites'],
    queryFn: async () => {
      const response = await api.get('api/account/get_invites')

      return response.data as IInvite
    },
  })

  const { mutateAsync: mutateNotAcceptInviteAsync } = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await api.post('/api/account/accept_or_not_invite', {
        emailToConfirmAccept: email,
        accept: false
      })

      return response.data as IInvite
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['current_user', 'invites'],
      })
      setStateInvitations(data)
    },
    onError: () => {
      toast.error('Error ao tentar excluir o invite')
    }
  })

  const { mutateAsync: mutateYesAcceptInviteAsync } = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await api.post('/api/account/accept_or_not_invite', {
        emailToConfirmAccept: email,
        accept: true
      })

      return response.data as IAcceptInvite
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['current_user', 'invites'],
      })
      setStateInvitations(data.invite)
    },
    onError: () => {
      toast.error('Error ao tentar aceitar o invite')
    }
  })

  return {
    isLoading,
    error,
    data,
    mutateNotAcceptInviteAsync,
    mutateYesAcceptInviteAsync
  }
}