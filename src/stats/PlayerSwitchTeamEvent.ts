import TeamType from './types/TeamType'

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
    event.newTeam = data['KILLER']['TEAM']
    event.oldTeam = data['KILLER']['OLD_TEAM']
    event.steamId = data['KILLER']['STEAM_ID']
    event.time = data['TIME']
    event.warmup = data['WARMUP']

    return event
  }
}