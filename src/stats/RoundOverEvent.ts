export default class RoundOverEvent {

  matchGuid: string
  round: number
  teamWon: string
  time: number
  warmup: boolean
    
  static fromQl(data: any): RoundOverEvent {
    let event = new RoundOverEvent

    event.matchGuid = data['MATCH_GUID']
    event.round = data['ROUND']
    event.teamWon = data['TEAM_WON']
    event.time = data['TIME']
    event.warmup = data['WARMUP']

    return event
  }
}