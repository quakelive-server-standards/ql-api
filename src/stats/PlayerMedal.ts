import MedalType from './MedalType'

export default class PlayerMedal {
  matchGuid: string
  medal: MedalType
  name: string
  steamId: string
  time: number
  total: number
  warmup: false
}