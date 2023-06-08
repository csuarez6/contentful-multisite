export interface INotification {
  requestId: string,
  reference: string,
  signature: string,
  status: {
    status: string,
    date: string,
    message: string,
    reason: string,
  },
}