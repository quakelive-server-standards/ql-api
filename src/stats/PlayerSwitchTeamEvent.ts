import { TeamType } from 'ql-model'
import { TeamTypeMapping } from './typeMappings/TeamTypeMapping'

export default class PlayerSwitchTeamEvent {

  matchGuid: string
  name: string
  newTeam: TeamType
  oldTeam: TeamType
  steamId: string
  time: number
  warmup: boolean

  static fromQl(data: any): PlayerSwitchTeamEvent {
    let event = new PlayerSwitchTeamEvent

    event.matchGuid = data['MATCH_GUID']
    event.name = data['KILLER']['NAME']
    event.newTeam = TeamTypeMapping[data['KILLER']['TEAM']] || data['KILLER']['TEAM']
    event.oldTeam = TeamTypeMapping[data['KILLER']['OLD_TEAM']] || data['KILLER']['OLD_TEAM']
    event.steamId = data['KILLER']['STEAM_ID']
    event.time = data['TIME']
    event.warmup = data['WARMUP']

    return event
  }
}