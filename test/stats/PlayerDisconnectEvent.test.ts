import { expect } from 'chai'
import 'mocha'
import PlayerDisconnectEvent from '../../src/stats/PlayerDisconnectEvent'

describe('stats/PlayerDisconnectEvent', function() {
  it('should create an object out of the QL event', function() {
    let ql = {
      "DATA" : {
         "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
         "NAME" : "akoya",
         "STEAM_ID" : "76561198073744464",
         "TIME" : 8536,
         "WARMUP" : true
      },
      "TYPE" : "PLAYER_DISCONNECT"
    }

    let event = PlayerDisconnectEvent.fromQl(ql['DATA'])

    expect(event.matchGuid).to.equal(ql['DATA']['MATCH_GUID'])
    expect(event.name).to.equal(ql['DATA']['NAME'])
    expect(event.steamId).to.equal(ql['DATA']['STEAM_ID'])
    expect(event.time).to.equal(ql['DATA']['TIME'])
    expect(event.warmup).to.equal(ql['DATA']['WARMUP'])
  })
})
