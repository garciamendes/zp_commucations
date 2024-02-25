import { Check, X } from "lucide-react"
import { IInvite, InvitesContext } from "../../../contexts/invitationsContext"
import { useContext, useEffect } from "react"
import { toast } from "sonner"
import { ILastMessageWs, useInvites } from "../../../hooks/useInvites"
import { useCurrentUser } from "../../../hooks/useUser"
import useWebSocket from "react-use-websocket"

export interface IInviteProps {
  isActiveNotifications: boolean
}

export const Invites = ({ isActiveNotifications }: IInviteProps) => {
  const { user } = useCurrentUser()
  const { lastMessage } = useWebSocket(`ws://localhost:3333/api/ws/account/${user?.email}`)

  const { invites, setStateInvitations, pushNewInvite } = useContext(InvitesContext)
  const { data, error, isLoading, mutateNotAcceptInviteAsync, mutateYesAcceptInviteAsync } = useInvites()

  useEffect(() => {
    if (isLoading) return

    if (error) {
      toast.error('Error ao tentar buscar os convites')
      return
    }

    setStateInvitations(data as IInvite)
  }, [isLoading, error])

  useEffect(() => {
    const lastInvite: ILastMessageWs = lastMessage ? JSON.parse(lastMessage.data) : null

    if (!lastInvite)
      return

    const { email } = lastInvite
    pushNewInvite(email)
  }, [lastMessage])

  const handleNoAcceptInvite = async (email: string) => {
    await mutateNotAcceptInviteAsync({ email })
  }

  const handleYesAcceptInvite = async (email: string) => {
    await mutateYesAcceptInviteAsync({ email })
  }

  return (
    <div className={`container-notifications ${isActiveNotifications && 'active-content-notifications'}`}>
      <div className="content-notifications">
        {!invites?.invitations?.length ? (
          <span style={{ margin: '0px auto' }}>Nenhum convite</span>
        ) : (
          invites?.invitations?.map(email => (
            <div className="content-notification">
              <span>{email} lhe enviou um convite</span>
              <div className="content-actions">
                <span className="icon-action-notification">
                  <X onClick={() => handleNoAcceptInvite(email)} className="icon-notification" />
                </span>

                <span className="icon-action-notification">
                  <Check onClick={() => handleYesAcceptInvite(email)} className="icon-notification" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}