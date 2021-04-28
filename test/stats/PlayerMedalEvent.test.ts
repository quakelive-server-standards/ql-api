import { expect } from 'chai'
import 'mocha'
import PlayerMedalEvent from '../../src/stats/PlayerMedalEvent'

describe('stats/PlayerMedalEvent', function() {
  it('should create an object out of the QL event', function() {
    let ql = {
      "DATA" : {
         "MATCH_GUID" : "0c150d44-ba0b-48b4-bf5d-9d689ee5329a",
         "MEDAL" : "FIRSTFRAG",
         "NAME" : "drwlf",
         "STEAM_ID" : "76561199035617194",
         "TIME" : 23,
         "TOTAL" : 1,
         "WARMUP" : false
      },
      "TYPE" : "PLAYER_MEDAL"
    }

    let event = PlayerMedalEvent.fromQl(ql['DATA'])

    expect(event.matchGuid).to.equal(ql['DATA']['MATCH_GUID'])
    expect(event.medal).to.equal(ql['DATA']['MEDAL'])
    expect(event.name).to.equal(ql['DATA']['NAME'])
    expect(event.steamId).to.equal(ql['DATA']['STEAM_ID'])
    expect(event.time).to.equal(ql['DATA']['TIME'])
    expect(event.total).to.equal(ql['DATA']['TOTAL'])
    expect(event.warmup).to.equal(ql['DATA']['WARMUP'])
  })
})
