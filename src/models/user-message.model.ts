export class User {
  id: number | null = null // Unique identifier for the user
  username: string | null = null // Name of the user
  email: string | null = null // Email address of the user
  contact: string | null = null // Contact number of the user
  isActive = false // Indicates if the user is active
}

export class UserMessage {
  id: number | null = null // Unique identifier for the user message
  userId: number | null = null // User identifier for the user message
  message: string | null = null // Message of the user message
  sentBy: User | null = null // User who sent the message
  sentTo: User | null = null // User who received the message
  createdAt: string | null = new Date().toISOString() // When the user message was created
  updatedAt: string | null = new Date().toISOString() // When the user message was last updated
}
