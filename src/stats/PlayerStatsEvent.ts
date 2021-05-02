export default class PlayerStatsEvent {

  aborted: boolean
  damage: {
    dealt: number
    taken: number
  }
  deaths: number
  kills: number
  lose: number
  matchGuid: string
  maxStreak: number
  medals: {
    accuracy: number
    assists: number
    captures: number
    comboKill: number
    defends: number
    excellent: number
    firstFrag: number
    headshot: number
    humiliation: number
    impressive: number
    midAir: number
    perfect: number
    perforated: number
    quadGod: number
    rampage: number
    revenge: number
  }
  model: string
  name: string
  pickups: {
    ammo: number
    armor: number
    armorRegeneration: number
    battleSuit: number
    doubler: number
    flight: number
    greenArmor: number
    guard: number
    haste: number
    health: number
    invisibility: number
    invulnerability: number
    kamikaze: number
    medKit: number
    megaHealth: number
    otherHoldable: number
    otherPowerUp: number
    portal: number
    quadDamage: number
    redArmor: number
    regeneration: number
    scout: number
    teleporter: number
    yellowArmor: number
  }
  playTime: number
  quit: number
  rank: number
  score: number
  steamId: string
  tiedRank: number
  warmup: boolean
  weapons: {
    bfg: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    chainGun: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    gauntlet: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    grenadeLauncher: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    heavyMachineGun: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    lightningGun: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    machineGun: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    nailGun: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    otherWeapon: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    plasmaGun: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    proximityMine: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    railGun: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    rocketLauncher: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
    shotGun: {
      deaths: number
      damageGiven: number
      damageReceived: number
      hits: number
      kills: number
      p: number
      shots: number
      t: number
    }
  }
  win: number

  static fromQl(data: any): PlayerStatsEvent {
    let event = new PlayerStatsEvent
 
    event.aborted = data['ABORTED']
    event.model = data['MODEL']
    event.name = data['NAME']
    event.deaths = data['DEATHS']
    event.kills = data['KILLS']
    event.lose = data['LOSE']
    event.matchGuid = data['MATCH_GUID']
    event.maxStreak = data['MAX_STREAK']
    event.playTime = data['PLAY_TIME']
    event.quit = data['QUIT']
    event.rank = data['RANK']
    event.score = data['SCORE']
    event.steamId = data['STEAM_ID']
    event.tiedRank = data['TIED_RANK']
    event.warmup = data['WARMUP']
    event.win = data['WIN']

    event.damage = {
      dealt: data['DAMAGE']['DEALT'],
      taken: data['DAMAGE']['TAKEN']
    },

    event.medals = {
      accuracy: data['MEDALS']['ACCURACY'],
      assists: data['MEDALS']['ASSISTS'],
      captures: data['MEDALS']['CAPTURES'],
      comboKill: data['MEDALS']['COMBOKILL'],
      defends: data['MEDALS']['DEFENDS'],
      excellent: data['MEDALS']['EXCELLENT'],
      firstFrag: data['MEDALS']['FIRSTFRAG'],
      headshot: data['MEDALS']['HEADSHOT'],
      humiliation: data['MEDALS']['HUMILIATION'],
      impressive: data['MEDALS']['IMPRESSIVE'],
      midAir: data['MEDALS']['MIDAIR'],
      perfect: data['MEDALS']['PERFECT'],
      perforated: data['MEDALS']['PERFORATED'],
      quadGod: data['MEDALS']['QUADGOD'],
      rampage: data['MEDALS']['RAMPAGE'],
      revenge: data['MEDALS']['REVENGE']
    }

    event.pickups = {
      ammo: data['PICKUPS']['AMMO'],
      armor: data['PICKUPS']['ARMOR'],
      armorRegeneration: data['PICKUPS']['ARMOR_REGEN'],
      battleSuit: data['PICKUPS']['BATTLESUIT'],
      doubler: data['PICKUPS']['DOUBLER'],
      flight: data['PICKUPS']['FLIGHT'],
      greenArmor: data['PICKUPS']['GREEN_ARMOR'],
      guard: data['PICKUPS']['GUARD'],
      haste: data['PICKUPS']['HASTE'],
      health: data['PICKUPS']['HEALTH'],
      invisibility: data['PICKUPS']['INVIS'],
      invulnerability: data['PICKUPS']['INVULNERABILITY'],
      kamikaze: data['PICKUPS']['KAMIKAZE'],
      medKit: data['PICKUPS']['MEDKIT'],
      megaHealth: data['PICKUPS']['MEGA_HEALTH'],
      otherHoldable: data['PICKUPS']['OTHER_HOLDABLE'],
      otherPowerUp: data['PICKUPS']['OTHER_POWERUP'],
      portal: data['PICKUPS']['PORTAL'],
      quadDamage: data['PICKUPS']['QUAD'],
      redArmor: data['PICKUPS']['RED_ARMOR'],
      regeneration: data['PICKUPS']['REGEN'],
      scout: data['PICKUPS']['SCOUT'],
      teleporter: data['PICKUPS']['TELEPORTER'],
      yellowArmor: data['PICKUPS']['YELLOW_ARMOR']
    }

    event.weapons = {
      bfg: {
        deaths: data['WEAPONS']['BFG']['D'],
        damageGiven: data['WEAPONS']['BFG']['DG'],
        damageReceived: data['WEAPONS']['BFG']['DR'],
        hits: data['WEAPONS']['BFG']['H'],
        kills: data['WEAPONS']['BFG']['K'],
        p: data['WEAPONS']['BFG']['P'],
        shots: data['WEAPONS']['BFG']['S'],
        t: data['WEAPONS']['BFG']['T']
      },
      chainGun: {
        deaths: data['WEAPONS']['CHAINGUN']['D'],
        damageGiven: data['WEAPONS']['CHAINGUN']['DG'],
        damageReceived: data['WEAPONS']['CHAINGUN']['DR'],
        hits: data['WEAPONS']['CHAINGUN']['H'],
        kills: data['WEAPONS']['CHAINGUN']['K'],
        p: data['WEAPONS']['CHAINGUN']['P'],
        shots: data['WEAPONS']['CHAINGUN']['S'],
        t: data['WEAPONS']['CHAINGUN']['T']
      },
      gauntlet: {
        deaths: data['WEAPONS']['GAUNTLET']['D'],
        damageGiven: data['WEAPONS']['GAUNTLET']['DG'],
        damageReceived: data['WEAPONS']['GAUNTLET']['DR'],
        hits: data['WEAPONS']['GAUNTLET']['H'],
        kills: data['WEAPONS']['GAUNTLET']['K'],
        p: data['WEAPONS']['GAUNTLET']['P'],
        shots: data['WEAPONS']['GAUNTLET']['S'],
        t: data['WEAPONS']['GAUNTLET']['T']
      },
      grenadeLauncher: {
        deaths: data['WEAPONS']['GRENADE']['D'],
        damageGiven: data['WEAPONS']['GRENADE']['DG'],
        damageReceived: data['WEAPONS']['GRENADE']['DR'],
        hits: data['WEAPONS']['GRENADE']['H'],
        kills: data['WEAPONS']['GRENADE']['K'],
        p: data['WEAPONS']['GRENADE']['P'],
        shots: data['WEAPONS']['GRENADE']['S'],
        t: data['WEAPONS']['GRENADE']['T']
      },
      heavyMachineGun: {
        deaths: data['WEAPONS']['HMG']['D'],
        damageGiven: data['WEAPONS']['HMG']['DG'],
        damageReceived: data['WEAPONS']['HMG']['DR'],
        hits: data['WEAPONS']['HMG']['H'],
        kills: data['WEAPONS']['HMG']['K'],
        p: data['WEAPONS']['HMG']['P'],
        shots: data['WEAPONS']['HMG']['S'],
        t: data['WEAPONS']['HMG']['T']
      },
      lightningGun: {
        deaths: data['WEAPONS']['LIGHTNING']['D'],
        damageGiven: data['WEAPONS']['LIGHTNING']['DG'],
        damageReceived: data['WEAPONS']['LIGHTNING']['DR'],
        hits: data['WEAPONS']['LIGHTNING']['H'],
        kills: data['WEAPONS']['LIGHTNING']['K'],
        p: data['WEAPONS']['LIGHTNING']['P'],
        shots: data['WEAPONS']['LIGHTNING']['S'],
        t: data['WEAPONS']['LIGHTNING']['T']
      },
      machineGun: {
        deaths: data['WEAPONS']['MACHINEGUN']['D'],
        damageGiven: data['WEAPONS']['MACHINEGUN']['DG'],
        damageReceived: data['WEAPONS']['MACHINEGUN']['DR'],
        hits: data['WEAPONS']['MACHINEGUN']['H'],
        kills: data['WEAPONS']['MACHINEGUN']['K'],
        p: data['WEAPONS']['MACHINEGUN']['P'],
        shots: data['WEAPONS']['MACHINEGUN']['S'],
        t: data['WEAPONS']['MACHINEGUN']['T']
      },
      nailGun: {
        deaths: data['WEAPONS']['NAILGUN']['D'],
        damageGiven: data['WEAPONS']['NAILGUN']['DG'],
        damageReceived: data['WEAPONS']['NAILGUN']['DR'],
        hits: data['WEAPONS']['NAILGUN']['H'],
        kills: data['WEAPONS']['NAILGUN']['K'],
        p: data['WEAPONS']['NAILGUN']['P'],
        shots: data['WEAPONS']['NAILGUN']['S'],
        t: data['WEAPONS']['NAILGUN']['T']
      },
      otherWeapon: {
        deaths: data['WEAPONS']['OTHER_WEAPON']['D'],
        damageGiven: data['WEAPONS']['OTHER_WEAPON']['DG'],
        damageReceived: data['WEAPONS']['OTHER_WEAPON']['DR'],
        hits: data['WEAPONS']['OTHER_WEAPON']['H'],
        kills: data['WEAPONS']['OTHER_WEAPON']['K'],
        p: data['WEAPONS']['OTHER_WEAPON']['P'],
        shots: data['WEAPONS']['OTHER_WEAPON']['S'],
        t: data['WEAPONS']['OTHER_WEAPON']['T']
      },
      plasmaGun: {
        deaths: data['WEAPONS']['PLASMA']['D'],
        damageGiven: data['WEAPONS']['PLASMA']['DG'],
        damageReceived: data['WEAPONS']['PLASMA']['DR'],
        hits: data['WEAPONS']['PLASMA']['H'],
        kills: data['WEAPONS']['PLASMA']['K'],
        p: data['WEAPONS']['PLASMA']['P'],
        shots: data['WEAPONS']['PLASMA']['S'],
        t: data['WEAPONS']['PLASMA']['T']
      },
      proximityMine: {
        deaths: data['WEAPONS']['PROXMINE']['D'],
        damageGiven: data['WEAPONS']['PROXMINE']['DG'],
        damageReceived: data['WEAPONS']['PROXMINE']['DR'],
        hits: data['WEAPONS']['PROXMINE']['H'],
        kills: data['WEAPONS']['PROXMINE']['K'],
        p: data['WEAPONS']['PROXMINE']['P'],
        shots: data['WEAPONS']['PROXMINE']['S'],
        t: data['WEAPONS']['PROXMINE']['T']
      },
      railGun: {
        deaths: data['WEAPONS']['RAILGUN']['D'],
        damageGiven: data['WEAPONS']['RAILGUN']['DG'],
        damageReceived: data['WEAPONS']['RAILGUN']['DR'],
        hits: data['WEAPONS']['RAILGUN']['H'],
        kills: data['WEAPONS']['RAILGUN']['K'],
        p: data['WEAPONS']['RAILGUN']['P'],
        shots: data['WEAPONS']['RAILGUN']['S'],
        t: data['WEAPONS']['RAILGUN']['T']
      },
      rocketLauncher: {
        deaths: data['WEAPONS']['ROCKET']['D'],
        damageGiven: data['WEAPONS']['ROCKET']['DG'],
        damageReceived: data['WEAPONS']['ROCKET']['DR'],
        hits: data['WEAPONS']['ROCKET']['H'],
        kills: data['WEAPONS']['ROCKET']['K'],
        p: data['WEAPONS']['ROCKET']['P'],
        shots: data['WEAPONS']['ROCKET']['S'],
        t: data['WEAPONS']['ROCKET']['T']
      },
      shotGun: {
        deaths: data['WEAPONS']['SHOTGUN']['D'],
        damageGiven: data['WEAPONS']['SHOTGUN']['DG'],
        damageReceived: data['WEAPONS']['SHOTGUN']['DR'],
        hits: data['WEAPONS']['SHOTGUN']['H'],
        kills: data['WEAPONS']['SHOTGUN']['K'],
        p: data['WEAPONS']['SHOTGUN']['P'],
        shots: data['WEAPONS']['SHOTGUN']['S'],
        t: data['WEAPONS']['SHOTGUN']['T']
      }
    }

    return event
  }
}