import { ProtocolType, SocketType, ZeroMq } from 'zeromq-ts'

export default class Rcon extends ZeroMq {

  constructor(address: string, identity: string, password?: string) {
    super(SocketType.dealer, ProtocolType.tcp, address, {
      identity: identity,
      plain_username: password ? 'rcon' : undefined,
      plain_password: password ? password : undefined,
      zap_domain: password ? 'rcon' : undefined
    })

    this.onConnected((eventValue, address, error) => {
      if (! error) {
        console.log('Rcon connected to ' + this.address)
      }
      else {
        console.log('There was an error connecting to rcon API ' + address + ' -> ' + error)
      }
    })

    this.onConnectDelayed(() => console.log('Rcon: Retried connecting to ' + this.address))
    this.onConnectRetried(() => console.log('Rcon: Delayed connecting to ' + this.address))
  }
}
