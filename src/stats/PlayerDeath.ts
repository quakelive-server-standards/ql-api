import ModType from './ModType'
import WeaponType from './WeaponType'

export default class PlayerKill {
  matchGuid: string
  mod: ModType
  otherTeamAlive: any | null // data type not known
  otherTeamDead: any | null // data type not known
  round: any | null // data type not known
  suicide: boolean
  teamkill: boolean
  teamAlive: any | null // data type not known
  teamDead: any | null // data type not known
  time: number

  killer: {
    airborne: boolean
    ammo: number
    armor: number
    bot: boolean
    bot_skill: number | null
    health: number
    holdable: any | null // data type not known
    name: string
    position: {
      x: number
      y: number
      z: number
    }
    powerups: any | null // data type not known
    speed: number
    steamId: string
    submerged: boolean
    team: number
    view: {
      x: number
      y: number
      z: number
    }
    weapon: WeaponType
  }

  victim: {
    airborne: boolean
    ammo: number
    armor: number
    bot: boolean
    bot_skill: number | null
    health: number
    holdable: any | null // data type not known
    name: string
    position: {
      x: number
      y: number
      z: number
    }
    powerups: any | null // data type not known
    speed: number
    steamId: string
    streak: number
    submerged: boolean
    team: number
    view: {
      x: number
      y: number
      z: number
    }
    weapon: WeaponType
  }
}