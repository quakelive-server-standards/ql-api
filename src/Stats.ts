import { EventEmitter } from 'events'
import MatchReportEvent from './stats/MatchReportEvent'
import MatchStartedEvent from './stats/MatchStartedEvent'
import PlayerConnectEvent from './stats/PlayerConnectEvent'
import PlayerDeathEvent from './stats/PlayerDeathEvent'
import PlayerDisconnectEvent from './stats/PlayerDisconnectEvent'
import PlayerKillEvent from './stats/PlayerKillEvent'
import PlayerMedalEvent from './stats/PlayerMedalEvent'
import PlayerStatsEvent from './stats/PlayerStatsEvent'
import PlayerSwitchTeamEvent from './stats/PlayerSwitchTeamEvent'
import RoundOverEvent from './stats/RoundOverEvent'
import { ProtocolType, SocketType, ZeroMq } from 'zeromq-ts'

export default class Stats extends ZeroMq {

  events = new EventEmitter

  constructor(address: string, identity: string, password?: string) {
    super(SocketType.subscriber, ProtocolType.tcp, address, {
      identity: identity,
      plain_username: password ? 'stats' : undefined,
      plain_password: password ? password : undefined,
      zap_domain: password ? 'stats' : undefined
    })

    this.onConnected((eventValue, address, error) => {
      if (! error) {
        this.subscribe()
        console.log('Stats connected to ' + this.address)
      }
      else {
        console.log('There was an error connecting to stats API ' + address + ' -> ' + error)
      }
    })

    this.onConnectDelayed(() => console.log('Stats: Retried connecting to ' + this.address))
    this.onConnectRetried(() => console.log('Stats: Delayed connecting to ' + this.address))

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
          console.error(`Received Quake Live event TYPE '${type}' does not exist or is not supported.`, data)
      }
    })
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
