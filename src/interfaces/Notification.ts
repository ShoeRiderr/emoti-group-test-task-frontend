export interface Notification {
  message?: Message
}

interface Message {
  title: string
  content: string
  rootClass?: string
  duration?: Number
}
