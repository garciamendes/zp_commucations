import { SendHorizontal } from "lucide-react"
import { Avatar } from "../../../components/avatar"
import * as Message from "./styles"
import { useContext } from "react"
import { ConversationContext } from "../../../contexts/ConversationContext"

export const Conversation = () => {
  const { userSelectToConversation } = useContext(ConversationContext)

  return (
    <Message.ContainerConversationMain>
      <Message.HeaderConversation>
        <Avatar />

        <div className="info-friend">
          <span>{userSelectToConversation.email}</span>

          <span className="message">
            Online
          </span>
        </div>
      </Message.HeaderConversation>

      <Message.ContainerMessageAndSendMessage>
        <Message.ContainerMessage>
          {Array.from({ length: 100 }).map((_, index) => {
            const isRight = index % 2 !== 0

            return (
              <>
                <div className={`content-message ${isRight && 'content-message-right'}`}>
                  <span className="message">
                    meessage
                  </span>

                  <span className="time-sended-message">
                    {new Date().getHours()}:{new Date().getMinutes()}
                  </span>
                </div>
              </>
            )
          })}
        </Message.ContainerMessage>

        <div className="container-send-message">
          <input placeholder="Digite a sua messagem" type="text" />

          <div className="send-message">
            <SendHorizontal />
          </div>
        </div>
      </Message.ContainerMessageAndSendMessage>
    </Message.ContainerConversationMain>
  )
}