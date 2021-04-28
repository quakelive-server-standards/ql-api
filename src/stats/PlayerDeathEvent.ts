import HoldableType from './types/HoldableType'
import ModType from './types/ModType'
import PowerUpType from './types/PowerUpType'
import WeaponType from './types/WeaponType'

export default class PlayerDeathEvent {

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
  warmup: boolean

  killer: {
    airborne: boolean
    ammo: number
    armor: number
    bot: boolean
    botSkill: number | null
    health: number
    holdable: HoldableType | null // data type not known
    name: string
    position: {
      x: number
      y: number
      z: number
    }
    powerUps: PowerUpType[] | null // data type not known
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
    botSkill: number | null
    health: number
    holdable: HoldableType | null // data type not known
    name: string
    position: {
      x: number
      y: number
      z: number
    }
    powerUps: PowerUpType[] | null // data type not known
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

  static fromQl(data: any): PlayerDeathEvent {
    let event = new PlayerDeathEvent
 
    event.matchGuid = data['MATCH_GUID']
    event.mod = data['MOD']
    event.otherTeamAlive = data['OTHER_TEAM_ALIVE']
    event.otherTeamDead = data['OTHER_TEAM_DEAD']
    event.round = data['ROUND']
    event.suicide = data['SUICIDE']
    event.teamkill = data['TEAMKILL']
    event.teamAlive = data['TEAM_ALIVE']
    event.teamDead = data['TEAM_DEAD']
    event.time = data['TIME']
    event.warmup = data['WARMUP']
  
    event.killer = {
      airborne: data['KILLER']['AIRBORNE'],
      ammo: data['KILLER']['AMMO'],
      armor: data['KILLER']['ARMOR'],
      bot: data['KILLER']['BOT'],
      botSkill: data['KILLER']['BOT_SKILL'],
      health: data['KILLER']['HEALTH'],
      holdable: data['KILLER']['HOLDABLE'],
      name: data['KILLER']['NAME'],
      position: {
        x: data['KILLER']['POSITION']['X'],
        y: data['KILLER']['POSITION']['Y'],
        z: data['KILLER']['POSITION']['Z']
      },
      powerUps: data['KILLER']['POWERUPS'],
      speed: data['KILLER']['SPEED'],
      steamId: data['KILLER']['STEAM_ID'],
      submerged: data['KILLER']['SUBMERGED'],
      team: data['KILLER']['TEAM'],
      view: {
        x: data['KILLER']['VIEW']['X'],
        y: data['KILLER']['VIEW']['Y'],
        z: data['KILLER']['VIEW']['Z']
      },
      weapon: data['KILLER']['WEAPON']
    }
  
    event.victim = {
      airborne: data['VICTIM']['AIRBORNE'],
      ammo: data['VICTIM']['AMMO'],
      armor: data['VICTIM']['ARMOR'],
      bot: data['VICTIM']['BOT'],
      botSkill: data['VICTIM']['BOT_SKILL'],
      health: data['VICTIM']['HEALTH'],
      holdable: data['VICTIM']['HOLDABLE'],
      name: data['VICTIM']['NAME'],
      position: {
        x: data['VICTIM']['POSITION']['X'],
        y: data['VICTIM']['POSITION']['Y'],
        z: data['VICTIM']['POSITION']['Z']
      },
      powerUps: data['VICTIM']['POWERUPS'],
      speed: data['VICTIM']['SPEED'],
      steamId: data['VICTIM']['STEAM_ID'],
      streak: data['VICTIM']['STREAK'],
      submerged: data['VICTIM']['SUBMERGED'],
      team: data['VICTIM']['TEAM'],
      view: {
        x: data['VICTIM']['VIEW']['X'],
        y: data['VICTIM']['VIEW']['Y'],
        z: data['VICTIM']['VIEW']['Z']
      },
      weapon: data['VICTIM']['WEAPON']
    }
 
    return event
  }
}