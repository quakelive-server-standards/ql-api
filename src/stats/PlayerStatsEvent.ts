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
    combokill: number
    defends: number
    excellent: number
    firstFrag: number
    headshot: number
    humiliation: number
    impressive: number
    midair: number
    perfect: number
    perforated: number
    quadgod: number
    rampage: number
    revenge: number
  }
  model: string
  name: string
  pickups: {
    ammo: number
    armor: number
    armorRegeneration: number
    battlesuit: number
    doubler: number
    flight: number
    greenArmor: number
    guard: number
    haste: number
    health: number
    invis: number
    invulnerability: number
    kamikaze: number
    medkit: number
    megaHealth: number
    otherHoldable: number
    otherPowerup: number
    portal: number
    quad: number
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
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    chainGun: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    gauntlet: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    grenadeLauncher: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    heavyMachineGun: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    lightningGun: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    machineGun: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    nailGun: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    otherWeapon: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    plasmaGun: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    proximityMine: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    railGun: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    rocketLauncher: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    shotGun: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
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
      combokill: data['MEDALS']['COMBOKILL'],
      defends: data['MEDALS']['DEFENDS'],
      excellent: data['MEDALS']['EXCELLENT'],
      firstFrag: data['MEDALS']['FIRSTFRAG'],
      headshot: data['MEDALS']['HEADSHOT'],
      humiliation: data['MEDALS']['HUMILIATION'],
      impressive: data['MEDALS']['IMPRESSIVE'],
      midair: data['MEDALS']['MIDAIR'],
      perfect: data['MEDALS']['PERFECT'],
      perforated: data['MEDALS']['PERFORATED'],
      quadgod: data['MEDALS']['QUADGOD'],
      rampage: data['MEDALS']['RAMPAGE'],
      revenge: data['MEDALS']['REVENGE']
    }

    event.pickups = {
      ammo: data['PICKUPS']['AMMO'],
      armor: data['PICKUPS']['ARMOR'],
      armorRegeneration: data['PICKUPS']['ARMOR_REGEN'],
      battlesuit: data['PICKUPS']['BATTLESUIT'],
      doubler: data['PICKUPS']['DOUBLER'],
      flight: data['PICKUPS']['FLIGHT'],
      greenArmor: data['PICKUPS']['GREEN_ARMOR'],
      guard: data['PICKUPS']['GUARD'],
      haste: data['PICKUPS']['HASTE'],
      health: data['PICKUPS']['HEALTH'],
      invis: data['PICKUPS']['INVIS'],
      invulnerability: data['PICKUPS']['INVULNERABILITY'],
      kamikaze: data['PICKUPS']['KAMIKAZE'],
      medkit: data['PICKUPS']['MEDKIT'],
      megaHealth: data['PICKUPS']['MEGA_HEALTH'],
      otherHoldable: data['PICKUPS']['OTHER_HOLDABLE'],
      otherPowerup: data['PICKUPS']['OTHER_POWERUP'],
      portal: data['PICKUPS']['PORTAL'],
      quad: data['PICKUPS']['QUAD'],
      redArmor: data['PICKUPS']['RED_ARMOR'],
      regeneration: data['PICKUPS']['REGEN'],
      scout: data['PICKUPS']['SCOUT'],
      teleporter: data['PICKUPS']['TELEPORTER'],
      yellowArmor: data['PICKUPS']['YELLOW_ARMOR']
    }

    event.weapons = {
      bfg: {
        d: data['WEAPONS']['BFG']['D'],
        dg: data['WEAPONS']['BFG']['DG'],
        dr: data['WEAPONS']['BFG']['DR'],
        h: data['WEAPONS']['BFG']['H'],
        k: data['WEAPONS']['BFG']['K'],
        p: data['WEAPONS']['BFG']['P'],
        s: data['WEAPONS']['BFG']['S'],
        t: data['WEAPONS']['BFG']['T']
      },
      chainGun: {
        d: data['WEAPONS']['CHAINGUN']['D'],
        dg: data['WEAPONS']['CHAINGUN']['DG'],
        dr: data['WEAPONS']['CHAINGUN']['DR'],
        h: data['WEAPONS']['CHAINGUN']['H'],
        k: data['WEAPONS']['CHAINGUN']['K'],
        p: data['WEAPONS']['CHAINGUN']['P'],
        s: data['WEAPONS']['CHAINGUN']['S'],
        t: data['WEAPONS']['CHAINGUN']['T']
      },
      gauntlet: {
        d: data['WEAPONS']['GAUNTLET']['D'],
        dg: data['WEAPONS']['GAUNTLET']['DG'],
        dr: data['WEAPONS']['GAUNTLET']['DR'],
        h: data['WEAPONS']['GAUNTLET']['H'],
        k: data['WEAPONS']['GAUNTLET']['K'],
        p: data['WEAPONS']['GAUNTLET']['P'],
        s: data['WEAPONS']['GAUNTLET']['S'],
        t: data['WEAPONS']['GAUNTLET']['T']
      },
      grenadeLauncher: {
        d: data['WEAPONS']['GRENADE']['D'],
        dg: data['WEAPONS']['GRENADE']['DG'],
        dr: data['WEAPONS']['GRENADE']['DR'],
        h: data['WEAPONS']['GRENADE']['H'],
        k: data['WEAPONS']['GRENADE']['K'],
        p: data['WEAPONS']['GRENADE']['P'],
        s: data['WEAPONS']['GRENADE']['S'],
        t: data['WEAPONS']['GRENADE']['T']
      },
      heavyMachineGun: {
        d: data['WEAPONS']['HMG']['D'],
        dg: data['WEAPONS']['HMG']['DG'],
        dr: data['WEAPONS']['HMG']['DR'],
        h: data['WEAPONS']['HMG']['H'],
        k: data['WEAPONS']['HMG']['K'],
        p: data['WEAPONS']['HMG']['P'],
        s: data['WEAPONS']['HMG']['S'],
        t: data['WEAPONS']['HMG']['T']
      },
      lightningGun: {
        d: data['WEAPONS']['LIGHTNING']['D'],
        dg: data['WEAPONS']['LIGHTNING']['DG'],
        dr: data['WEAPONS']['LIGHTNING']['DR'],
        h: data['WEAPONS']['LIGHTNING']['H'],
        k: data['WEAPONS']['LIGHTNING']['K'],
        p: data['WEAPONS']['LIGHTNING']['P'],
        s: data['WEAPONS']['LIGHTNING']['S'],
        t: data['WEAPONS']['LIGHTNING']['T']
      },
      machineGun: {
        d: data['WEAPONS']['MACHINEGUN']['D'],
        dg: data['WEAPONS']['MACHINEGUN']['DG'],
        dr: data['WEAPONS']['MACHINEGUN']['DR'],
        h: data['WEAPONS']['MACHINEGUN']['H'],
        k: data['WEAPONS']['MACHINEGUN']['K'],
        p: data['WEAPONS']['MACHINEGUN']['P'],
        s: data['WEAPONS']['MACHINEGUN']['S'],
        t: data['WEAPONS']['MACHINEGUN']['T']
      },
      nailGun: {
        d: data['WEAPONS']['NAILGUN']['D'],
        dg: data['WEAPONS']['NAILGUN']['DG'],
        dr: data['WEAPONS']['NAILGUN']['DR'],
        h: data['WEAPONS']['NAILGUN']['H'],
        k: data['WEAPONS']['NAILGUN']['K'],
        p: data['WEAPONS']['NAILGUN']['P'],
        s: data['WEAPONS']['NAILGUN']['S'],
        t: data['WEAPONS']['NAILGUN']['T']
      },
      otherWeapon: {
        d: data['WEAPONS']['OTHER_WEAPON']['D'],
        dg: data['WEAPONS']['OTHER_WEAPON']['DG'],
        dr: data['WEAPONS']['OTHER_WEAPON']['DR'],
        h: data['WEAPONS']['OTHER_WEAPON']['H'],
        k: data['WEAPONS']['OTHER_WEAPON']['K'],
        p: data['WEAPONS']['OTHER_WEAPON']['P'],
        s: data['WEAPONS']['OTHER_WEAPON']['S'],
        t: data['WEAPONS']['OTHER_WEAPON']['T']
      },
      plasmaGun: {
        d: data['WEAPONS']['PLASMA']['D'],
        dg: data['WEAPONS']['PLASMA']['DG'],
        dr: data['WEAPONS']['PLASMA']['DR'],
        h: data['WEAPONS']['PLASMA']['H'],
        k: data['WEAPONS']['PLASMA']['K'],
        p: data['WEAPONS']['PLASMA']['P'],
        s: data['WEAPONS']['PLASMA']['S'],
        t: data['WEAPONS']['PLASMA']['T']
      },
      proximityMine: {
        d: data['WEAPONS']['PROXMINE']['D'],
        dg: data['WEAPONS']['PROXMINE']['DG'],
        dr: data['WEAPONS']['PROXMINE']['DR'],
        h: data['WEAPONS']['PROXMINE']['H'],
        k: data['WEAPONS']['PROXMINE']['K'],
        p: data['WEAPONS']['PROXMINE']['P'],
        s: data['WEAPONS']['PROXMINE']['S'],
        t: data['WEAPONS']['PROXMINE']['T']
      },
      railGun: {
        d: data['WEAPONS']['RAILGUN']['D'],
        dg: data['WEAPONS']['RAILGUN']['DG'],
        dr: data['WEAPONS']['RAILGUN']['DR'],
        h: data['WEAPONS']['RAILGUN']['H'],
        k: data['WEAPONS']['RAILGUN']['K'],
        p: data['WEAPONS']['RAILGUN']['P'],
        s: data['WEAPONS']['RAILGUN']['S'],
        t: data['WEAPONS']['RAILGUN']['T']
      },
      rocketLauncher: {
        d: data['WEAPONS']['ROCKET']['D'],
        dg: data['WEAPONS']['ROCKET']['DG'],
        dr: data['WEAPONS']['ROCKET']['DR'],
        h: data['WEAPONS']['ROCKET']['H'],
        k: data['WEAPONS']['ROCKET']['K'],
        p: data['WEAPONS']['ROCKET']['P'],
        s: data['WEAPONS']['ROCKET']['S'],
        t: data['WEAPONS']['ROCKET']['T']
      },
      shotGun: {
        d: data['WEAPONS']['SHOTGUN']['D'],
        dg: data['WEAPONS']['SHOTGUN']['DG'],
        dr: data['WEAPONS']['SHOTGUN']['DR'],
        h: data['WEAPONS']['SHOTGUN']['H'],
        k: data['WEAPONS']['SHOTGUN']['K'],
        p: data['WEAPONS']['SHOTGUN']['P'],
        s: data['WEAPONS']['SHOTGUN']['S'],
        t: data['WEAPONS']['SHOTGUN']['T']
      }
    }

    return event
  }
}