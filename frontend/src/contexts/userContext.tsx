import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { isObjectEmpty } from "../utils";
import { api } from "../service/api";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import { InvitationsProvider } from "./invitationsContext";

export interface IUser {
  id: string
  email: string
  name: string
  avatar: string
  created: Date | string
  modified: Date | string
  is_finish_auth: boolean
  friends: Pick<IUser, 'id' | 'avatar' | 'email' | 'name'>[]
}

// eslint-disable-next-line react-refresh/only-export-components
export const default_inital_state_user: IUser = {
  id: '',
  avatar: '',
  created: '',
  email: '',
  friends: [],
  is_finish_auth: false,
  modified: '',
  name: ''
}

export interface IUserContext {
  user: IUser
  setStateUser: (data: IUser) => void
  setFriends: (friend: Pick<IUser, 'id' | 'avatar' | 'email' | 'name'>[]) => void
}

export const UserContext = createContext({} as IUserContext)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>(default_inital_state_user)

  function setStateUser (data: IUser) {
    setUser(data)
  }

  const setFriends = (data: Pick<IUser, 'id' | 'avatar' | 'email' | 'name'>[]) => {
    setUser(prevState => ({
      ...prevState,
      friends: data
    }))
  }

  return (
    <UserContext.Provider
      value={{
        user,

        // Fuctions
        setStateUser,
        setFriends
      }}
    >
      <InvitationsProvider>
        {children}
      </InvitationsProvider>
    </UserContext.Provider>
  )
}