import { conversation } from "@/utils/conversation-pub-sub";
import { SocketStream } from "@fastify/websocket";
import { FastifyRequest } from "fastify";
import { z } from "zod";

export const conversationGet = async (connection: SocketStream, request: FastifyRequest) => {
  const paramsRequest = z.object({
    secretKey: z.string().uuid(),
  })

  const { secretKey } = paramsRequest.parse(request.params)

  conversation.subscribe(secretKey, (message) => {
    connection.socket.send(JSON.stringify(message))
  })
}