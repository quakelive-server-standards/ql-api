import { Cvars, Factory, Frag, FragParticipant, Map, Match, Player, Round, Server } from 'ql-model'
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
      /**
       * Only handle death events that were not caused by another player because those are already
       * handled in the PlayerKillEvent section
       */
      if (event.killer == null) {
        let match = this.getMatch(event.matchGuid)
        let round = this.getRound(event.round)
        let victim = this.getPlayer(event.victim.steamId, event.victim.name)

        let frag = new Frag

        frag.killer = null
        frag.matchId = match.id
        frag.roundId = round ? round.id : null
        frag.victim = new FragParticipant
        frag.victim.playerId = victim.id

        frag.otherTeamAlive = event.otherTeamAlive
        frag.otherTeamDead = event.otherTeamDead
        frag.suicide = event.suicide
        frag.teamkill = event.teamKill
        frag.teamAlive = event.teamAlive
        frag.teamDead = event.teamDead
        frag.time = event.time
        // event.warmup
        frag.victim.airborne = event.victim.airborne
        frag.victim.ammo = event.victim.ammo
        frag.victim.armor = event.victim.armor
        frag.victim.bot = event.victim.bot
        frag.victim.botSkill = event.victim.botSkill
        frag.victim.health = event.victim.health
        frag.victim.holdable = event.victim.holdable
        frag.victim.position = {
          x: event.victim.position.x,
          y: event.victim.position.y,
          z: event.victim.position.z
        }
        frag.victim.powerUps = event.victim.powerUps
        frag.victim.speed = event.victim.speed
        // event.victim.submerged
        frag.victim.team = event.victim.team
        frag.victim.view = {
          x: event.victim.view.x,
          y: event.victim.view.y,
          z: event.victim.view.z
        }
        frag.victim.weapon = event.victim.weapon
      }
    }
    else if (event instanceof PlayerDisconnectEvent) {

    }
    else if (event instanceof PlayerKillEvent) {
      let killer = this.getPlayer(event.killer.steamId, event.killer.name)
      let match = this.getMatch(event.matchGuid)
      let round = this.getRound(event.round)
      let victim = this.getPlayer(event.victim.steamId, event.victim.name)

      let frag = new Frag

      frag.killer = new FragParticipant
      frag.killer.playerId = killer.id
      frag.matchId = match.id
      frag.roundId = round ? round.id : null
      frag.victim = new FragParticipant
      frag.victim.playerId = victim.id

      frag.otherTeamAlive = event.otherTeamAlive
      frag.otherTeamDead = event.otherTeamDead
      frag.suicide = event.suicide
      frag.teamkill = event.teamKill
      frag.teamAlive = event.teamAlive
      frag.teamDead = event.teamDead
      frag.time = event.time
      // event.warmup

      frag.killer.airborne = event.killer.airborne
      frag.killer.ammo = event.killer.ammo
      frag.killer.armor = event.killer.armor
      frag.killer.bot = event.killer.bot
      frag.killer.botSkill = event.killer.botSkill
      frag.killer.health = event.killer.health
      frag.killer.holdable = event.killer.holdable
      frag.killer.position = {
        x: event.killer.position.x,
        y: event.killer.position.y,
        z: event.killer.position.z
      }
      frag.killer.powerUps = event.killer.powerUps
      frag.killer.speed = event.killer.speed
      // event.killer.submerged
      frag.killer.team = event.killer.team
      frag.killer.view = {
        x: event.killer.view.x,
        y: event.killer.view.y,
        z: event.killer.view.z
      }
      frag.killer.weapon = event.killer.weapon

      frag.victim.airborne = event.victim.airborne
      frag.victim.ammo = event.victim.ammo
      frag.victim.armor = event.victim.armor
      frag.victim.bot = event.victim.bot
      frag.victim.botSkill = event.victim.botSkill
      frag.victim.health = event.victim.health
      frag.victim.holdable = event.victim.holdable
      frag.victim.position = {
        x: event.victim.position.x,
        y: event.victim.position.y,
        z: event.victim.position.z
      }
      frag.victim.powerUps = event.victim.powerUps
      frag.victim.speed = event.victim.speed
      // event.victim.submerged
      frag.victim.team = event.victim.team
      frag.victim.view = {
        x: event.victim.view.x,
        y: event.victim.view.y,
        z: event.victim.view.z
      }
      frag.victim.weapon = event.victim.weapon
    }
    else if (event instanceof PlayerMedalEvent) {

    }
    else if (event instanceof PlayerStatsEvent) {

    }
    else if (event instanceof PlayerSwitchTeamEvent) {

    }
    else if (event instanceof RoundOverEvent) {
      let match = this.getMatch(event.matchGuid)

      let round = new Round

      round.matchId = match.id

      round.round = event.round
      round.teamWon = event.teamWon
      round.time = event.time
      // event.warmup
    }
  }
  
  abstract getFactory(factoryName: string, factoryTitle: string, gameType: GameType): Factory
  abstract getMatch(matchGuid: string): Match
  abstract getMap(mapName: string): Map
  abstract getPlayer(steamId: string, playerName: string): Player
  abstract getPlayerByName(playerName: string): Player
  abstract getRound(roundNumber: number): Round | null
}