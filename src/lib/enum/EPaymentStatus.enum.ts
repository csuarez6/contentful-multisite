export enum PaymentStatus {
  unpaid = 'unpaid',
  authorized = 'authorized',
  partially_authorized = 'partially_authorized',
  paid = 'paid',
  partially_paid = 'partially_paid',
  voided = 'voided',
  partially_voided = 'partially_voided',
  refunded = 'refunded',
  partially_refunded = 'partially_refunded',
  free = 'free'
}