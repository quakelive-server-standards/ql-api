import { expect } from 'chai'
import 'mocha'
import PlayerSwitchTeamEvent from '../../src/stats/PlayerSwitchTeamEvent'
import PlayerSwitchEvent from '../../src/stats/PlayerSwitchTeamEvent'

describe('stats/PlayerStatsEvent', function() {
  it('should create an object out of the QL event', function() {
    let ql = {
      "DATA" : {
         "KILLER" : {
            "NAME" : "garz",
            "OLD_TEAM" : "FREE",
            "STEAM_ID" : "76561198170654797",
            "TEAM" : "SPECTATOR"
         },
         "MATCH_GUID" : "1a8bd0a8-f819-4245-b873-4235ffa1607e",
         "TIME" : 2222,
         "WARMUP" : true
      },
      "TYPE" : "PLAYER_SWITCHTEAM"
    }

    let event = PlayerSwitchTeamEvent.fromQl(ql['DATA'])

    expect(event.name).to.equal(ql['DATA']['KILLER']['NAME'])
    expect(event.oldTeam).to.equal(ql['DATA']['KILLER']['OLD_TEAM'])
    expect(event.steamId).to.equal(ql['DATA']['KILLER']['STEAM_ID'])
    expect(event.newTeam).to.equal(ql['DATA']['KILLER']['TEAM'])

    expect(event.matchGuid).to.equal(ql['DATA']['MATCH_GUID'])
    expect(event.time).to.equal(ql['DATA']['TIME'])
    expect(event.warmup).to.equal(ql['DATA']['WARMUP'])
  })
})

