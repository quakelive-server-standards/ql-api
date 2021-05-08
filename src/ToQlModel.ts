import { Cvars, Factory, Map, Match, Player, Server } from 'ql-model'
import { MatchReportEvent, MatchStartedEvent, PlayerConnectEvent, PlayerDeathEvent, PlayerDisconnectEvent, PlayerKillEvent, PlayerMedalEvent, PlayerStatsEvent, PlayerSwitchTeamEvent, RoundOverEvent } from "."
import GameType from './stats/types/GameType'

export default abstract class ToQlModel {

  integrate(server: Server, event: MatchReportEvent | MatchStartedEvent | PlayerConnectEvent | PlayerDeathEvent | PlayerDisconnectEvent | PlayerKillEvent | PlayerMedalEvent | PlayerStatsEvent | PlayerSwitchTeamEvent | RoundOverEvent) {
    if (event instanceof MatchReportEvent) {
      let match = this.getMatch(event.matchGuid)

      if (match) {
        let factory = this.getFactory(event.factory, event.factoryTitle, event.gameType)
        let firstScorer = this.getPlayerByName(event.firstScorer)
        let lastScorer = this.getPlayerByName(event.lastScorer)
        let lastTeamScorer = this.getPlayerByName(event.lastTeamScorer)
        let map = this.getMap(event.map)
  
        match.factoryId = factory.id
        match.firstScorerId = firstScorer.id
        match.lastScorerId = lastScorer.id
        match.lastTeamScorerId = lastTeamScorer.id
        match.mapId = map.id
        match.serverId = server.id
        server.title = event.serverTitle
  
        // event.aborted
        match.cvars.capturelimit = event.captureLimit
        match.exitMessage = event.exitMsg
        match.cvars.fraglimit = event.fragLimit
        match.length = event.gameLength
        match.cvars.g_instagib = event.instagib
        match.lastLeadChangeTime = event.lastLeadChangeTime
        match.guid = event.matchGuid
        match.cvars.mercylimit = event.mercyLimit
        match.cvars.g_quadHog = event.quadHog
        // event.restarted
        match.cvars.roundlimit = event.roundLimit
        match.cvars.scorelimit = event.scoreLimit
        match.cvars.timelimit = event.timeLimit
        match.cvars.g_training = event.training
        match.score1 = event.teamScore0
        match.score2 = event.teamScore1
      }
    }
    else if (event instanceof MatchStartedEvent) {
      let factory = this.getFactory(event.factory, event.factoryTitle, event.gameType)
      let map = this.getMap(event.map)

      let match = new Match

      match.cvars = new Cvars
      match.factoryId = factory.id
      match.mapId = map.id
      match.serverId = server.id
      server.title = event.serverTitle

      match.cvars.capturelimit = event.captureLimit
      match.cvars.fraglimit = event.fragLimit
      match.cvars.g_instagib = event.instagib
      match.guid = event.matchGuid
      match.cvars.mercylimit = event.mercyLimit
      match.cvars.g_quadHog = event.quadHog
      match.cvars.roundlimit = event.roundLimit
      match.cvars.scorelimit = event.scoreLimit
      match.cvars.timelimit = event.timeLimit
      match.cvars.g_training = event.training
    }
    else if (event instanceof PlayerConnectEvent) {
      
    }
    else if (event instanceof PlayerDeathEvent) {

    }
    else if (event instanceof PlayerDisconnectEvent) {

    }
    else if (event instanceof PlayerKillEvent) {

    }
    else if (event instanceof PlayerMedalEvent) {

    }
    else if (event instanceof PlayerStatsEvent) {

    }
    else if (event instanceof PlayerSwitchTeamEvent) {

    }
    else if (event instanceof RoundOverEvent) {

    }
  }
  
  abstract getFactory(factoryName: string, factoryTitle: string, gameType: GameType): Factory
  abstract getMatch(matchGuid: string): Match
  abstract getMap(mapName: string): Map
  abstract getPlayerByName(playerName: string): Player
}