import { useContext, useEffect, useState } from "react"
import { Bell, BellDot, UserRoundPlus } from "lucide-react"
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

  const { notification, setNotificationOff } = useContext(InvitesContext)
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

    if (notification)
      setNotificationOff()
  }

  return (
    <ContainerMainHome>
      <ContentMain>
        <ContainerSide>
          <div className="container-header-side">
            <Avatar name={user?.name} />

            <div className="content-actions-header-side">
              <UserRoundPlus onClick={() => setIsActiveAddUser(!isActiveAddUser)} className="icon-header-side-action" />
              {notification ? (
                <BellDot onClick={handleOpenCloseNotificationAndSetOffAlart} className="icon-header-side-action" />
              ) : (
                <Bell onClick={handleOpenCloseNotificationAndSetOffAlart} className="icon-header-side-action" />
              )}
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

                    <span className="message">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis vel nesciunt neque. Blanditiis eum nihil numquam quibusdam aut, praesentium quasi nobis, illo sequi nam ipsam ut adipisci accusamus pariatur reprehenderit.
                    </span>
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