export class Alert {
  id: number | null = null // Unique identifier for the alert
  type: 'system-maintenance' | 'billing-issue' | 'configuration-error' | 'security-alert' | 'default' = 'default' // Type of alert
  message: string | null = null // Message of the alert
  severity: 'info' | 'warning' | 'error' | 'success' | null = 'info' // Severity level of the alert
  status: 'sent' | 'read' | 'dismissed' | null = null // Current status of the alert
  createdAt: string | null = new Date().toISOString() // When the alert was created
  updatedAt: string | null = new Date().toISOString() // When the alert was last updated
  sentAt: string | null = new Date().toISOString() // When the alert was sent
  readAt: string | null = new Date().toISOString() // When the alert was read
  dismissedAt: string | null = new Date().toISOString() // When the alert was dismissed
  isRead: boolean | null = false // Indicates if the alert has been read
  isDismissed: boolean | null = false // Indicates if the alert has been dismissed
  isSent: boolean | null = false // Indicates if the alert has been sent
  isDismissible: boolean | null = true // Indicates if the alert can be dismissed
  hasAction: boolean | null = false // Indicates if the alert can be acted upon
  actionLinkText: string | null = null // Text of the action link
  actionLinkUrl: string | null = null // URL to be accessed when the alert is acted upon
  icon?: string | null = null // Icon to be displayed with the alert
  title?: string | null = null // Title of the alert
}
