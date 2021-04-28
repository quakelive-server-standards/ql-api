export default class PlayerDisconnectEvent {
  
  matchGuid: string
  name: string
  steamId: string
  time: number
  warmup: boolean

  static fromQl(data: any): PlayerDisconnectEvent {
    let event = new PlayerDisconnectEvent

    event.matchGuid = data['MATCH_GUID']
    event.name = data['NAME']
    event.steamId = data['STEAM_ID']
    event.time = data['TIME']
    event.warmup = data['WARMUP']

    return event
  }
}