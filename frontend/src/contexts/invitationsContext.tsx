import { BellRing } from "lucide-react";
import React, { ReactNode, createContext, useState } from "react";
import { toast } from "sonner";

export interface IInvite {
  id?: string
  invitations: Array<string>
  accountId: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const default_inital_state_invitations: IInvite = {
  id: '',
  accountId: '',
  invitations: []
}

export interface IInvitationsContext {
  invites: IInvite
  setStateInvitations: (data: IInvite) => void
  pushNewInvite: (email: string) => void
  notification: boolean
  setNotificationOff: () => void
  setNotificationOn: () => void
}

export const InvitesContext = createContext({} as IInvitationsContext)

export const InvitationsProvider = ({ children }: { children: ReactNode }) => {
  const [invites, setInvites] = useState<IInvite>(default_inital_state_invitations)
  const [notification, setNotification] = useState(false)

  const setStateInvitations = (data: IInvite) => {
    setInvites(data)
  }

  const addNewInvite = (email: string) => {
    setInvites(prevState => ({
      ...prevState,
      invitations: [email, ...invites.invitations]
    }))
    setNotification(true)
    toast(
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <BellRing />
        <strong>{email} lhe enviou um convite</strong>
      </div>
    )
  }

  const setNotificationOff = () => {
    setNotification(false)
  }

  const setNotificationOn = () => {
    setNotification(true)
  }

  return (
    <InvitesContext.Provider
      value={{
        invites: invites,
        notification,

        // Fuctions
        setStateInvitations,
        pushNewInvite: addNewInvite,
        setNotificationOff,
        setNotificationOn
      }}
    >
      {children}
    </InvitesContext.Provider>
  )
}