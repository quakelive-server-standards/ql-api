import { MedalType } from 'ql-model'
import { MedalTypeMapping } from './typeMappings/MedalTypeMapping'

export default class PlayerMedalEvent {

  matchGuid: string
  medal: MedalType
  name: string
  steamId: string
  time: number
  total: number
  warmup: false

  static fromQl(data: any): PlayerMedalEvent {
    let event = new PlayerMedalEvent

    event.matchGuid = data['MATCH_GUID']
    event.medal = MedalTypeMapping[data['MEDAL']] || data['MEDAL']
    event.name = data['NAME']
    event.steamId = data['STEAM_ID']
    event.time = data['TIME']
    event.total = data['TOTAL']
    event.warmup = data['WARMUP']

    return event
  }
}