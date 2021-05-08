import { expect } from 'chai'
import 'mocha'
import PlayerKillEvent from '../../src/stats/PlayerKillEvent'

describe('stats/PlayerKillEvent', function() {
  it('should create an object out of the QL event', function() {
     let ql = {
      "DATA" : {
         "KILLER" : {
            "AIRBORNE" : false,
            "AMMO" : 0,
            "ARMOR" : 0,
            "BOT" : false,
            "BOT_SKILL" : null,
            "HEALTH" : 0,
            "HOLDABLE" : null,
            "NAME" : "garz",
            "POSITION" : {
               "X" : 314.9967346191406,
               "Y" : 427.2147827148438,
               "Z" : 264.2636413574219
            },
            "POWERUPS" : null,
            "SPEED" : 0,
            "STEAM_ID" : "76561198170654797",
            "SUBMERGED" : false,
            "TEAM" : 0,
            "VIEW" : {
               "X" : 20.01708984375,
               "Y" : -23.70849609375,
               "Z" : 0
            },
            "WEAPON" : "OTHER_WEAPON"
         },
         "MATCH_GUID" : "0c150d44-ba0b-48b4-bf5d-9d689ee5329a",
         "MOD" : "SWITCHTEAM",
         "OTHER_TEAM_ALIVE" : null,
         "OTHER_TEAM_DEAD" : null,
         "ROUND" : null,
         "SUICIDE" : true,
         "TEAMKILL" : false,
         "TEAM_ALIVE" : null,
         "TEAM_DEAD" : null,
         "TIME" : 108,
         "VICTIM" : {
            "AIRBORNE" : false,
            "AMMO" : 23,
            "ARMOR" : 0,
            "BOT" : false,
            "BOT_SKILL" : null,
            "HEALTH" : 100,
            "HOLDABLE" : null,
            "NAME" : "garz",
            "POSITION" : {
               "X" : 314.9967346191406,
               "Y" : 427.2147827148438,
               "Z" : 264.2636413574219
            },
            "POWERUPS" : null,
            "SPEED" : 0,
            "STEAM_ID" : "76561198170654797",
            "STREAK" : 0,
            "SUBMERGED" : false,
            "TEAM" : 0,
            "VIEW" : {
               "X" : 20.01708984375,
               "Y" : -23.70849609375,
               "Z" : 0
            },
            "WEAPON" : "ROCKET"
         },
         "WARMUP" : true
      },
      "TYPE" : "PLAYER_KILL"
    }

    let event = PlayerKillEvent.fromQl(ql['DATA'])

    expect(event.killer.airborne).to.equal(ql['DATA']['KILLER']['AIRBORNE'])
    expect(event.killer.ammo).to.equal(ql['DATA']['KILLER']['AMMO'])
    expect(event.killer.armor).to.equal(ql['DATA']['KILLER']['ARMOR'])
    expect(event.killer.bot).to.equal(ql['DATA']['KILLER']['BOT'])
    expect(event.killer.botSkill).to.equal(ql['DATA']['KILLER']['BOT_SKILL'])
    expect(event.killer.health).to.equal(ql['DATA']['KILLER']['HEALTH'])
    expect(event.killer.holdable).to.equal(ql['DATA']['KILLER']['HOLDABLE'])
    expect(event.killer.name).to.equal(ql['DATA']['KILLER']['NAME'])

    expect(event.killer.position.x).to.equal(ql['DATA']['KILLER']['POSITION']['X'])
    expect(event.killer.position.y).to.equal(ql['DATA']['KILLER']['POSITION']['Y'])
    expect(event.killer.position.z).to.equal(ql['DATA']['KILLER']['POSITION']['Z'])

    expect(event.killer.powerUps).to.deep.equal(ql['DATA']['KILLER']['POWERUPS'])
    expect(event.killer.speed).to.equal(ql['DATA']['KILLER']['SPEED'])
    expect(event.killer.steamId).to.equal(ql['DATA']['KILLER']['STEAM_ID'])
    expect(event.killer.submerged).to.equal(ql['DATA']['KILLER']['SUBMERGED'])
    expect(event.killer.team).to.equal('Free')

    expect(event.killer.view.x).to.equal(ql['DATA']['KILLER']['VIEW']['X'])
    expect(event.killer.view.y).to.equal(ql['DATA']['KILLER']['VIEW']['Y'])
    expect(event.killer.view.z).to.equal(ql['DATA']['KILLER']['VIEW']['Z'])

    expect(event.killer.weapon).to.equal('Other weapon')

    expect(event.matchGuid).to.equal(ql['DATA']['MATCH_GUID'])
    expect(event.mod).to.equal(ql['DATA']['MOD'])
    expect(event.otherTeamAlive).to.equal(ql['DATA']['OTHER_TEAM_ALIVE'])
    expect(event.otherTeamDead).to.equal(ql['DATA']['OTHER_TEAM_DEAD'])
    expect(event.round).to.equal(ql['DATA']['ROUND'])
    expect(event.suicide).to.equal(ql['DATA']['SUICIDE'])
    expect(event.teamKill).to.equal(ql['DATA']['TEAMKILL'])
    expect(event.teamAlive).to.equal(ql['DATA']['TEAM_ALIVE'])
    expect(event.teamDead).to.equal(ql['DATA']['TEAM_DEAD'])
    expect(event.time).to.equal(ql['DATA']['TIME'])

    expect(event.victim.airborne).to.equal(ql['DATA']['VICTIM']['AIRBORNE'])
    expect(event.victim.ammo).to.equal(ql['DATA']['VICTIM']['AMMO'])
    expect(event.victim.armor).to.equal(ql['DATA']['VICTIM']['ARMOR'])
    expect(event.victim.bot).to.equal(ql['DATA']['VICTIM']['BOT'])
    expect(event.victim.botSkill).to.equal(ql['DATA']['VICTIM']['BOT_SKILL'])
    expect(event.victim.health).to.equal(ql['DATA']['VICTIM']['HEALTH'])
    expect(event.victim.holdable).to.equal(ql['DATA']['VICTIM']['HOLDABLE'])
    expect(event.victim.name).to.equal(ql['DATA']['VICTIM']['NAME'])

    expect(event.victim.position.x).to.equal(ql['DATA']['VICTIM']['POSITION']['X'])
    expect(event.victim.position.y).to.equal(ql['DATA']['VICTIM']['POSITION']['Y'])
    expect(event.victim.position.z).to.equal(ql['DATA']['VICTIM']['POSITION']['Z'])

    expect(event.victim.powerUps).to.deep.equal(ql['DATA']['VICTIM']['POWERUPS'])
    expect(event.victim.speed).to.equal(ql['DATA']['VICTIM']['SPEED'])
    expect(event.victim.steamId).to.equal(ql['DATA']['VICTIM']['STEAM_ID'])
    expect(event.victim.submerged).to.equal(ql['DATA']['VICTIM']['SUBMERGED'])
    expect(event.victim.team).to.equal('Free')

    expect(event.victim.view.x).to.equal(ql['DATA']['VICTIM']['VIEW']['X'])
    expect(event.victim.view.y).to.equal(ql['DATA']['VICTIM']['VIEW']['Y'])
    expect(event.victim.view.z).to.equal(ql['DATA']['VICTIM']['VIEW']['Z'])

    expect(event.victim.weapon).to.equal('Rocket Launcher')

    expect(event.warmup).to.equal(ql['DATA']['WARMUP'])
  })
})
