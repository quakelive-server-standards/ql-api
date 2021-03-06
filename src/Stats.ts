import { EventEmitter } from 'events'
import { MatchReportEvent, MatchStartedEvent, PlayerConnectEvent, PlayerDeathEvent, PlayerDisconnectEvent, PlayerKillEvent, PlayerMedalEvent, PlayerStatsEvent, PlayerSwitchTeamEvent, RoundOverEvent } from 'ql-stats-model'
import { ProtocolType, SocketOptions, SocketType, ZeroMq } from 'zeromq-ts'

export default class Stats extends ZeroMq {

  events = new EventEmitter

  constructor(address: string, password?: string, options?: SocketOptions) {
    super(SocketType.subscriber, ProtocolType.tcp, address, {
      ...options,
      plain_username: password ? 'stats' : undefined,
      plain_password: password ? password : undefined,
      zap_domain: password ? 'stats' : undefined
    })

    this.onConnected((eventValue, address, error) => {
      this.subscribe()
    })

    this.onMessage(message => {
      let json = message.toString()
      let obj

      try {
        obj = JSON.parse(json)
      }
      catch (e) {
        console.error('Could not JSON.parse Quake Live event', e)
        return 
      }

      let type = obj.TYPE
      let data = obj.DATA

      switch (type) {
        case 'MATCH_REPORT': this.events.emit('MATCH_REPORT', MatchReportEvent.fromQl(data)); break
        case 'MATCH_STARTED': this.events.emit('MATCH_STARTED', MatchStartedEvent.fromQl(data)); break
        case 'PLAYER_CONNECT': this.events.emit('PLAYER_CONNECT', PlayerConnectEvent.fromQl(data)); break
        case 'PLAYER_DEATH': this.events.emit('PLAYER_DEATH', PlayerDeathEvent.fromQl(data)); break
        case 'PLAYER_DISCONNECT': this.events.emit('PLAYER_DISCONNECT', PlayerDisconnectEvent.fromQl(data)); break
        case 'PLAYER_KILL': this.events.emit('PLAYER_KILL', PlayerKillEvent.fromQl(data)); break
        case 'PLAYER_MEDAL': this.events.emit('PLAYER_MEDAL', PlayerMedalEvent.fromQl(data)); break
        case 'PLAYER_STATS': this.events.emit('PLAYER_STATS', PlayerStatsEvent.fromQl(data)); break
        case 'PLAYER_SWITCHTEAM': this.events.emit('PLAYER_SWITCHTEAM', PlayerSwitchTeamEvent.fromQl(data)); break
        case 'ROUND_OVER': this.events.emit('ROUND_OVER', RoundOverEvent.fromQl(data)); break
        default:
          console.error(`Received Quake Live event type '${type}' does not exist or is not supported.`, data)
      }
      
      this.events.emit('RAW_QL_EVENT', json)
    })
  }

  onRawQlEvent(listener: (event: any) => void) {
    this.events.on('RAW_QL_EVENT', listener)
  }

  onMatchReport(listener: (event: MatchReportEvent) => void) {
    this.events.on('MATCH_REPORT', listener)
  }

  onMatchStarted(listener: (event: MatchStartedEvent) => void) {
    this.events.on('MATCH_STARTED', listener)
  }

  onPlayerConnect(listener: (event: PlayerConnectEvent) => void) {
    this.events.on('PLAYER_CONNECT', listener)
  }

  onPlayerDeath(listener: (event: PlayerDeathEvent) => void) {
    this.events.on('PLAYER_DEATH', listener)
  }

  onPlayerDisconnect(listener: (event: PlayerDisconnectEvent) => void) {
    this.events.on('PLAYER_DISCONNECT', listener)
  }

  onPlayerKill(listener: (event: PlayerKillEvent) => void) {
    this.events.on('PLAYER_KILL', listener)
  }

  onPlayerMedal(listener: (event: PlayerMedalEvent) => void) {
    this.events.on('PLAYER_MEDAL', listener)
  }

  onPlayerStats(listener: (event: PlayerStatsEvent) => void) {
    this.events.on('PLAYER_STATS', listener)
  }

  onPlayerSwitchTeam(listener: (event: PlayerSwitchTeamEvent) => void) {
    this.events.on('PLAYER_SWITCHTEAM', listener)
  }
  
  onRoundOver(listener: (event: RoundOverEvent) => void) {
    this.events.on('ROUND_OVER', listener)
  }
}
