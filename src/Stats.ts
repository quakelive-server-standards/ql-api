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
      let event: any

      switch (type) {
        case 'MATCH_REPORT': event = MatchReportEvent.fromQl(data); break
        case 'MATCH_STARTED': event = MatchStartedEvent.fromQl(data); break
        case 'PLAYER_CONNECT': event = PlayerConnectEvent.fromQl(data); break
        case 'PLAYER_DEATH': event = PlayerDeathEvent.fromQl(data); break
        case 'PLAYER_DISCONNECT': event = PlayerDisconnectEvent.fromQl(data); break
        case 'PLAYER_KILL': event = PlayerKillEvent.fromQl(data); break
        case 'PLAYER_MEDAL': event = PlayerMedalEvent.fromQl(data); break
        case 'PLAYER_STATS': event = PlayerStatsEvent.fromQl(data); break
        case 'PLAYER_SWITCHTEAM': event = PlayerSwitchTeamEvent.fromQl(data); break
        case 'ROUND_OVER': event = RoundOverEvent.fromQl(data); break
        default:
          console.error(`Received Quake Live event TYPE '${type}' does not exist or is not supported.`, data)
      }

      console.log(type)
    })
  }
}
