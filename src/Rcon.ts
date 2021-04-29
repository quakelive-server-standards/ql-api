import { ProtocolType, SocketType, ZeroMq } from 'zeromq-ts'

export default class Rcon extends ZeroMq {

  constructor(address: string, identity: string, password?: string) {
    super(SocketType.dealer, ProtocolType.tcp, address, {
      identity: identity,
      plain_username: password ? 'rcon' : undefined,
      plain_password: password ? password : undefined,
      zap_domain: password ? 'rcon' : undefined
    })
  }
}
