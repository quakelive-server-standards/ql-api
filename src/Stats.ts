import { SocketType, ZeroMq } from './zmq'

export default class Stats extends ZeroMq {

  constructor(address: string, identity: string, password?: string) {
    super(SocketType.subscriber, address, {
      identity: identity,
      plain_username: password ? 'stats' : undefined,
      plain_password: password ? password : undefined,
      zap_domain: password ? 'stats' : undefined
    })

    this.onConnected((eventValue, address, error) => {
      if (! error) {
        this.subscribe()
        console.log('Connected to ' + this.address)
      }
      else {
        console.log('There was an error connecting to ' + address + ' -> ' + error)
      }
    })

    this.onConnectDelayed(() => console.log('Retried connecting to ' + this.address))
    this.onConnectRetried(() => console.log('Delayed connecting to ' + this.address))

    this.onMessage(message => console.log(message.toString()))
  }
}
