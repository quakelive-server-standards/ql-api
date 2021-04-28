import { expect } from 'chai'
import 'mocha'
import PlayerStatsEvent from '../../src/stats/PlayerStatsEvent'

describe('stats/PlayerStatsEvent', function() {
  it('should create an object out of the QL event', function() {
     let ql = {
      "DATA" : {
         "ABORTED" : false,
         "DAMAGE" : {
            "DEALT" : 0,
            "TAKEN" : 0
         },
         "DEATHS" : 0,
         "KILLS" : 0,
         "LOSE" : 0,
         "MATCH_GUID" : "1a8bd0a8-f819-4245-b873-4235ffa1607e",
         "MAX_STREAK" : 0,
         "MEDALS" : {
            "ACCURACY" : 0,
            "ASSISTS" : 0,
            "CAPTURES" : 0,
            "COMBOKILL" : 0,
            "DEFENDS" : 0,
            "EXCELLENT" : 0,
            "FIRSTFRAG" : 0,
            "HEADSHOT" : 0,
            "HUMILIATION" : 0,
            "IMPRESSIVE" : 0,
            "MIDAIR" : 0,
            "PERFECT" : 0,
            "PERFORATED" : 0,
            "QUADGOD" : 0,
            "RAMPAGE" : 0,
            "REVENGE" : 0
         },
         "MODEL" : "sarge",
         "NAME" : "garz",
         "PICKUPS" : {
            "AMMO" : 0,
            "ARMOR" : 0,
            "ARMOR_REGEN" : 0,
            "BATTLESUIT" : 0,
            "DOUBLER" : 0,
            "FLIGHT" : 0,
            "GREEN_ARMOR" : 0,
            "GUARD" : 0,
            "HASTE" : 0,
            "HEALTH" : 0,
            "INVIS" : 0,
            "INVULNERABILITY" : 0,
            "KAMIKAZE" : 0,
            "MEDKIT" : 0,
            "MEGA_HEALTH" : 0,
            "OTHER_HOLDABLE" : 0,
            "OTHER_POWERUP" : 0,
            "PORTAL" : 0,
            "QUAD" : 0,
            "RED_ARMOR" : 0,
            "REGEN" : 0,
            "SCOUT" : 0,
            "TELEPORTER" : 0,
            "YELLOW_ARMOR" : 0
         },
         "PLAY_TIME" : 8,
         "QUIT" : 1,
         "RANK" : -1,
         "SCORE" : 0,
         "STEAM_ID" : "76561198170654797",
         "TIED_RANK" : 1,
         "WARMUP" : true,
         "WEAPONS" : {
            "BFG" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            },
            "CHAINGUN" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            },
            "GAUNTLET" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            },
            "GRENADE" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            },
            "HMG" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            },
            "LIGHTNING" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            },
            "MACHINEGUN" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 8
            },
            "NAILGUN" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            },
            "OTHER_WEAPON" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            },
            "PLASMA" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            },
            "PROXMINE" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            },
            "RAILGUN" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            },
            "ROCKET" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            },
            "SHOTGUN" : {
               "D" : 0,
               "DG" : 0,
               "DR" : 0,
               "H" : 0,
               "K" : 0,
               "P" : 0,
               "S" : 0,
               "T" : 0
            }
         },
         "WIN" : 0
      },
      "TYPE" : "PLAYER_STATS"
    }

    let event = PlayerStatsEvent.fromQl(ql['DATA'])

    expect(event.aborted).to.equal(ql['DATA']['ABORTED'])

    expect(event.damage.dealt).to.equal(ql['DATA']['DAMAGE']['DEALT'])
    expect(event.damage.taken).to.equal(ql['DATA']['DAMAGE']['TAKEN'])

    expect(event.deaths).to.equal(ql['DATA']['DEATHS'])
    expect(event.kills).to.equal(ql['DATA']['KILLS'])
    expect(event.lose).to.equal(ql['DATA']['LOSE'])
    expect(event.matchGuid).to.equal(ql['DATA']['MATCH_GUID'])
    expect(event.maxStreak).to.equal(ql['DATA']['MAX_STREAK'])

    expect(event.medals.accuracy).to.equal(ql['DATA']['MEDALS']['ACCURACY'])
    expect(event.medals.assists).to.equal(ql['DATA']['MEDALS']['ASSISTS'])
    expect(event.medals.captures).to.equal(ql['DATA']['MEDALS']['CAPTURES'])
    expect(event.medals.comboKill).to.equal(ql['DATA']['MEDALS']['COMBOKILL'])
    expect(event.medals.defends).to.equal(ql['DATA']['MEDALS']['DEFENDS'])
    expect(event.medals.excellent).to.equal(ql['DATA']['MEDALS']['EXCELLENT'])
    expect(event.medals.firstFrag).to.equal(ql['DATA']['MEDALS']['FIRSTFRAG'])
    expect(event.medals.headshot).to.equal(ql['DATA']['MEDALS']['HEADSHOT'])
    expect(event.medals.humiliation).to.equal(ql['DATA']['MEDALS']['HUMILIATION'])
    expect(event.medals.impressive).to.equal(ql['DATA']['MEDALS']['IMPRESSIVE'])
    expect(event.medals.midAir).to.equal(ql['DATA']['MEDALS']['MIDAIR'])
    expect(event.medals.perfect).to.equal(ql['DATA']['MEDALS']['PERFECT'])
    expect(event.medals.perforated).to.equal(ql['DATA']['MEDALS']['PERFORATED'])
    expect(event.medals.quadGod).to.equal(ql['DATA']['MEDALS']['QUADGOD'])
    expect(event.medals.rampage).to.equal(ql['DATA']['MEDALS']['RAMPAGE'])
    expect(event.medals.revenge).to.equal(ql['DATA']['MEDALS']['REVENGE'])

    expect(event.model).to.equal(ql['DATA']['MODEL'])
    expect(event.name).to.equal(ql['DATA']['NAME'])

    expect(event.pickups.ammo).to.equal(ql['DATA']['PICKUPS']['AMMO'])
    expect(event.pickups.armor).to.equal(ql['DATA']['PICKUPS']['ARMOR'])
    expect(event.pickups.armorRegeneration).to.equal(ql['DATA']['PICKUPS']['ARMOR_REGEN'])
    expect(event.pickups.battlesuit).to.equal(ql['DATA']['PICKUPS']['BATTLESUIT'])
    expect(event.pickups.doubler).to.equal(ql['DATA']['PICKUPS']['DOUBLER'])
    expect(event.pickups.flight).to.equal(ql['DATA']['PICKUPS']['FLIGHT'])
    expect(event.pickups.greenArmor).to.equal(ql['DATA']['PICKUPS']['GREEN_ARMOR'])
    expect(event.pickups.guard).to.equal(ql['DATA']['PICKUPS']['GUARD'])
    expect(event.pickups.haste).to.equal(ql['DATA']['PICKUPS']['HASTE'])
    expect(event.pickups.health).to.equal(ql['DATA']['PICKUPS']['HEALTH'])
    expect(event.pickups.invisibility).to.equal(ql['DATA']['PICKUPS']['INVIS'])
    expect(event.pickups.invulnerability).to.equal(ql['DATA']['PICKUPS']['INVULNERABILITY'])
    expect(event.pickups.kamikaze).to.equal(ql['DATA']['PICKUPS']['KAMIKAZE'])
    expect(event.pickups.medKit).to.equal(ql['DATA']['PICKUPS']['MEDKIT'])
    expect(event.pickups.megaHealth).to.equal(ql['DATA']['PICKUPS']['MEGA_HEALTH'])
    expect(event.pickups.otherHoldable).to.equal(ql['DATA']['PICKUPS']['OTHER_HOLDABLE'])
    expect(event.pickups.otherPowerup).to.equal(ql['DATA']['PICKUPS']['OTHER_POWERUP'])
    expect(event.pickups.portal).to.equal(ql['DATA']['PICKUPS']['PORTAL'])
    expect(event.pickups.quadDamage).to.equal(ql['DATA']['PICKUPS']['QUAD'])
    expect(event.pickups.redArmor).to.equal(ql['DATA']['PICKUPS']['RED_ARMOR'])
    expect(event.pickups.regeneration).to.equal(ql['DATA']['PICKUPS']['REGEN'])
    expect(event.pickups.scout).to.equal(ql['DATA']['PICKUPS']['SCOUT'])
    expect(event.pickups.teleporter).to.equal(ql['DATA']['PICKUPS']['TELEPORTER'])
    expect(event.pickups.yellowArmor).to.equal(ql['DATA']['PICKUPS']['YELLOW_ARMOR'])

    expect(event.playTime).to.equal(ql['DATA']['PLAY_TIME'])
    expect(event.quit).to.equal(ql['DATA']['QUIT'])
    expect(event.rank).to.equal(ql['DATA']['RANK'])
    expect(event.score).to.equal(ql['DATA']['SCORE'])
    expect(event.steamId).to.equal(ql['DATA']['STEAM_ID'])
    expect(event.tiedRank).to.equal(ql['DATA']['TIED_RANK'])
    expect(event.warmup).to.equal(ql['DATA']['WARMUP'])

    expect(event.weapons.bfg.d).to.equal(ql['DATA']['WEAPONS']['BFG']['D'])
    expect(event.weapons.bfg.dg).to.equal(ql['DATA']['WEAPONS']['BFG']['DG'])
    expect(event.weapons.bfg.dr).to.equal(ql['DATA']['WEAPONS']['BFG']['DR'])
    expect(event.weapons.bfg.h).to.equal(ql['DATA']['WEAPONS']['BFG']['H'])
    expect(event.weapons.bfg.k).to.equal(ql['DATA']['WEAPONS']['BFG']['K'])
    expect(event.weapons.bfg.p).to.equal(ql['DATA']['WEAPONS']['BFG']['P'])
    expect(event.weapons.bfg.s).to.equal(ql['DATA']['WEAPONS']['BFG']['S'])
    expect(event.weapons.bfg.t).to.equal(ql['DATA']['WEAPONS']['BFG']['T'])

    expect(event.weapons.chainGun.d).to.equal(ql['DATA']['WEAPONS']['CHAINGUN']['D'])
    expect(event.weapons.chainGun.dg).to.equal(ql['DATA']['WEAPONS']['CHAINGUN']['DG'])
    expect(event.weapons.chainGun.dr).to.equal(ql['DATA']['WEAPONS']['CHAINGUN']['DR'])
    expect(event.weapons.chainGun.h).to.equal(ql['DATA']['WEAPONS']['CHAINGUN']['H'])
    expect(event.weapons.chainGun.k).to.equal(ql['DATA']['WEAPONS']['CHAINGUN']['K'])
    expect(event.weapons.chainGun.p).to.equal(ql['DATA']['WEAPONS']['CHAINGUN']['P'])
    expect(event.weapons.chainGun.s).to.equal(ql['DATA']['WEAPONS']['CHAINGUN']['S'])
    expect(event.weapons.chainGun.t).to.equal(ql['DATA']['WEAPONS']['CHAINGUN']['T'])

    expect(event.weapons.gauntlet.d).to.equal(ql['DATA']['WEAPONS']['GAUNTLET']['D'])
    expect(event.weapons.gauntlet.dg).to.equal(ql['DATA']['WEAPONS']['GAUNTLET']['DG'])
    expect(event.weapons.gauntlet.dr).to.equal(ql['DATA']['WEAPONS']['GAUNTLET']['DR'])
    expect(event.weapons.gauntlet.h).to.equal(ql['DATA']['WEAPONS']['GAUNTLET']['H'])
    expect(event.weapons.gauntlet.k).to.equal(ql['DATA']['WEAPONS']['GAUNTLET']['K'])
    expect(event.weapons.gauntlet.p).to.equal(ql['DATA']['WEAPONS']['GAUNTLET']['P'])
    expect(event.weapons.gauntlet.s).to.equal(ql['DATA']['WEAPONS']['GAUNTLET']['S'])
    expect(event.weapons.gauntlet.t).to.equal(ql['DATA']['WEAPONS']['GAUNTLET']['T'])

    expect(event.weapons.grenadeLauncher.d).to.equal(ql['DATA']['WEAPONS']['GRENADE']['D'])
    expect(event.weapons.grenadeLauncher.dg).to.equal(ql['DATA']['WEAPONS']['GRENADE']['DG'])
    expect(event.weapons.grenadeLauncher.dr).to.equal(ql['DATA']['WEAPONS']['GRENADE']['DR'])
    expect(event.weapons.grenadeLauncher.h).to.equal(ql['DATA']['WEAPONS']['GRENADE']['H'])
    expect(event.weapons.grenadeLauncher.k).to.equal(ql['DATA']['WEAPONS']['GRENADE']['K'])
    expect(event.weapons.grenadeLauncher.p).to.equal(ql['DATA']['WEAPONS']['GRENADE']['P'])
    expect(event.weapons.grenadeLauncher.s).to.equal(ql['DATA']['WEAPONS']['GRENADE']['S'])
    expect(event.weapons.grenadeLauncher.t).to.equal(ql['DATA']['WEAPONS']['GRENADE']['T'])

    expect(event.weapons.heavyMachineGun.d).to.equal(ql['DATA']['WEAPONS']['HMG']['D'])
    expect(event.weapons.heavyMachineGun.dg).to.equal(ql['DATA']['WEAPONS']['HMG']['DG'])
    expect(event.weapons.heavyMachineGun.dr).to.equal(ql['DATA']['WEAPONS']['HMG']['DR'])
    expect(event.weapons.heavyMachineGun.h).to.equal(ql['DATA']['WEAPONS']['HMG']['H'])
    expect(event.weapons.heavyMachineGun.k).to.equal(ql['DATA']['WEAPONS']['HMG']['K'])
    expect(event.weapons.heavyMachineGun.p).to.equal(ql['DATA']['WEAPONS']['HMG']['P'])
    expect(event.weapons.heavyMachineGun.s).to.equal(ql['DATA']['WEAPONS']['HMG']['S'])
    expect(event.weapons.heavyMachineGun.t).to.equal(ql['DATA']['WEAPONS']['HMG']['T'])

    expect(event.weapons.lightningGun.d).to.equal(ql['DATA']['WEAPONS']['LIGHTNING']['D'])
    expect(event.weapons.lightningGun.dg).to.equal(ql['DATA']['WEAPONS']['LIGHTNING']['DG'])
    expect(event.weapons.lightningGun.dr).to.equal(ql['DATA']['WEAPONS']['LIGHTNING']['DR'])
    expect(event.weapons.lightningGun.h).to.equal(ql['DATA']['WEAPONS']['LIGHTNING']['H'])
    expect(event.weapons.lightningGun.k).to.equal(ql['DATA']['WEAPONS']['LIGHTNING']['K'])
    expect(event.weapons.lightningGun.p).to.equal(ql['DATA']['WEAPONS']['LIGHTNING']['P'])
    expect(event.weapons.lightningGun.s).to.equal(ql['DATA']['WEAPONS']['LIGHTNING']['S'])
    expect(event.weapons.lightningGun.t).to.equal(ql['DATA']['WEAPONS']['LIGHTNING']['T'])

    expect(event.weapons.machineGun.d).to.equal(ql['DATA']['WEAPONS']['MACHINEGUN']['D'])
    expect(event.weapons.machineGun.dg).to.equal(ql['DATA']['WEAPONS']['MACHINEGUN']['DG'])
    expect(event.weapons.machineGun.dr).to.equal(ql['DATA']['WEAPONS']['MACHINEGUN']['DR'])
    expect(event.weapons.machineGun.h).to.equal(ql['DATA']['WEAPONS']['MACHINEGUN']['H'])
    expect(event.weapons.machineGun.k).to.equal(ql['DATA']['WEAPONS']['MACHINEGUN']['K'])
    expect(event.weapons.machineGun.p).to.equal(ql['DATA']['WEAPONS']['MACHINEGUN']['P'])
    expect(event.weapons.machineGun.s).to.equal(ql['DATA']['WEAPONS']['MACHINEGUN']['S'])
    expect(event.weapons.machineGun.t).to.equal(ql['DATA']['WEAPONS']['MACHINEGUN']['T'])

    expect(event.weapons.nailGun.d).to.equal(ql['DATA']['WEAPONS']['NAILGUN']['D'])
    expect(event.weapons.nailGun.dg).to.equal(ql['DATA']['WEAPONS']['NAILGUN']['DG'])
    expect(event.weapons.nailGun.dr).to.equal(ql['DATA']['WEAPONS']['NAILGUN']['DR'])
    expect(event.weapons.nailGun.h).to.equal(ql['DATA']['WEAPONS']['NAILGUN']['H'])
    expect(event.weapons.nailGun.k).to.equal(ql['DATA']['WEAPONS']['NAILGUN']['K'])
    expect(event.weapons.nailGun.p).to.equal(ql['DATA']['WEAPONS']['NAILGUN']['P'])
    expect(event.weapons.nailGun.s).to.equal(ql['DATA']['WEAPONS']['NAILGUN']['S'])
    expect(event.weapons.nailGun.t).to.equal(ql['DATA']['WEAPONS']['NAILGUN']['T'])

    expect(event.weapons.otherWeapon.d).to.equal(ql['DATA']['WEAPONS']['OTHER_WEAPON']['D'])
    expect(event.weapons.otherWeapon.dg).to.equal(ql['DATA']['WEAPONS']['OTHER_WEAPON']['DG'])
    expect(event.weapons.otherWeapon.dr).to.equal(ql['DATA']['WEAPONS']['OTHER_WEAPON']['DR'])
    expect(event.weapons.otherWeapon.h).to.equal(ql['DATA']['WEAPONS']['OTHER_WEAPON']['H'])
    expect(event.weapons.otherWeapon.k).to.equal(ql['DATA']['WEAPONS']['OTHER_WEAPON']['K'])
    expect(event.weapons.otherWeapon.p).to.equal(ql['DATA']['WEAPONS']['OTHER_WEAPON']['P'])
    expect(event.weapons.otherWeapon.s).to.equal(ql['DATA']['WEAPONS']['OTHER_WEAPON']['S'])
    expect(event.weapons.otherWeapon.t).to.equal(ql['DATA']['WEAPONS']['OTHER_WEAPON']['T'])

    expect(event.weapons.plasmaGun.d).to.equal(ql['DATA']['WEAPONS']['PLASMA']['D'])
    expect(event.weapons.plasmaGun.dg).to.equal(ql['DATA']['WEAPONS']['PLASMA']['DG'])
    expect(event.weapons.plasmaGun.dr).to.equal(ql['DATA']['WEAPONS']['PLASMA']['DR'])
    expect(event.weapons.plasmaGun.h).to.equal(ql['DATA']['WEAPONS']['PLASMA']['H'])
    expect(event.weapons.plasmaGun.k).to.equal(ql['DATA']['WEAPONS']['PLASMA']['K'])
    expect(event.weapons.plasmaGun.p).to.equal(ql['DATA']['WEAPONS']['PLASMA']['P'])
    expect(event.weapons.plasmaGun.s).to.equal(ql['DATA']['WEAPONS']['PLASMA']['S'])
    expect(event.weapons.plasmaGun.t).to.equal(ql['DATA']['WEAPONS']['PLASMA']['T'])

    expect(event.weapons.proximityMine.d).to.equal(ql['DATA']['WEAPONS']['PROXMINE']['D'])
    expect(event.weapons.proximityMine.dg).to.equal(ql['DATA']['WEAPONS']['PROXMINE']['DG'])
    expect(event.weapons.proximityMine.dr).to.equal(ql['DATA']['WEAPONS']['PROXMINE']['DR'])
    expect(event.weapons.proximityMine.h).to.equal(ql['DATA']['WEAPONS']['PROXMINE']['H'])
    expect(event.weapons.proximityMine.k).to.equal(ql['DATA']['WEAPONS']['PROXMINE']['K'])
    expect(event.weapons.proximityMine.p).to.equal(ql['DATA']['WEAPONS']['PROXMINE']['P'])
    expect(event.weapons.proximityMine.s).to.equal(ql['DATA']['WEAPONS']['PROXMINE']['S'])
    expect(event.weapons.proximityMine.t).to.equal(ql['DATA']['WEAPONS']['PROXMINE']['T'])

    expect(event.weapons.railGun.d).to.equal(ql['DATA']['WEAPONS']['RAILGUN']['D'])
    expect(event.weapons.railGun.dg).to.equal(ql['DATA']['WEAPONS']['RAILGUN']['DG'])
    expect(event.weapons.railGun.dr).to.equal(ql['DATA']['WEAPONS']['RAILGUN']['DR'])
    expect(event.weapons.railGun.h).to.equal(ql['DATA']['WEAPONS']['RAILGUN']['H'])
    expect(event.weapons.railGun.k).to.equal(ql['DATA']['WEAPONS']['RAILGUN']['K'])
    expect(event.weapons.railGun.p).to.equal(ql['DATA']['WEAPONS']['RAILGUN']['P'])
    expect(event.weapons.railGun.s).to.equal(ql['DATA']['WEAPONS']['RAILGUN']['S'])
    expect(event.weapons.railGun.t).to.equal(ql['DATA']['WEAPONS']['RAILGUN']['T'])

    expect(event.weapons.rocketLauncher.d).to.equal(ql['DATA']['WEAPONS']['ROCKET']['D'])
    expect(event.weapons.rocketLauncher.dg).to.equal(ql['DATA']['WEAPONS']['ROCKET']['DG'])
    expect(event.weapons.rocketLauncher.dr).to.equal(ql['DATA']['WEAPONS']['ROCKET']['DR'])
    expect(event.weapons.rocketLauncher.h).to.equal(ql['DATA']['WEAPONS']['ROCKET']['H'])
    expect(event.weapons.rocketLauncher.k).to.equal(ql['DATA']['WEAPONS']['ROCKET']['K'])
    expect(event.weapons.rocketLauncher.p).to.equal(ql['DATA']['WEAPONS']['ROCKET']['P'])
    expect(event.weapons.rocketLauncher.s).to.equal(ql['DATA']['WEAPONS']['ROCKET']['S'])
    expect(event.weapons.rocketLauncher.t).to.equal(ql['DATA']['WEAPONS']['ROCKET']['T'])

    expect(event.weapons.shotGun.d).to.equal(ql['DATA']['WEAPONS']['SHOTGUN']['D'])
    expect(event.weapons.shotGun.dg).to.equal(ql['DATA']['WEAPONS']['SHOTGUN']['DG'])
    expect(event.weapons.shotGun.dr).to.equal(ql['DATA']['WEAPONS']['SHOTGUN']['DR'])
    expect(event.weapons.shotGun.h).to.equal(ql['DATA']['WEAPONS']['SHOTGUN']['H'])
    expect(event.weapons.shotGun.k).to.equal(ql['DATA']['WEAPONS']['SHOTGUN']['K'])
    expect(event.weapons.shotGun.p).to.equal(ql['DATA']['WEAPONS']['SHOTGUN']['P'])
    expect(event.weapons.shotGun.s).to.equal(ql['DATA']['WEAPONS']['SHOTGUN']['S'])
    expect(event.weapons.shotGun.t).to.equal(ql['DATA']['WEAPONS']['SHOTGUN']['T'])

    expect(event.win).to.equal(ql['DATA']['WIN'])
  })
})
