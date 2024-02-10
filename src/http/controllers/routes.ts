import type { FastifyInstance } from "fastify";
import { createAccount } from "./createAccount";
import { definePasswordAccount } from "./definePassword";
import { addFriend } from "./addFriend";
import { getAccount } from "./getAccount";

export const routesAccount = async (route: FastifyInstance) => {
  route.post('/', createAccount)
  route.post('/finish_account', definePasswordAccount)
  route.post('/add_friend', addFriend)
  route.get('/:user_id', getAccount)
}