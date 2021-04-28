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
        console.log('Stats: Connected to ' + this.address)
      }
      else {
        console.log('Stats: There was an error connecting to ' + address + ' -> ' + error)
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
        case 'MATCH_REPORT': this.emit('MATCH_REPORT', MatchReportEvent.fromQl(data)); break
        case 'MATCH_STARTED': this.emit('MATCH_STARTED', MatchStartedEvent.fromQl(data)); break
        case 'PLAYER_CONNECT': this.emit('PLAYER_CONNECT', PlayerConnectEvent.fromQl(data)); break
        case 'PLAYER_DEATH': this.emit('PLAYER_DEATH', PlayerDeathEvent.fromQl(data)); break
        case 'PLAYER_DISCONNECT': this.emit('PLAYER_DISCONNECT', PlayerDisconnectEvent.fromQl(data)); break
        case 'PLAYER_KILL': this.emit('PLAYER_KILL', PlayerKillEvent.fromQl(data)); break
        case 'PLAYER_MEDAL': this.emit('PLAYER_MEDAL', PlayerMedalEvent.fromQl(data)); break
        case 'PLAYER_STATS': this.emit('PLAYER_STATS', PlayerStatsEvent.fromQl(data)); break
        case 'PLAYER_SWITCHTEAM': this.emit('PLAYER_SWITCHTEAM', PlayerSwitchTeamEvent.fromQl(data)); break
        case 'ROUND_OVER': this.emit('ROUND_OVER', RoundOverEvent.fromQl(data)); break
        default:
          console.error(`Received Quake Live event TYPE '${type}' does not exist or is not supported.`, data)
      }
    })
  }

  onMatchReport(listener: (event: MatchReportEvent) => void) {
    this.on('MATCH_REPORT', listener)
  }

  onMatchStarted(listener: (event: MatchStartedEvent) => void) {
    this.on('MATCH_STARTED', listener)
  }

  onPlayerConnect(listener: (event: PlayerConnectEvent) => void) {
    this.on('PLAYER_CONNECT', listener)
  }

  onPlayerDeath(listener: (event: PlayerDeathEvent) => void) {
    this.on('PLAYER_DEATH', listener)
  }

  onPlayerDisconnect(listener: (event: PlayerDisconnectEvent) => void) {
    this.on('PLAYER_DISCONNECT', listener)
  }

  onPlayerKill(listener: (event: PlayerKillEvent) => void) {
    this.on('PLAYER_KILL', listener)
  }

  onPlayerMedal(listener: (event: PlayerMedalEvent) => void) {
    this.on('PLAYER_MEDAL', listener)
  }

  onPlayerStats(listener: (event: PlayerStatsEvent) => void) {
    this.on('PLAYER_STATS', listener)
  }

  onPlayerSwitchTeam(listener: (event: PlayerSwitchTeamEvent) => void) {
    this.on('PLAYER_SWITCHTEAM', listener)
  }
  
  onRoundOver(listener: (event: RoundOverEvent) => void) {
    this.on('ROUND_OVER', listener)
  }
}
