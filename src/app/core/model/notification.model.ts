export interface CreateNotification{
  email: string;
  message: string;
  threshold: number;
  time: string;
  idDevice: number;
}
export interface GetNotification{
  id: number;
  email: string;
  message: string;
  threshold: number;
  time: string;
  nameDevice: string;
}

