import { invitationAddUser } from "@/utils/invitation-add-user-pub-sub";
import { SocketStream } from "@fastify/websocket";
import { FastifyRequest } from "fastify";
import { z } from "zod";

export const inviteAddUser = async (connection: SocketStream, request: FastifyRequest) => {
  const invitationEmailParams = z.object({
    email_friend: z.string().email(),
  })

  const { email_friend } = invitationEmailParams.parse(request.params)

  invitationAddUser.subscribe(email_friend, (message) => {
    connection.socket.send(JSON.stringify(message))
  })
}