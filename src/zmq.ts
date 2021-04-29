import * as zmq from 'zeromq'

export const zmqVersion = zmq.version

/**
 * The ØMQ lightweight messaging kernel is a library which extends the standard socket interfaces with features 
 * traditionally provided by specialised messaging middleware products. ØMQ sockets provide an abstraction of 
 * asynchronous message queues, multiple messaging patterns, message filtering (subscriptions), seamless access 
 * to multiple transport protocols and more.
 * 
 * This documentation presents an overview of ØMQ concepts, describes how ØMQ abstracts standard sockets and 
 * provides a reference manual for the functions provided by the ØMQ library.
 * 
 * http://api.zeromq.org/4-2:zmq
 */
export class Zmq {

  socketType: SocketType
  socketOptions?: SocketOptions
  protocol: string
  address: string

  /**
   * The zmq_socket() function shall create a ØMQ socket within the specified context and return an opaque 
   * handle to the newly created socket. The type argument specifies the socket type, which determines 
   * the semantics of communication over the socket.
   * 
   * The newly created socket is initially unbound, and not associated with any endpoints. In order to 
   * establish a message flow a socket must first be connected to at least one endpoint with zmq_connect(3), 
   * or at least one endpoint must be created for accepting incoming connections with zmq_bind(3).
   * 
   * Key differences to conventional sockets
   * 
   * Generally speaking, conventional sockets present a synchronous interface to either connection-oriented 
   * reliable byte streams (SOCK_STREAM), or connection-less unreliable datagrams (SOCK_DGRAM). In comparison, 
   * ØMQ sockets present an abstraction of an asynchronous message queue, with the exact queueing semantics 
   * depending on the socket type in use. Where conventional sockets transfer streams of bytes or discrete 
   * datagrams, ØMQ sockets transfer discrete messages.
   * 
   * ØMQ sockets being asynchronous means that the timings of the physical connection setup and tear down, 
   * reconnect and effective delivery are transparent to the user and organized by ØMQ itself. Further, 
   * messages may be queued in the event that a peer is unavailable to receive them.
   * 
   * Conventional sockets allow only strict one-to-one (two peers), many-to-one (many clients, one server), 
   * or in some cases one-to-many (multicast) relationships. With the exception of ZMQ_PAIR, ØMQ sockets 
   * may be connected to multiple endpoints using zmq_connect(), while simultaneously accepting incoming 
   * connections from multiple endpoints bound to the socket using zmq_bind(), thus allowing many-to-many 
   * relationships.
   * 
   * Thread safety
   * 
   * ØMQ has both thread safe socket type and not thread safe socket types. Applications MUST NOT use a 
   * not thread safe socket from multiple threads except after migrating a socket from one thread to 
   * another with a "full fence" memory barrier.
   * 
   * Following are the thread safe sockets:
   * * ZMQ_CLIENT * ZMQ_SERVER * ZMQ_DISH * ZMQ_RADIO * ZMQ_SCATTER * ZMQ_GATHER
   * 
   * http://api.zeromq.org/4-2:zmq-socket
   */
  socket: any

  constructor(socketType: SocketType, protocol: ProtocolType, address: string, socketOptions?: SocketOptions) {
    this.socketType = socketType
    this.protocol = protocol
    this.address = address
    this.socketOptions = socketOptions
    this.socket = zmq.createSocket(this.socketType, this.socketOptions)
    this.socket.monitor()
  }

  /**
   * The zmq_connect() function connects the socket to an endpoint and then accepts incoming 
   * connections on that endpoint.
   * 
   * The endpoint is a string consisting of a transport :// followed by an address. The transport 
   * specifies the underlying protocol to use. The address specifies the transport-specific address 
   * to connect to.
   * 
   * ØMQ provides the the following transports:
   * 
   * tcp: unicast transport using TCP, see zmq_tcp(7)
   * ipc: local inter-process communication transport, see zmq_ipc(7)
   * inproc: local in-process (inter-thread) communication transport, see zmq_inproc(7)
   * pgm, epgm: reliable multicast transport using PGM, see zmq_pgm(7)
   * vmci: virtual machine communications interface (VMCI), see zmq_vmci(7)
   * 
   * Every ØMQ socket type except ZMQ_PAIR supports one-to-many and many-to-one semantics. The precise 
   * semantics depend on the socket type and are defined in zmq_socket(3).
   * 
   * For most transports and socket types the connection is not performed immediately but as needed by ØMQ. 
   * Thus a successful call to zmq_connect() does not mean that the connection was or could actually be 
   * established. Because of this, for most transports and socket types the order in which a server socket 
   * is bound and a client socket is connected to it does not matter. The first exception is when using the 
   * inproc:// transport: you must call zmq_bind() before calling zmq_connect(). The second exception are 
   * ZMQ_PAIR sockets, which do not automatically reconnect to endpoints.
   * 
   * Following a zmq_connect(), for socket types except for ZMQ_ROUTER, the socket enters its normal ready 
   * state. By contrast, following a zmq_bind() alone, the socket enters a mute state in which the socket 
   * blocks or drops messages according to the socket type, as defined in zmq_socket(3). A ZMQ_ROUTER socket 
   * enters its normal ready state for a specific peer only when handshaking is complete for that peer, which 
   * may take an arbitrary time.
   * 
   * http://api.zeromq.org/4-2:zmq-connect
   */
  connect() {
    this.socket.connect(this.protocol + '://' + this.address)
  }

  /**
   * The zmq_bind() function binds the socket to a local endpoint and then accepts incoming connections 
   * on that endpoint.
   * 
   * The endpoint is a string consisting of a transport :// followed by an address. The transport specifies 
   * the underlying protocol to use. The address specifies the transport-specific address to bind to.
   * 
   * ØMQ provides the the following transports:
   * 
   * tcp: unicast transport using TCP, see zmq_tcp(7)
   * ipc: local inter-process communication transport, see zmq_ipc(7)
   * inproc: local in-process (inter-thread) communication transport, see zmq_inproc(7)
   * pgm, epgm: reliable multicast transport using PGM, see zmq_pgm(7)
   * vmci: virtual machine communications interface (VMCI), see zmq_vmci(7)
   * 
   * Every ØMQ socket type except ZMQ_PAIR supports one-to-many and many-to-one semantics. The precise 
   * semantics depend on the socket type and are defined in zmq_socket(3).
   * 
   * The ipc, tcp and vmci transports accept wildcard addresses: see zmq_ipc(7), zmq_tcp(7) and zmq_vmci(7) 
   * for details.
   * 
   * http://api.zeromq.org/4-2:zmq-bind
   */
  async bind(): Promise<string|void> {
    return new Promise((resolve, reject) => this.socket.bind(this.protocol + '://' + this.address, (error: string) => {
      if (error) {
        reject(error)
      }
      else {
        resolve()
      }
    }))
  }

  /**
   * Set socket to pause mode no data will be emit until resume() is called all send() calls will be queued.
   */
  pause() {
    this.socket.pause()
  }

  /**
   * Set a socket back to normal work mode.
   */
  resume() {
    this.socket.resume()
  }

  ref() {
    this.socket.ref()
  }

  unref() {
    this.socket.unref()
  }
  
  /**
   * ?
   */
  read() {
    this.socket.read()
  }

  /**
   * The socket has successfully connected to a remote peer. The event value is the file descriptor (FD) of 
   * the underlying network socket. Warning: there is no guarantee that the FD is still valid by the time 
   * your code receives this event.
   */
  onConnected(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void) {
    this.socket.on('connect', listener)
  }
  
  /**
   * A connect request on the socket is pending. The event value is unspecified.
   */
  onConnectDelayed(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void) {
    this.socket.on('connect_delay', listener)
  }
  
  /**
   * A connect request failed, and is now being retried. The event value is the reconnect interval in 
   * milliseconds. Note that the reconnect interval is recalculated at each retry.
   */
  onConnectRetried(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('connect_retry', listener)
  }
  
  /**
   * The socket was successfully bound to a network interface. The event value is the FD of the underlying 
   * network socket. Warning: there is no guarantee that the FD is still valid by the time your code receives 
   * this event.
   */
  onListening(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('listen', listener)
  }
  
  /**
   * The socket could not bind to a given interface. The event value is the errno generated by the system 
   * bind call.
   */
  onBindFailed(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('bind_error', listener)
  }
  
  /**
   * The socket has accepted a connection from a remote peer. The event value is the FD of the underlying 
   * network socket. Warning: there is no guarantee that the FD is still valid by the time your code receives 
   * this event.
   */
  onAccepted(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('accept', listener)
  }
  
  /**
   * The socket has rejected a connection from a remote peer. The event value is the errno generated by the 
   * accept call.
   */
  onAcceptFailed(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('accept_error', listener)
  }
  
  /**
   * The socket was closed. The event value is the FD of the (now closed) network socket.
   */
  onClosed(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('close', listener)
  }
  
  /**
   * The socket close failed. The event value is the errno returned by the system call. Note that this event 
   * occurs only on IPC transports.
   */
  onCloseFailed(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('close_error', listener)
  }
  
  /**
   * The socket was disconnected unexpectedly. The event value is the FD of the underlying network socket. 
   * Warning: this socket will be closed.
   */
  onDisconnected(listener: (eventValue: number, eventEndpointAddress: string, error?: string) => void){
    this.socket.on('disconnect', listener)
  }
  
  onMessage(listener: (message: Buffer) => void) {
    this.socket.on('message', listener)
  }

  subscribe(filter: string = '') {
    this.socket.subscribe(filter)
  }

  unsubscribe(filter: string = '') {
    this.socket.unsubscribe(filter)
  }

  /**
   * The zmq_send() function shall queue a message created from the buffer referenced by the buf and len 
   * arguments. The flags argument is a combination of the flags defined below:
   * 
   * ZMQ_DONTWAIT: For socket types (DEALER, PUSH) that block when there are no available peers (or all 
   * peers have full high-water mark), specifies that the operation should be performed in non-blocking mode. 
   * If the message cannot be queued on the socket, the zmq_send() function shall fail with errno set to EAGAIN.
   * 
   * ZMQ_SNDMORE: Specifies that the message being sent is a multi-part message, and that further message 
   * parts are to follow. Refer to the section regarding multi-part messages below for a detailed description.
   * 
   * The zmq_msg_t structure passed to zmq_msg_send() is nullified during the call. If you want to send the 
   * same message to multiple sockets you have to copy it (e.g. using zmq_msg_copy()).
   * 
   * A successful invocation of zmq_msg_send() does not indicate that the message has been transmitted to the 
   * network, only that it has been queued on the socket and ØMQ has assumed responsibility for the message. 
   * You do not need to call zmq_msg_close() after a successful zmq_msg_send().
   * 
   * Multi-part messages
   * 
   * A ØMQ message is composed of 1 or more message parts. Each message part is an independent zmq_msg_t in 
   * its own right. ØMQ ensures atomic delivery of messages: peers shall receive either all message parts of 
   * a message or none at all. The total number of message parts is unlimited except by available memory.
   * 
   * An application that sends multi-part messages must use the ZMQ_SNDMORE flag when sending each message 
   * part except the final one.
   * 
   * http://api.zeromq.org/4-2:zmq-sendmsg
   * 
   * @param message The message to send
   * @param flags 
   * @param callback 
   */
  send(message: string | any[] | Buffer, flags: number = 0, callback?: (error: Error) => void) {
    this.socket.send(message, flags, callback)
  }
}

/**
 * ØMQ provides the the following transports:
 * 
 * tcp: unicast transport using TCP, see zmq_tcp(7)
 * ipc: local inter-process communication transport, see zmq_ipc(7)
 * inproc: local in-process (inter-thread) communication transport, see zmq_inproc(7)
 * pgm, epgm: reliable multicast transport using PGM, see zmq_pgm(7)
 * vmci: virtual machine communications interface (VMCI), see zmq_vmci(7)
 */
export enum ProtocolType {
  tcp = 'tcp',
  ipc = 'ipc',
  inproc = 'inproc',
  pgm = 'pgm',
  epgm = 'epgm',
  vmci = 'vmci'
}

/**
 * Radio-dish pattern (ZMQ_RADIO, ZMQ_DISH)
 * 
 * The radio-dish pattern is used for one-to-many distribution of data from a single publisher to multiple 
 * subscribers in a fan out fashion.
 * 
 * Radio-dish is using groups (vs Pub-sub topics), Dish sockets can join a group and each message sent by 
 * Radio sockets belong to a group.
 * 
 * Groups are null terminated strings limited to 16 chars length (including null). The intention is to 
 * increase the length to 40 chars (including null).
 * 
 * Groups are matched using exact matching (vs prefix matching of PubSub).
 * 
 * 
 * Publish-subscribe pattern (ZMQ_PUB, ZMQ_SUB, ZMQ_XPUB, ZMQ_XSUB)
 * 
 * The publish-subscribe pattern is used for one-to-many distribution of data from a single publisher to 
 * multiple subscribers in a fan out fashion.
 * 
 * The publish-subscribe pattern is formally defined by http://rfc.zeromq.org/spec:29.
 * 
 * 
 * Pipeline pattern (ZMQ_PUSH, ZMQ_PULL)
 * 
 * The pipeline pattern is used for distributing data to nodes arranged in a pipeline. Data always flows 
 * down the pipeline, and each stage of the pipeline is connected to at least one node. When a pipeline 
 * stage is connected to multiple nodes data is round-robined among all connected nodes.
 * 
 * The pipeline pattern is formally defined by http://rfc.zeromq.org/spec:30.
 * 
 * 
 * Exclusive pair pattern (ZMQ_PAIR)
 * 
 * The exclusive pair pattern is used to connect a peer to precisely one other peer. This pattern is used 
 * for inter-thread communication across the inproc transport.
 * 
 * The exclusive pair pattern is formally defined by http://rfc.zeromq.org/spec:31.
 * 
 * 
 * Native pattern (ZMQ_STREAM)
 * 
 * The native pattern is used for communicating with TCP peers and allows asynchronous requests and 
 * replies in either direction.
 * 
 * 
 * Request-reply pattern (ZMQ_REQ, ZMQ_REP, ZMQ_DEALER, ZMQ_ROUTER, )
 * 
 * The request-reply pattern is used for sending requests from a ZMQ_REQ client to one or more ZMQ_REP 
 * services, and receiving subsequent replies to each request sent.
 * 
 * The request-reply pattern is formally defined by http://rfc.zeromq.org/spec:28.
 * 
 * Note: this pattern will be deprecated in favor of the client-server pattern.
 * 
 * http://api.zeromq.org/4-2:zmq-socket
 */
export enum SocketType {
  /**
   * A socket of type ZMQ_PUB is used by a publisher to distribute data. Messages sent are distributed in a 
   * fan out fashion to all connected peers. The zmq_recv(3) function is not implemented for this socket type.
   * 
   * When a ZMQ_PUB socket enters the mute state due to having reached the high water mark for a subscriber, 
   * then any messages that would be sent to the subscriber in question shall instead be dropped until the mute 
   * state ends. The zmq_send() function shall never block for this socket type.
   * 
   * Compatible peer sockets: ZMQ_SUB, ZMQ_XSUB
   * Direction: Unidirectional
   * Send/receive pattern: Send only
   * Incoming routing strategy: N/A
   * Outgoing routing strategy: Fan out
   * Action in mute state: Drop
   */
  publisher = 'pub',

  /**
   * Same as ZMQ_PUB except that you can receive subscriptions from the peers in form of incoming messages. 
   * Subscription message is a byte 1 (for subscriptions) or byte 0 (for unsubscriptions) followed by the 
   * subscription body. Messages without a sub/unsub prefix are also received, but have no effect on subscription
   * status.
   * 
   * Compatible peer sockets: ZMQ_SUB, ZMQ_XSUB
   * Direction: Unidirectional
   * Send/receive pattern: Send messages, receive subscriptions
   * Incoming routing strategy: N/A
   * Outgoing routing strategy: Fan out
   * Action in mute state: Drop
   */
  xpublisher = 'xpub',

  /**
   * A socket of type ZMQ_SUB is used by a subscriber to subscribe to data distributed by a publisher. Initially 
   * a ZMQ_SUB socket is not subscribed to any messages, use the ZMQ_SUBSCRIBE option of zmq_setsockopt(3) to 
   * specify which messages to subscribe to. The zmq_send() function is not implemented for this socket type.
   * 
   * Compatible peer sockets: ZMQ_PUB, ZMQ_XPUB
   * Direction: Unidirectional
   * Send/receive pattern: Receive only
   * Incoming routing strategy: Fair-queued
   * Outgoing routing strategy: N/A
   */
  subscriber = 'sub',

  /**
   * Same as ZMQ_PUB except that you can receive subscriptions from the peers in form of incoming messages. 
   * Subscription message is a byte 1 (for subscriptions) or byte 0 (for unsubscriptions) followed by the 
   * subscription body. Messages without a sub/unsub prefix are also received, but have no effect on subscription 
   * status.
   * 
   * Compatible peer sockets: ZMQ_SUB, ZMQ_XSUB
   * Direction: Unidirectional
   * Send/receive pattern: Send messages, receive subscriptions
   * Incoming routing strategy: N/A
   * Outgoing routing strategy: Fan out
   * Action in mute state: Drop
   */
  xsubscriber = 'xsub',

  /**
   * A socket of type ZMQ_REQ is used by a client to send requests to and receive replies from a service. This 
   * socket type allows only an alternating sequence of zmq_send(request) and subsequent zmq_recv(reply) calls. 
   * Each request sent is round-robined among all services, and each reply received is matched with the last 
   * issued request.
   * 
   * If no services are available, then any send operation on the socket shall block until at least one service 
   * becomes available. The REQ socket shall not discard messages.
   * 
   * Compatible peer sockets: ZMQ_REP, ZMQ_ROUTER
   * Direction: Bidirectional
   * Send/receive pattern: Send, Receive, Send, Receive, ...
   * Outgoing routing strategy: Round-robin
   * Incoming routing strategy: Last peer
   * Action in mute state: Block
   */
  request = 'req',

  /**
   * ?
   */
  xrequest = 'xreq',

  /**
   * A socket of type ZMQ_REP is used by a service to receive requests from and send replies to a client. 
   * This socket type allows only an alternating sequence of zmq_recv(request) and subsequent zmq_send(reply) 
   * calls. Each request received is fair-queued from among all clients, and each reply sent is routed to 
   * the client that issued the last request. If the original requester does not exist any more the reply is 
   * silently discarded.
   * 
   * Compatible peer sockets: ZMQ_REQ, ZMQ_DEALER
   * Direction: Bidirectional
   * Send/receive pattern: Receive, Send, Receive, Send, ...
   * Incoming routing strategy: Fair-queued
   * Outgoing routing strategy: Last peer
   */
  reply = 'rep',

  /**
   * ?
   */
  xreply = 'xrep',

  /**
   * A socket of type ZMQ_PUSH is used by a pipeline node to send messages to downstream pipeline nodes. 
   * Messages are round-robined to all connected downstream nodes. The zmq_recv() function is not implemented 
   * for this socket type.
   * 
   * When a ZMQ_PUSH socket enters the mute state due to having reached the high water mark for all downstream 
   * nodes, or if there are no downstream nodes at all, then any zmq_send(3) operations on the socket shall 
   * block until the mute state ends or at least one downstream node becomes available for sending; messages 
   * are not discarded.
   * 
   * Compatible peer sockets: ZMQ_PULL
   * Direction	Unidirectional
   * Send/receive pattern	Send: only
   * Incoming routing strategy: N/A
   * Outgoing routing strategy: Round-robin
   * Action in mute state: Block
   */
  push = 'push',

  /**
   * A socket of type ZMQ_PULL is used by a pipeline node to receive messages from upstream pipeline nodes. 
   * Messages are fair-queued from among all connected upstream nodes. The zmq_send() function is not 
   * implemented for this socket type.
   * 
   * Compatible peer sockets: ZMQ_PUSH
   * Direction: Unidirectional
   * Send/receive pattern: Receive only
   * Incoming routing strategy: Fair-queued
   * Outgoing routing strategy: N/A
   * Action in mute state: Block
   */
  pull = 'pull',

  /**
   * A socket of type ZMQ_DEALER is an advanced pattern used for extending request/reply sockets. Each message 
   * sent is round-robined among all connected peers, and each message received is fair-queued from all connected 
   * peers.
   * 
   * When a ZMQ_DEALER socket enters the mute state due to having reached the high water mark for all peers, or 
   * if there are no peers at all, then any zmq_send(3) operations on the socket shall block until the mute state 
   * ends or at least one peer becomes available for sending; messages are not discarded.
   * 
   * When a ZMQ_DEALER socket is connected to a ZMQ_REP socket each message sent must consist of an empty message 
   * part, the delimiter, followed by one or more body parts.
   * 
   * Compatible peer sockets: ZMQ_ROUTER, ZMQ_REP, ZMQ_DEALER
   * Direction: Bidirectional
   * Send/receive pattern: Unrestricted
   * Outgoing routing strategy: Round-robin
   * Incoming routing strategy: Fair-queued
   * Action in mute state: Block
   */
  dealer = 'dealer',

  /**
   * A socket of type ZMQ_ROUTER is an advanced socket type used for extending request/reply sockets. When receiving 
   * messages a ZMQ_ROUTER socket shall prepend a message part containing the identity of the originating peer to the 
   * message before passing it to the application. Messages received are fair-queued from among all connected peers. 
   * When sending messages a ZMQ_ROUTER socket shall remove the first part of the message and use it to determine the 
   * identity of the peer the message shall be routed to. If the peer does not exist anymore the message shall be 
   * silently discarded by default, unless ZMQ_ROUTER_MANDATORY socket option is set to 1.
   * 
   * When a ZMQ_ROUTER socket enters the mute state due to having reached the high water mark for all peers, then 
   * any messages sent to the socket shall be dropped until the mute state ends. Likewise, any messages routed to a 
   * peer for which the individual high water mark has been reached shall also be dropped, unless ZMQ_ROUTER_MANDATORY 
   * socket option is set.
   * 
   * When a ZMQ_REQ socket is connected to a ZMQ_ROUTER socket, in addition to the identity of the originating peer 
   * each message received shall contain an empty delimiter message part. Hence, the entire structure of each received 
   * message as seen by the application becomes: one or more identity parts, delimiter part, one or more body parts. 
   * When sending replies to a ZMQ_REQ socket the application must include the delimiter part.
   * 
   * Compatible peer sockets: ZMQ_DEALER, ZMQ_REQ, ZMQ_ROUTER
   * Direction: Bidirectional
   * Send/receive pattern: Unrestricted
   * Outgoing routing strategy: See text
   * Incoming routing strategy: Fair-queued
   * Action in mute state: Drop (see text)
   */
  router = 'router',

  /**
   * A socket of type ZMQ_PAIR can only be connected to a single peer at any one time. No message routing or filtering 
   * is performed on messages sent over a ZMQ_PAIR socket.
   * 
   * When a ZMQ_PAIR socket enters the mute state due to having reached the high water mark for the connected peer, 
   * or if no peer is connected, then any zmq_send(3) operations on the socket shall block until the peer becomes 
   * available for sending; messages are not discarded.
   * 
   * ZMQ_PAIR sockets are designed for inter-thread communication across the zmq_inproc(7) transport and do not 
   * implement functionality such as auto-reconnection.
   * 
   * Compatible peer sockets	ZMQ_PAIR
   * Direction: Bidirectional
   * Send/receive pattern: Unrestricted
   * Incoming routing strategy: N/A
   * Outgoing routing strategy: N/A
   * Action in mute state: Block
   */
  pair = 'pair',

  /**
   * A socket of type ZMQ_STREAM is used to send and receive TCP data from a non-ØMQ peer, when using the 
   * tcp:// transport. A ZMQ_STREAM socket can act as client and/or server, sending and/or receiving TCP data 
   * asynchronously.
   * 
   * When receiving TCP data, a ZMQ_STREAM socket shall prepend a message part containing the identity of the 
   * originating peer to the message before passing it to the application. Messages received are fair-queued 
   * from among all connected peers.
   * 
   * When sending TCP data, a ZMQ_STREAM socket shall remove the first part of the message and use it to 
   * determine the identity of the peer the message shall be routed to, and unroutable messages shall cause 
   * an EHOSTUNREACH or EAGAIN error.
   * 
   * To open a connection to a server, use the zmq_connect call, and then fetch the socket identity using 
   * the ZMQ_IDENTITY zmq_getsockopt call.
   * 
   * To close a specific connection, send the identity frame followed by a zero-length message 
   * (see EXAMPLE section).
   * 
   * When a connection is made, a zero-length message will be received by the application. Similarly, when 
   * the peer disconnects (or the connection is lost), a zero-length message will be received by the application.
   * 
   * You must send one identity frame followed by one data frame. The ZMQ_SNDMORE flag is required for identity 
   * frames but is ignored on data frames.
   * 
   * Compatible peer sockets	none.
   * Direction: Bidirectional
   * Send/receive pattern: Unrestricted
   * Outgoing routing strategy: See text
   * Incoming routing strategy: Fair-queued
   * Action in mute state: EAGAIN
   */
  stream = 'stream'
}

/**
 * Caution: All options, with the exception of 
 * ZMQ_SUBSCRIBE, ZMQ_UNSUBSCRIBE, ZMQ_LINGER, ZMQ_ROUTER_HANDOVER, ZMQ_ROUTER_MANDATORY, ZMQ_PROBE_ROUTER,
 * ZMQ_XPUB_VERBOSE, ZMQ_XPUB_VERBOSER, ZMQ_REQ_CORRELATE, ZMQ_REQ_RELAXED, ZMQ_SNDHWM and ZMQ_RCVHWM,
 * only take effect for subsequent socket bind/connects.
 *
 * Specifically, security options take effect for subsequent bind/connect calls, and can be changed at any
 * time to affect subsequent binds and/or connects.
 * 
 * http://api.zeromq.org/4-2:zmq-setsockopt
 */
export interface SocketOptions {
  /**
   * ZMQ_AFFINITY: Set I/O thread affinity
   * 
   * The ZMQ_AFFINITY option shall set the I/O thread affinity for newly created connections on the specified socket.
   * 
   * Affinity determines which threads from the ØMQ I/O thread pool associated with the socket's context shall handle
   * newly created connections. A value of zero specifies no affinity, meaning that work shall be distributed fairly
   * among all ØMQ I/O threads in the thread pool. For non-zero values, the lowest bit corresponds to thread 1, second
   * lowest bit to thread 2 and so on. For example, a value of 3 specifies that subsequent connections on socket shall
   * be handled exclusively by I/O threads 1 and 2.
   * 
   * Default value: 0
   */
  affinity?: number

  /**
   * ZMQ_BACKLOG: Set maximum length of the queue of outstanding connections
   * 
   * The ZMQ_BACKLOG option shall set the maximum length of the queue of outstanding peer connections for the specified
   * socket; this only applies to connection-oriented transports. For details refer to your operating system documentation
   * for the listen function.
   * 
   * Default value: 100
   * Applicable socket types: all, only for connection-oriented transports.
   */
  backlog?: number

  /**
   * ZMQ_HWM: Set high water mark
   * 
   * The ZMQ_HWM option shall set the high water mark for the specified socket. The high water mark is a hard limit 
   * on the maximum number of outstanding messages ØMQ shall queue in memory for any single peer that the specified 
   * socket is communicating with.
   * 
   * If this limit has been reached the socket shall enter an exceptional state and depending on the socket type, 
   * ØMQ shall take appropriate action such as blocking or dropping sent messages. Refer to the individual socket 
   * descriptions in zmq_socket(3) for details on the exact action taken for each socket type.
   * 
   * The default ZMQ_HWM value of zero means "no limit".
   * 
   * Option value unit: messages
   * Default value: 0
   * Applicable socket types: all
   */
  hwm?: number
  
  /**
   * ZMQ_ROUTING_ID: Set socket routing id
   * 
   * The ZMQ_ROUTING_ID option shall set the routing id of the specified socket when connecting to a ROUTER socket. A
   * routing id must be at least one byte and at most 255 bytes long. Identities starting with a zero byte are reserved
   * for use by the ØMQ infrastructure.
   * 
   * If two clients use the same routing id when connecting to a ROUTER, the results shall depend on the 
   * ZMQ_ROUTER_HANDOVER option setting. If that is not set (or set to the default of zero), the ROUTER socket shall 
   * reject clients trying to connect with an already-used routing id. If that option is set to 1, the ROUTER socket 
   * shall hand-over the connection to the new client and disconnect the existing one.
   * 
   * Default value: NULL
   * Applicable socket types: ZMQ_REQ, ZMQ_REP, ZMQ_ROUTER, ZMQ_DEALER.
   */
  identity?: string
  
  /**
   * ZMQ_LINGER: Set linger period for socket shutdown
   * 
   * The ZMQ_LINGER option shall set the linger period for the specified socket. The linger period determines how long
   * pending messages which have yet to be sent to a peer shall linger in memory after a socket is disconnected with 
   * zmq_disconnect(3) or closed with zmq_close(3), and further affects the termination of the socket's context with 
   * zmq_ctx_term(3). The following outlines the different behaviours:
   * 
   * - A value of -1 specifies an infinite linger period. Pending messages shall not be discarded after a call to 
   * zmq_disconnect() or zmq_close(); attempting to terminate the socket's context with zmq_ctx_term() shall block 
   * until all pending messages have been sent to a peer.
   * - The value of 0 specifies no linger period. Pending messages shall be discarded immediately after a call to 
   * zmq_disconnect() or zmq_close().
   * - Positive values specify an upper bound for the linger period in milliseconds. Pending messages shall not be 
   * discarded after a call to zmq_disconnect() or zmq_close(); attempting to terminate the socket's context with 
   * zmq_ctx_term() shall block until either all pending messages have been sent to a peer, or the linger period 
   * expires, after which any pending messages shall be discarded.
   * 
   * Default value: -1 (infinite)
   * Applicable socket types: all
   */
  linger?: number

  /**
   * ZMQ_MULTICAST_LOOP: Control multicast local loopback
   * 
   * For multicast UDP sender sockets this option sets whether the data sent should be looped back on local 
   * listening sockets.
   * 
   * Option value unit: 0, 1
   * Default value: 1
   * Applicable socket types: ZMQ_RADIO, when using UDP multicast transport
   */
  mcast_loop?: number

  /**
   * ZMQ_RATE: Set multicast data rate
   * 
   * The ZMQ_RATE option shall set the maximum send or receive data rate for multicast transports such as 
   * zmq_pgm(7) using the specified socket.
   * 
   * Option value unit: kilobits per second
   * Default value: 100
   * Applicable socket types: all, when using multicast transports
   */
  rate?: number

  /**
   * ZMQ_RCVBUF: Set kernel receive buffer size
   * 
   * The ZMQ_RCVBUF option shall set the underlying kernel receive buffer size for the socket to the specified size 
   * in bytes. A value of -1 means leave the OS default unchanged. For details refer to your operating system 
   * documentation for the SO_RCVBUF socket option.
   * 
   * Option value unit: bytes
   * Default value: -1
   * Applicable socket types: all
   */
  rcvbuf?: number

  /**
   * ZMQ_LAST_ENDPOINT: Retrieve the last endpoint set
   * 
   * The ZMQ_LAST_ENDPOINT option shall retrieve the last endpoint bound for TCP and IPC transports. The returned 
   * value will be a string in the form of a ZMQ DSN. Note that if the TCP host is INADDR_ANY, indicated by a *, 
   * then the returned address will be 0.0.0.0 (for IPv4).
   * 
   * Option value type: NULL-terminated character string
   * Default value: NULL
   * Applicable socket types: all, when binding TCP or IPC transports
   */
  last_endpoint?: string

  /**
   * ZMQ_RECONNECT_IVL: Set reconnection interval
   * 
   * The ZMQ_RECONNECT_IVL option shall set the initial reconnection interval for the specified socket. The 
   * reconnection interval is the period ØMQ shall wait between attempts to reconnect disconnected peers when 
   * using connection-oriented transports. The value -1 means no reconnection.
   * 
   * The reconnection interval may be randomized by ØMQ to prevent reconnection storms in topologies with a 
   * large number of peers per socket.
   * 
   * Option value unit: milliseconds
   * Default value: 100
   * Applicable socket types: all, only for connection-oriented transports
   */
  reconnect_ivl?: number

  /**
   * ZMQ_RECOVERY_IVL: Set multicast recovery interval
   * 
   * The ZMQ_RECOVERY_IVL option shall set the recovery interval for multicast transports using the specified 
   * socket. The recovery interval determines the maximum time in milliseconds that a receiver can be absent 
   * from a multicast group before unrecoverable data loss will occur.
   * 
   * Exercise care when setting large recovery intervals as the data needed for recovery will be held in memory. 
   * For example, a 1 minute recovery interval at a data rate of 1Gbps requires a 7GB in-memory buffer.
   * 
   * Option value unit: milliseconds
   * Default value: 10000
   * Applicable socket types: all, when using multicast transports
   */
  recovery_ivl?: number

  /**
   * ZMQ_SNDBUF: Set kernel transmit buffer size
   * 
   * The ZMQ_SNDBUF option shall set the underlying kernel transmit buffer size for the socket to the specified 
   * size in bytes. A value of -1 means leave the OS default unchanged. For details please refer to your operating 
   * system documentation for the SO_SNDBUF socket option.
   * 
   * Option value unit: bytes
   * Default value: -1
   * Applicable socket types: all
   */
  sndbuf?: number

  /**
   * ZMQ_SWAP: Set disk offload size
   * 
   * The ZMQ_SWAP option shall set the disk offload (swap) size for the specified socket. A socket which has 
   * ZMQ_SWAP set to a non-zero value may exceed its high water mark; in this case outstanding messages shall 
   * be offloaded to storage on disk rather than held in memory.
   * 
   * The value of ZMQ_SWAP defines the maximum size of the swap space in bytes.
   */
  swap?: number

  /**
   * ZMQ_MECHANISM: Retrieve current security mechanism
   * 
   * The ZMQ_MECHANISM option shall retrieve the current security mechanism for the socket.
   * 
   * Option value unit: ZMQ_NULL, ZMQ_PLAIN, or ZMQ_CURVE
   * Default value: ZMQ_NULL
   * Applicable socket types: all, when using TCP or IPC transports
   */
  mechanism?: number

  /**
   * ZMQ_PLAIN_SERVER: Set PLAIN server role
   * 
   * Defines whether the socket will act as server for PLAIN security, see zmq_plain(7). A value of 1 means the 
   * socket will act as PLAIN server. A value of 0 means the socket will not act as PLAIN server, and its security 
   * role then depends on other option settings. Setting this to 0 shall reset the socket security to NULL.
   * 
   * Option value unit: 0, 1
   * Default value: 0
   * Applicable socket types: all, when using TCP transport
   */
  plain_server?: number

  /**
   * ZMQ_PLAIN_USERNAME: Set PLAIN security username
   * 
   * Sets the username for outgoing connections over TCP or IPC. If you set this to a non-null value, the 
   * security mechanism used for connections shall be PLAIN, see zmq_plain(7). If you set this to a null value, 
   * the security mechanism used for connections shall be NULL, see zmq_null(3).
   * 
   * Default value: not set
   * Applicable socket types: all, when using TCP transport
   */
  plain_username?: string

  /**
   * ZMQ_PLAIN_PASSWORD: Set PLAIN security password 
   * 
   * Sets the password for outgoing connections over TCP or IPC. If you set this to a non-null value, the security 
   * mechanism used for connections shall be PLAIN, see zmq_plain(7). If you set this to a null value, the security 
   * mechanism used for connections shall be NULL, see zmq_null(3).
   * 
   * Default value: not set
   * Applicable socket types: all, when using TCP transport
   */
  plain_password?: string

  /**
   * ZMQ_CURVE_SERVER: Set CURVE server role
   * 
   * Defines whether the socket will act as server for CURVE security, see zmq_curve(7). A value of 1 means the 
   * socket will act as CURVE server. A value of 0 means the socket will not act as CURVE server, and its security 
   * role then depends on other option settings. Setting this to 0 shall reset the socket security to NULL. When 
   * you set this you must also set the server's secret key using the ZMQ_CURVE_SECRETKEY option. A server socket 
   * does not need to know its own public key.
   * 
   * Option value unit: 0, 1
   * Default value: 0
   * Applicable socket types: all, when using TCP transport
   */
  curve_server?: number

  /**
   * ZMQ_CURVE_PUBLICKEY: Set CURVE public key
   * 
   * Sets the socket's long term public key. You must set this on CURVE client sockets, see zmq_curve(7). You can 
   * provide the key as 32 binary bytes, or as a 40-character string encoded in the Z85 encoding format and 
   * terminated in a null byte. The public key must always be used with the matching secret key. To generate a 
   * public/secret key pair, use zmq_curve_keypair(3). To derive the public key from a secret key, 
   * use zmq_curve_public(3).
   * 
   * An option value size of 40 is supported for backwards compatibility, though is deprecated.
   * 
   * Option value size: 32 or 41
   * Default value: NULL
   * Applicable socket types: all, when using TCP transport
   */
  curve_publickey?: string

  /**
   * ZMQ_CURVE_SECRETKEY: Set CURVE secret key
   * 
   * Sets the socket's long term secret key. You must set this on both CURVE client and server sockets, see 
   * zmq_curve(7). You can provide the key as 32 binary bytes, or as a 40-character string encoded in the 
   * Z85 encoding format and terminated in a null byte. To generate a public/secret key pair, use 
   * zmq_curve_keypair(3). To derive the public key from a secret key, use zmq_curve_public(3).
   * 
   * An option value size of 40 is supported for backwards compatibility, though is deprecated.
   * 
   * Option value size: 32 or 41
   * Default value: NULL
   * Applicable socket types: all, when using TCP transport
   */
  curve_secretkey?: string

  /**
   * ZMQ_CURVE_SERVERKEY: Set CURVE server key
   * 
   * Sets the socket's long term server key. You must set this on CURVE client sockets, see zmq_curve(7). 
   * You can provide the key as 32 binary bytes, or as a 40-character string encoded in the Z85 encoding 
   * format and terminated in a null byte. This key must have been generated together with the server's 
   * secret key. To generate a public/secret key pair, use zmq_curve_keypair(3).
   * 
   * An option value size of 40 is supported for backwards compatibility, though is deprecated.
   * 
   * Option value size: 32 or 41
   * Default value: NULL
   * Applicable socket types: all, when using TCP transport
   */
  curve_serverkey?: string

  /**
   * ZMQ_ZAP_DOMAIN: Set RFC 27 authentication domain
   * 
   * Sets the domain for ZAP (ZMQ RFC 27) authentication. A ZAP domain must be specified to enable authentication. 
   * When the ZAP domain is empty, which is the default, ZAP authentication is disabled. This is not compatible 
   * with previous versions of libzmq, so it can be controlled by ZMQ_ZAP_ENFORCE_DOMAIN which for now is disabled 
   * by default. See http://rfc.zeromq.org/spec:27 for more details.
   * 
   * Default value: empty
   * Applicable socket types: all, when using TCP transport
   */
  zap_domain?: string

  /**
   * ZMQ_HEARTBEAT_IVL: Set interval between sending ZMTP heartbeats
   * 
   * The ZMQ_HEARTBEAT_IVL option shall set the interval between sending ZMTP heartbeats for the specified socket. 
   * If this option is set and is greater than 0, then a PING ZMTP command will be sent every 
   * ZMQ_HEARTBEAT_IVL milliseconds.
   * 
   * Option value unit: milliseconds
   * Default value: 0
   * Applicable socket types: all, when using connection-oriented transports
   */
  heartbeat_ivl?: number

  /**
   * ZMQ_HEARTBEAT_TTL: Set the TTL value for ZMTP heartbeats
   * 
   * The ZMQ_HEARTBEAT_TTL option shall set the timeout on the remote peer for ZMTP heartbeats. If this option 
   * is greater than 0, the remote side shall time out the connection if it does not receive any more traffic 
   * within the TTL period. This option does not have any effect if ZMQ_HEARTBEAT_IVL is not set or is 0. 
   * Internally, this value is rounded down to the nearest decisecond, any value less than 100 will have no effect.
   * 
   * Option value unit: milliseconds
   * Default value: 0
   * Maximum value: 6553599 (which is 2^16-1 deciseconds)
   * Applicable socket types: all, when using connection-oriented transports
   */
  heartbeat_ttl?: number

  /**
   * ZMQ_HEARTBEAT_TIMEOUT: Set timeout for ZMTP heartbeats
   * 
   * The ZMQ_HEARTBEAT_TIMEOUT option shall set how long to wait before timing-out a connection after sending 
   * a PING ZMTP command and not receiving any traffic. This option is only valid if ZMQ_HEARTBEAT_IVL is also 
   * set, and is greater than 0. The connection will time out if there is no traffic received after sending the 
   * PING command, but the received traffic does not have to be a PONG command - any received traffic will cancel 
   * the timeout.
   * 
   * Option value unit: milliseconds
   * Default value: 0 normally, ZMQ_HEARTBEAT_IVL if it is set
   * Applicable socket types: all, when using connection-oriented transports
   */
  heartbeat_timeout?: number

  /**
   * ZMQ_CONNECT_TIMEOUT: Set connect() timeout
   * 
   * Sets how long to wait before timing-out a connect() system call. The connect() system call normally takes 
   * a long time before it returns a time out error. Setting this option allows the library to time out the call 
   * at an earlier interval.
   * 
   * Option value unit: milliseconds
   * Default value: 0 (disabled)
   * Applicable socket types: all, when using TCP transports.
   */
  connect_timeout?: number
}