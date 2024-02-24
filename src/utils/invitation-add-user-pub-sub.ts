type message = { email: string }

type subcriber = (message: message) => void

class InvitationAddUserPubSub {
  private channel: Record<string, subcriber[]> = {}

  subscribe(user_email: string, subcriber: subcriber) {
    if (!this.channel[user_email]) {
      this.channel[user_email] = []
    }

    this.channel[user_email].push(subcriber)
  }

  public(user_email: string, message: message) {
    if (!this.channel[user_email])
      return

    for (const sub of this.channel[user_email]) {
      sub(message)
    }
  }
}

export const invitationAddUser = new InvitationAddUserPubSub()