
export interface IPacket {
  topic: string
  payload: Uint8Array
  qos: number
  retain: boolean
  dup: boolean
}
