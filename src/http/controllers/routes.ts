import type { FastifyInstance } from "fastify";
import { createAccount } from "./createAccount";
import { definePasswordAccount } from "./definePassword";
import { addFriend } from "./addFriend";
import { getCurrentAccount } from "./getAccount";
import { authenticateAccount } from "./authenticate";
import { verifyJWT } from "../middlewares/verify-jwt";
import { getInvites } from "./getInvites";
import { acceptOrNotInvite } from "./acceptInvite";

export const routesAccount = async (route: FastifyInstance) => {
  route.post('/', createAccount)
  route.post('/finish_account', definePasswordAccount)
  route.post('/authenticate', authenticateAccount)
  route.post('/add_friend', { onRequest: [verifyJWT] }, addFriend)
  route.get('/get_invites', { onRequest: [verifyJWT] }, getInvites)
  route.get('/current_user', { onRequest: [verifyJWT] }, getCurrentAccount)
  route.post('/accept_or_not_invite', { onRequest: [verifyJWT] }, acceptOrNotInvite)
}