import {DeviceSensor} from './device.enum';

export interface CreateDevice{
  name: string;
  typeDevice: DeviceSensor;
  topic: string;
}

export interface GetDevice{
  id: number;
  name: string;
  typeDevice: string;
  topic: string;
}
