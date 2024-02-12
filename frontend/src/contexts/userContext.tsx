import { ReactNode, createContext, useState } from "react";

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
}

export const UserContext = createContext({} as IUserContext)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>(default_inital_state_user)

  const setStateUser = (data: IUser) => {
    setUser(data)
  }

  return (
    <UserContext.Provider
     value={{
      user,

      // Fuctions
      setStateUser
     }}
    >
      {children}
    </UserContext.Provider>
  )
}