type message = {
  email: string
  created: string
  message: string
}

type subcriber = (message: message) => void

class ConversationPubSub {
  private channel: Record<string, subcriber[]> = {}

  subscribe(secretKey: string, subcriber: subcriber) {
    if (!this.channel[secretKey]) {
      this.channel[secretKey] = []
    }

    this.channel[secretKey].push(subcriber)
  }

  public(secretKey: string, message: message) {
    if (!this.channel[secretKey])
      return

    for (const sub of this.channel[secretKey]) {
      sub(message)
    }
  }
}

export const conversation = new ConversationPubSub()