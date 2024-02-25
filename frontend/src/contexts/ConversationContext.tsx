import { ReactNode, createContext, useState } from "react";
import { IUser } from "./userContext";

type IUserSelectType = Pick<IUser, 'id' | 'email' | "name">

export interface IConversationContextProps {
  userSelectToConversation: IUserSelectType

  handleSelectUserToConversation: (user: IUserSelectType) => void
}

export const ConversationContext = createContext({} as IConversationContextProps)

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [userSelectToConversation, setUserSelectToConversation] = useState<IUserSelectType>({
    id: '', email: '', name: ''
  })

  const handleSelectUserToConversation = (user: IUserSelectType) => {
    setUserSelectToConversation(user)
  }

  return (
    <ConversationContext.Provider value={{
      userSelectToConversation,

      // Functions
      handleSelectUserToConversation
    }}>
      {children}
    </ConversationContext.Provider>
  )
}