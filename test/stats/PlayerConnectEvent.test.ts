import { expect } from 'chai'
import 'mocha'
import PlayerConnectEvent from '../../src/stats/PlayerConnectEvent'

describe('stats/PlayerConnectEvent', function() {
  it('should create an object out of the QL event', function() {
    let ql = {
      "DATA" : {
         "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
         "NAME" : "garz",
         "STEAM_ID" : "76561198170654797",
         "TIME" : 8367,
         "WARMUP" : true
      },
      "TYPE" : "PLAYER_CONNECT"
    }

    let event = PlayerConnectEvent.fromQl(ql['DATA'])

    expect(event.matchGuid).to.equal(ql['DATA']['MATCH_GUID'])
    expect(event.name).to.equal(ql['DATA']['NAME'])
    expect(event.steamId).to.equal(ql['DATA']['STEAM_ID'])
    expect(event.time).to.equal(ql['DATA']['TIME'])
    expect(event.warmup).to.equal(ql['DATA']['WARMUP'])
  })
})
