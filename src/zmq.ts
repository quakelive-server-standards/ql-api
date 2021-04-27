import * as zeromq from 'zeromq'

export class ZeroMq {

  socketType: SocketType
  socketOptions?: SocketOptions
  address: string
  socket: any

  constructor(socketType: SocketType, address: string, socketOptions?: SocketOptions) {
    this.socketType = socketType
    this.address = address
    this.socketOptions = socketOptions
    this.socket = zeromq.createSocket(this.socketType, this.socketOptions)
    this.socket.monitor()
  }

  connect() {
    this.socket.connect('tcp://' + this.address)
  }

  onConnected(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void) {
    this.socket.on('connect', listener)
  }
  
  onConnectDelayed(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void) {
    this.socket.on('connect_delay', listener)
  }
  
  onConnectRetried(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('connect_retry', listener)
  }
  
  onListening(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('listen', listener)
  }
  
  onBindFailed(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('bind_error', listener)
  }
  
  onAccepted(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('accept', listener)
  }
  
  onAcceptFailed(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('accept_error', listener)
  }
  
  onClosed(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('close', listener)
  }
  
  onCloseFailed(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('close_error', listener)
  }
  
  onDisconnected(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('disconnect', listener)
  }
  
  onMessage(listener: (message: Buffer) => void) {
    this.socket.on('message', listener)
  }

  subscribe(filter: string = '') {
    this.socket.subscribe(filter)
  }

  send(message: string | any[] | Buffer, flags: number = 0, callback?: (...args) => void) {
    this.socket.send(message, flags, callback)
  }
}

export enum SocketType {
  dealer = 'dealer',
  subscriber = 'sub'
}

export interface SocketOptions {
  plain_username?: string
  plain_password?: string
  zap_domain?: string
  identity?: string
}