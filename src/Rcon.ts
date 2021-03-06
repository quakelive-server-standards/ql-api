import { ProtocolType, SocketOptions, SocketType, ZeroMq } from 'zeromq-ts'

export default class Rcon extends ZeroMq {

  constructor(address: string, identity: string, password?: string, options?: SocketOptions) {
    super(SocketType.dealer, ProtocolType.tcp, address, {
      ...options,
      identity: identity,
      plain_username: password ? 'rcon' : undefined,
      plain_password: password ? password : undefined,
      zap_domain: password ? 'rcon' : undefined
    })
  }

  say(message: string) {
    this.send('say ' + message)
  }

  async getCvar(cvar: string): Promise<any> {
    this.send(cvar)
  }

  setCvar(cvar: string, value: any) {
    this.send(cvar + ' ' + value)
  }
}
