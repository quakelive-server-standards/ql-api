import HoldableType from './types/HoldableType'
import ModType from './types/ModType'
import PowerUpType from './types/PowerUpType'
import TeamType from './types/TeamType'
import WeaponType from './types/WeaponType'

export default class PlayerDeathEvent {

  matchGuid: string
  mod: ModType // what does that mean?
  otherTeamAlive: number | null
  otherTeamDead: number | null
  round: number | null
  suicide: boolean
  teamKill: boolean
  teamAlive: number | null
  teamDead: number | null
  time: number
  warmup: boolean

  killer: {
    airborne: boolean
    ammo: number
    armor: number
    bot: boolean
    botSkill: number | null
    health: number
    holdable: HoldableType | null
    name: string
    position: {
      x: number
      y: number
      z: number
    }
    powerUps: PowerUpType[] | null
    speed: number
    steamId: string
    submerged: boolean
    team: TeamType
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
    holdable: HoldableType | null
    name: string
    position: {
      x: number
      y: number
      z: number
    }
    powerUps: PowerUpType[] | null
    speed: number
    steamId: string
    streak: number
    submerged: boolean
    team: TeamType
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
    event.mod = ModType[data['MOD']] || data['MOD']
    event.otherTeamAlive = data['OTHER_TEAM_ALIVE']
    event.otherTeamDead = data['OTHER_TEAM_DEAD']
    event.round = data['ROUND']
    event.suicide = data['SUICIDE']
    event.teamKill = data['TEAMKILL']
    event.teamAlive = data['TEAM_ALIVE']
    event.teamDead = data['TEAM_DEAD']
    event.time = data['TIME']
    event.warmup = data['WARMUP']
  
    // if the killer was not another player this property
    // does not exist
    if (data['KILLER'] != undefined) {
      event.killer = {
        airborne: data['KILLER']['AIRBORNE'],
        ammo: data['KILLER']['AMMO'],
        armor: data['KILLER']['ARMOR'],
        bot: data['KILLER']['BOT'],
        botSkill: data['KILLER']['BOT_SKILL'],
        health: data['KILLER']['HEALTH'],
        holdable: HoldableType[data['KILLER']['HOLDABLE']] || data['KILLER']['HOLDABLE'],
        name: data['KILLER']['NAME'],
        position: {
          x: data['KILLER']['POSITION']['X'],
          y: data['KILLER']['POSITION']['Y'],
          z: data['KILLER']['POSITION']['Z']
        },
        powerUps: data['KILLER']['POWERUPS'] instanceof Array ? data['KILLER']['POWERUPS'].map(powerUp => PowerUpType[powerUp] || powerUp) : null,
        speed: data['KILLER']['SPEED'],
        steamId: data['KILLER']['STEAM_ID'],
        submerged: data['KILLER']['SUBMERGED'],
        team: data['KILLER']['TEAM'] == 0 ? TeamType['FREE'] : data['KILLER']['TEAM'] == 1 ? TeamType['RED'] : TeamType['BLUE'],
        view: {
          x: data['KILLER']['VIEW']['X'],
          y: data['KILLER']['VIEW']['Y'],
          z: data['KILLER']['VIEW']['Z']
        },
        weapon: WeaponType[data['KILLER']['WEAPON']] || data['KILLER']['WEAPON']
      }  
    }
  
    event.victim = {
      airborne: data['VICTIM']['AIRBORNE'],
      ammo: data['VICTIM']['AMMO'],
      armor: data['VICTIM']['ARMOR'],
      bot: data['VICTIM']['BOT'],
      botSkill: data['VICTIM']['BOT_SKILL'],
      health: data['VICTIM']['HEALTH'],
      holdable: HoldableType[data['VICTIM']['HOLDABLE']] || data['VICTIM']['HOLDABLE'],
      name: data['VICTIM']['NAME'],
      position: {
        x: data['VICTIM']['POSITION']['X'],
        y: data['VICTIM']['POSITION']['Y'],
        z: data['VICTIM']['POSITION']['Z']
      },
      powerUps: data['VICTIM']['POWERUPS'] instanceof Array ? data['VICTIM']['POWERUPS'].map(powerUp => PowerUpType[powerUp] || powerUp) : null,
      speed: data['VICTIM']['SPEED'],
      steamId: data['VICTIM']['STEAM_ID'],
      streak: data['VICTIM']['STREAK'],
      submerged: data['VICTIM']['SUBMERGED'],
      team: data['VICTIM']['TEAM'] == 0 ? TeamType['FREE'] : data['VICTIM']['TEAM'] == 1 ? TeamType['RED'] : TeamType['BLUE'],
      view: {
        x: data['VICTIM']['VIEW']['X'],
        y: data['VICTIM']['VIEW']['Y'],
        z: data['VICTIM']['VIEW']['Z']
      },
      weapon: WeaponType[data['VICTIM']['WEAPON']] || data['VICTIM']['WEAPON']
    }
 
    return event
  }
}