import { SocketType, ZeroMq } from './zmq'

export default class Rcon extends ZeroMq {

  constructor(address: string, identity: string, password?: string) {
    super(SocketType.dealer, address, {
      identity: identity,
      plain_username: password ? 'rcon' : undefined,
      plain_password: password ? password : undefined,
      zap_domain: password ? 'rcon' : undefined
    })

    this.onConnected((eventValue, address, error) => {
      if (! error) {
        console.log('Connected to ' + this.address)
        this.send('say HI', 0, (a, b, c) => console.log('callback', a, b, c))
      }
      else {
        console.log('There was an error connecting to ' + address + ' -> ' + error)
      }
    })

    this.onConnectDelayed(() => console.log('Retried connecting to ' + this.address))
    this.onConnectRetried(() => console.log('Delayed connecting to ' + this.address))

    this.onMessage(message => {
      if (message.length > 0) {
        console.log(message.toString())
      } 
    })
  }
}
