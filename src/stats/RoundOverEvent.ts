import TeamType from './types/TeamType'

export default class RoundOverEvent {

  matchGuid: string
  round: number
  teamWon: TeamType
  time: number
  warmup: boolean
    
  static fromQl(data: any): RoundOverEvent {
    let event = new RoundOverEvent

    event.matchGuid = data['MATCH_GUID']
    event.round = data['ROUND']
    event.teamWon = TeamType[data['TEAM_WON']] || data['TEAM_WON']
    event.time = data['TIME']
    event.warmup = data['WARMUP']

    return event
  }
}