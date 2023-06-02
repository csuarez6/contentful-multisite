import { RequestStatus } from "../enum/ERequestStatus-p2p.enum";

export interface IRequest {
  status: {
    status: RequestStatus,
    reason?: string,
    message?: string,
    date: string
  },
  requestId?: string | number,
  processUrl?: string
}