import { SendHorizontal } from "lucide-react"
import { Avatar } from "../../../components/avatar"
import * as Message from "./styles"
import React, { useContext, useEffect, useState } from "react"
import { ConversationContext } from "../../../contexts/ConversationContext"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useWebSocket from "react-use-websocket"
import { AxiosResponse } from "axios"
import { api } from "../../../service/api"
import { toast } from "sonner"
import { useCurrentUser } from "../../../hooks/useUser"
import { format } from 'date-fns'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export interface IMessage {
  email: string
  created: string
  message: string
}
export interface IConversation {
  id: string
  accountOwnerId: string
  friendEmail: string
  secretChatKey: string
  messages: Array<IMessage>
}

const sendMessageSchema = z.object({
  message: z.string()
})
type ISendMessage = z.infer<typeof sendMessageSchema>

export const Conversation = () => {
  const [messages, setMessages] = useState<IMessage[]>([])

  const { user } = useCurrentUser()
  const { userSelectToConversation } = useContext(ConversationContext)

  const [isTyping, setIsTyping] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch
  } = useForm<ISendMessage>({ resolver: zodResolver(sendMessageSchema) })

  const { isLoading, error, data } = useQuery<IConversation>({
    queryKey: ['conversation_get', 'conversation_get_home'],
    queryFn: async () => {
      const response: AxiosResponse<IConversation> = await api.get(`api/account/conversation/${userSelectToConversation.email}`)

      return response.data
    },
  })

  const { mutateAsync: mutationSendMessageAsync } = useMutation({
    mutationFn: async (dataMessage: IMessage) => {
      const response = await api.post(`api/account/conversation/${data?.secretChatKey}`, dataMessage)

      return response.data as IConversation
    },
    onSuccess: (data) => {
      reset({ message: '' })
    },
    onError: () => {
      toast.error('Error ao tentar enviar a message')
    }
  })

  const { lastMessage } = useWebSocket(`ws://localhost:3333/api/ws/account/conversation/${data?.secretChatKey}`)

  useEffect(() => {
    if (isLoading) return

    if (error) {
      toast.error('Error ao tentar buscar as conversas')
      return
    }

    setMessages(data?.messages as IMessage[])
  }, [isLoading, error])

  useEffect(() => {
    const lastInvite: IMessage = lastMessage ? JSON.parse(lastMessage.data) : null

    if (!lastInvite)
      return

    const data = lastInvite
    setMessages([data, ...messages])
  }, [lastMessage])

  const handleSendMessage = async (data: ISendMessage) => {
    if (!watch('message'))
      return

    const dataSendMessage: IMessage = {
      email: user?.email as string,
      created: new Date().toISOString(),
      message: data.message
    }

    await mutationSendMessageAsync(dataSendMessage)
  }

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
          {messages.map((item, index) => {
            const isRight = item.email === user?.email

            return (
              <React.Fragment key={index}>
                <div className={`content-message ${isRight && 'content-message-right'}`}>
                  <span className="message">{item.message}</span>

                  <span className="time-sended-message">
                    {format(item.created, 'hh:mm')}
                  </span>
                </div>
              </React.Fragment>
            )
          })}
        </Message.ContainerMessage>

        <div className="container-send-message">
          <input
            placeholder="Digite a sua messagem"
            type="text"
            {...register('message')} />

          <div onClick={handleSubmit(handleSendMessage)} className={`send-message ${!watch('message') && 'disabled-enter'}`}>
            <SendHorizontal />
          </div>
        </div>
      </Message.ContainerMessageAndSendMessage>
    </Message.ContainerConversationMain>
  )
}