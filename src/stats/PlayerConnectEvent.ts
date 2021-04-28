export default class PlayerConnectEvent {
  
  matchGuid: string
  name: string
  steamId: string
  time: number
  warmup: boolean

  static fromQl(data: any): PlayerConnectEvent {
    let event = new PlayerConnectEvent

    event.matchGuid = data['MATCH_GUID']
    event.name = data['NAME']
    event.steamId = data['STEAM_ID']
    event.time = data['TIME']
    event.warmup = data['WARMUP']

    return event
  }
}