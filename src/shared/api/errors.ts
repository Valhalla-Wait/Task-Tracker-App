import { TNetworkError } from './types';

export class NetworkError {
  readonly status: number;

  readonly message: string;

  constructor({ message, status }: TNetworkError) {
    this.status = status;
    this.message = message;
  }
}
