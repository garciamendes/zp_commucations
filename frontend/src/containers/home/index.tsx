import { useContext, useEffect, useState } from "react"
import { Bell, UserRoundPlus } from "lucide-react"
import { withAuth } from "../../hooks/withAuth"
import { ContainerMainHome, ContainerSide, ContentMain } from "./styles"
import { InvitationAddUser } from "./addUser"
import { Invites } from "./invites/índex"
import { InvitesContext } from "../../contexts/invitationsContext"
import { Conversation } from "./conversation"
import { Avatar } from "../../components/avatar"
import { toast } from "sonner"
import { ConversationContext } from "../../contexts/ConversationContext"
import { useCurrentUser } from "../../hooks/useUser"

const Home = () => {
  const { user, error, loading } = useCurrentUser()

  const { invites } = useContext(InvitesContext)
  const { handleSelectUserToConversation, userSelectToConversation } = useContext(ConversationContext)

  const [isActiveAddUser, setIsActiveAddUser] = useState(false)
  const [isActiveNotifications, setIsActiveNotifications] = useState(false)


  useEffect(() => {
    if (loading)
      return

    if (error) {
      toast.error('Erro ao tentar buscar o usuário')
      return
    }
  }, [error, loading])

  const handleOpenCloseNotificationAndSetOffAlart = () => {
    setIsActiveNotifications(!isActiveNotifications)
  }

  return (
    <ContainerMainHome>
      <ContentMain>
        <ContainerSide>
          <div className="container-header-side">
            <Avatar name={user?.name} />

            <div className="content-actions-header-side">
              <div className="content-action-notifications">
                <Bell onClick={handleOpenCloseNotificationAndSetOffAlart} size={30} className="icon-header-side-action" />

                {invites.invitations.length > 0 && (
                  <div className="content-amount-invites">
                    {invites.invitations.length}
                  </div>
                )}
              </div>

              <UserRoundPlus onClick={() => setIsActiveAddUser(!isActiveAddUser)} size={30} className="icon-header-side-action" />
            </div>
          </div>

          <div className='content-side-list-user' style={{ overflow: (isActiveAddUser || isActiveNotifications) ? 'hidden' : 'auto' }}>
            <InvitationAddUser isActiveAddUser={isActiveAddUser} />

            <Invites isActiveNotifications={isActiveNotifications} />

            {!user?.friends.length ? (
              <span style={{ margin: '5px auto', color: 'white' }}>Nenhum amigo encontrado</span>
            ) : (
              user?.friends.map(friend => (
                <div onClick={() => handleSelectUserToConversation(friend)} className="container-item-friend">
                  <Avatar name={friend.name} />

                  <div className="info-friend">
                    <span>{friend.email}</span>

                    {/* <span className="message">
                      d
                    </span> */}
                  </div>
                </div>
              ))
            )}
          </div>
        </ContainerSide>

        {!userSelectToConversation.id ? (
          <span style={{ margin: '1rem auto', color: 'white' }}>
            Selecione um amigo para iníciar um conversa
          </span>
        ) : (
          <Conversation />
        )}
      </ContentMain>
    </ContainerMainHome>
  )
}

export default withAuth(Home)