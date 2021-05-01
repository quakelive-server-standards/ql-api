import { expect } from 'chai'
import 'mocha'
import MatchStartedEvent from '../../src/stats/MatchStartedEvent'

describe('stats/MatchStartedEvent', function () {
  it('should create an object out of the QL event', function () {
    let ql = {
      "DATA": {
        "CAPTURE_LIMIT": 8,
        "FACTORY": "duel",
        "FACTORY_TITLE": "Duel",
        "FRAG_LIMIT": 0,
        "GAME_TYPE": "DUEL",
        "INFECTED": 0,
        "INSTAGIB": 0,
        "MAP": "toxicity",
        "MATCH_GUID": "66fe025a-63ff-4852-96bd-9102411e9fb0",
        "MERCY_LIMIT": 0,
        "PLAYERS": [
          {
            "NAME": "Play_ua",
            "STEAM_ID": "76561198157458366",
            "TEAM": 0
          },
          {
            "NAME": "goromir",
            "STEAM_ID": "76561198145690430",
            "TEAM": 0
          }
        ],
        "QUADHOG": 0,
        "ROUND_LIMIT": 10,
        "SCORE_LIMIT": 150,
        "SERVER_TITLE": ".de #topdog.io Ranked Duel #4",
        "TIME_LIMIT": 10,
        "TRAINING": 0
      },
      "TYPE": "MATCH_STARTED"
    }

    let event = MatchStartedEvent.fromQl(ql['DATA'])

    expect(event.captureLimit).to.equal(ql['DATA']['CAPTURE_LIMIT'])
    expect(event.factory).to.equal(ql['DATA']['FACTORY'])
    expect(event.factoryTitle).to.equal(ql['DATA']['FACTORY_TITLE'])
    expect(event.fragLimit).to.equal(ql['DATA']['FRAG_LIMIT'])
    expect(event.gameType).to.equal(ql['DATA']['GAME_TYPE'])
    expect(event.infected).to.equal(ql['DATA']['INFECTED'])
    expect(event.instagib).to.equal(ql['DATA']['INSTAGIB'])
    expect(event.map).to.equal(ql['DATA']['MAP'])
    expect(event.matchGuid).to.equal(ql['DATA']['MATCH_GUID'])
    expect(event.mercyLimit).to.equal(ql['DATA']['MERCY_LIMIT'])

    expect(event.players[0].name).to.equal(ql['DATA']['PLAYERS'][0]['NAME'])
    expect(event.players[0].steamId).to.equal(ql['DATA']['PLAYERS'][0]['STEAM_ID'])
    expect(event.players[0].team).to.equal(ql['DATA']['PLAYERS'][0]['TEAM'])
    expect(event.players[1].name).to.equal(ql['DATA']['PLAYERS'][1]['NAME'])
    expect(event.players[1].steamId).to.equal(ql['DATA']['PLAYERS'][1]['STEAM_ID'])
    expect(event.players[1].team).to.equal(ql['DATA']['PLAYERS'][1]['TEAM'])

    expect(event.quadHog).to.equal(ql['DATA']['QUADHOG'])
    expect(event.roundLimit).to.equal(ql['DATA']['ROUND_LIMIT'])
    expect(event.scoreLimit).to.equal(ql['DATA']['SCORE_LIMIT'])
    expect(event.serverTitle).to.equal(ql['DATA']['SERVER_TITLE'])
    expect(event.timeLimit).to.equal(ql['DATA']['TIME_LIMIT'])
    expect(event.training).to.equal(ql['DATA']['TRAINING'])
  })
})