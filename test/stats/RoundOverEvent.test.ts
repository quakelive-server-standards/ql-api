import { expect } from 'chai'
import 'mocha'
import RoundOverEvent from '../../src/stats/RoundOverEvent'

describe('stats/RoundOverEvent', function () {
  it('should create an object out of the QL event', function () {
    let ql = {
      "DATA": {
        "MATCH_GUID": "dad7e64b-c397-4984-b343-6943bdc070d0",
        "ROUND": 2,
        "TEAM_WON": "BLUE",
        "TIME": 56,
        "WARMUP": false
      },
      "TYPE": "ROUND_OVER"
    }

    let event = RoundOverEvent.fromQl(ql['DATA'])

    expect(event.matchGuid).to.equal(ql['DATA']['MATCH_GUID'])
    expect(event.round).to.equal(ql['DATA']['ROUND'])
    expect(event.teamWon).to.equal(ql['DATA']['TEAM_WON'])
    expect(event.time).to.equal(ql['DATA']['TIME'])
    expect(event.warmup).to.equal(ql['DATA']['WARMUP'])
  })
})
