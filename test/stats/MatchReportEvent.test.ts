import { expect } from 'chai'
import 'mocha'
import MatchReportEvent from '../../src/stats/MatchReportEvent'
import GameType from '../../src/stats/types/GameType'

describe('stats/MatchReportEvent', function() {
  it('should create an object out of the QL event', function() {
    let ql = {
      "DATA" : {
         "ABORTED" : true,
         "CAPTURE_LIMIT" : 8,
         "EXIT_MSG" : "Shutdown",
         "FACTORY" : "stdduel",
         "FACTORY_TITLE" : "Standard Duel",
         "FIRST_SCORER" : "none",
         "FRAG_LIMIT" : 0,
         "GAME_LENGTH" : 727,
         "GAME_TYPE" : "DUEL",
         "INFECTED" : 0,
         "INSTAGIB" : 0,
         "LAST_LEAD_CHANGE_TIME" : 6350,
         "LAST_SCORER" : "none",
         "LAST_TEAMSCORER" : "none",
         "MAP" : "kaos",
         "MATCH_GUID" : "d23d30e4-2137-4a33-b085-9db594e67d5a",
         "MERCY_LIMIT" : 0,
         "QUADHOG" : 0,
         "RESTARTED" : 0,
         "ROUND_LIMIT" : 10,
         "SCORE_LIMIT" : 150,
         "SERVER_TITLE" : "QL Fight Club - Fresh Maps",
         "TIME_LIMIT" : 10,
         "TRAINING" : 0,
         "TSCORE0" : 0,
         "TSCORE1" : 0
      },
      "TYPE" : "MATCH_REPORT"
    }

    let event = MatchReportEvent.fromQl(ql['DATA'])

    expect(event.aborted).to.equal(ql['DATA']['ABORTED'])
    expect(event.captureLimit).to.equal(ql['DATA']['CAPTURE_LIMIT'])
    expect(event.exitMsg).to.equal(ql['DATA']['EXIT_MSG'])
    expect(event.factory).to.equal(ql['DATA']['FACTORY'])
    expect(event.factoryTitle).to.equal(ql['DATA']['FACTORY_TITLE'])
    expect(event.firstScorer).to.equal(ql['DATA']['FIRST_SCORER'])
    expect(event.fragLimit).to.equal(ql['DATA']['FRAG_LIMIT'])
    expect(event.gameLength).to.equal(ql['DATA']['GAME_LENGTH'])
    expect(event.gameType).to.equal(GameType[ql['DATA']['GAME_TYPE']])
    expect(event.infected).to.equal(ql['DATA']['INFECTED'])
    expect(event.instagib).to.equal(ql['DATA']['INSTAGIB'])
    expect(event.lastLeadChangeTime).to.equal(ql['DATA']['LAST_LEAD_CHANGE_TIME'])
    expect(event.lastScorer).to.equal(ql['DATA']['LAST_SCORER'])
    expect(event.lastTeamScorer).to.equal(ql['DATA']['LAST_TEAMSCORER'])
    expect(event.map).to.equal(ql['DATA']['MAP'])
    expect(event.matchGuid).to.equal(ql['DATA']['MATCH_GUID'])
    expect(event.mercyLimit).to.equal(ql['DATA']['MERCY_LIMIT'])
    expect(event.quadHog).to.equal(ql['DATA']['QUADHOG'])
    expect(event.restarted).to.equal(ql['DATA']['RESTARTED'])
    expect(event.roundLimit).to.equal(ql['DATA']['ROUND_LIMIT'])
    expect(event.scoreLimit).to.equal(ql['DATA']['SCORE_LIMIT'])
    expect(event.serverTitle).to.equal(ql['DATA']['SERVER_TITLE'])
    expect(event.timeLimit).to.equal(ql['DATA']['TIME_LIMIT'])
    expect(event.training).to.equal(ql['DATA']['TRAINING'])
    expect(event.teamScore0).to.equal(ql['DATA']['TSCORE0'])
    expect(event.teamScore1).to.equal(ql['DATA']['TSCORE1'])
  })
})
