export default class PlayerStats {
  aborted: boolean
  damage: {
    dealt: number
    taken: number
  }
  deaths: number
  kills: number
  lose: number
  matchGuid: string
  maxStreak: 0
  medals: {
    accuracy: number
    assists: number
    captures: number
    combokill: number
    defends: number
    excellent: number
    firstrag: number
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
    armorRegen: number
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
    regen: number
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
    chaingun: {
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
    grenade: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    hmg: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    lightning: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    machinegun: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    nailgun: {
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
    plasma: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    proxmine: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    railgun: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    rocket: {
      d: number
      dg: number
      dr: number
      h: number
      k: number
      p: number
      s: number
      t: number
    }
    shotgun: {
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
}