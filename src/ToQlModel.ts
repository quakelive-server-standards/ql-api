import { Cvars, Factory, Frag, FragParticipant, GameType, Map, Match, MatchParticipation, Medal, Player, Round, Server, ServerVisit, Stats, TeamType } from 'ql-model'
import { MatchReportEvent, MatchStartedEvent, PlayerConnectEvent, PlayerDeathEvent, PlayerDisconnectEvent, PlayerKillEvent, PlayerMedalEvent, PlayerStatsEvent, PlayerSwitchTeamEvent, RoundOverEvent } from '.'

export default abstract class ToQlModel {

  async bootUp() {
    // delete all entities which are incomplete
  }

  async integrate(serverIp: string, serverPort: number, event: MatchReportEvent | MatchStartedEvent | PlayerConnectEvent | PlayerDeathEvent | PlayerDisconnectEvent | PlayerKillEvent | PlayerMedalEvent | PlayerStatsEvent | PlayerSwitchTeamEvent | RoundOverEvent, now: Date = utc()) {
    let server = await this.createOrGetServer(serverIp, serverPort)

    if (event instanceof MatchReportEvent) {
      let match = await this.getMatch(event.matchGuid)

      if (match) {
        let factory = await this.createOrGetFactory(event.factory, event.factoryTitle, event.gameType)
        let map = await this.createOrGetMap(event.map)

        let finishDate = utc(match.startDate)
        finishDate.setSeconds(finishDate.getSeconds() + event.gameLength)
  
        match.finishDate = finishDate
        match.factoryId = factory.id
        match.mapId = map.id
        match.serverId = server.id
        server.title = event.serverTitle
  
        match.aborted = event.aborted
        match.cvars.capturelimit = event.captureLimit
        match.exitMessage = event.exitMsg
        match.cvars.fraglimit = event.fragLimit
        match.length = event.gameLength
        match.cvars.g_instagib = event.instagib
        match.lastLeadChangeTime = event.lastLeadChangeTime
        match.guid = event.matchGuid
        match.cvars.mercylimit = event.mercyLimit
        match.cvars.g_quadHog = event.quadHog
        match.restarted = event.restarted
        match.cvars.roundlimit = event.roundLimit
        match.cvars.scorelimit = event.scoreLimit
        match.cvars.timelimit = event.timeLimit
        match.cvars.g_training = event.training
        match.score1 = event.teamScore0
        match.score2 = event.teamScore1

        await this.updateServer(server)
        await this.updateMatch(match)
      }
    }
    else if (event instanceof MatchStartedEvent) {
      let factory = await this.createOrGetFactory(event.factory, event.factoryTitle, event.gameType)
      let map = await this.createOrGetMap(event.map)

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

      let id = await this.createMatch(match)

      let startDate = now

      for (let eventPlayer of event.players) {
        let player = await this.createOrGetPlayer(eventPlayer.steamId, eventPlayer.name)
        
        let matchParticipation = new MatchParticipation
        matchParticipation.matchId = id
        matchParticipation.playerId = player.id
        matchParticipation.serverId = server.id
        matchParticipation.startDate = startDate

        await this.createMatchParticipation(matchParticipation)
      }
    }
    else if (event instanceof PlayerConnectEvent) {
      let player = await this.createOrGetPlayer(event.steamId, event.name)

      let serverVisit = new ServerVisit

      serverVisit.playerId = player.id
      serverVisit.serverId = server.id
      
      serverVisit.connectDate = now
      // event.matchGuid

      await this.createServerVisit(serverVisit)
    }
    else if (event instanceof PlayerDeathEvent) {
      /**
       * Only handle death events that were not caused by another player because those are already
       * handled in the PlayerKillEvent section
       */
      if (event.killer == null) {
        let warump = event.warmup
        let match = await this.getMatch(event.matchGuid)

        if (match || warump) {
          let victim = await this.createOrGetPlayer(event.victim.steamId, event.victim.name)

          let frag = new Frag
  
          frag.date = now
          frag.killer = null
          frag.matchId = match ? match.id : null
          frag.victim = new FragParticipant
          frag.victim.playerId = victim.id
          frag.serverId = server.id
  
          frag.reason = event.mod
          frag.otherTeamAlive = event.otherTeamAlive
          frag.otherTeamDead = event.otherTeamDead
          frag.suicide = event.suicide
          // event.teamKill
          frag.teamAlive = event.teamAlive
          frag.teamDead = event.teamDead
          frag.time = event.time
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
  
          await this.createFrag(frag)  
        }
      }
    }
    else if (event instanceof PlayerDisconnectEvent) {
      let serverVisit = await this.getActiveServerVisit(server.id, event.steamId)

      if (serverVisit) {
        serverVisit.disconnectDate = now
        await this.updateServerVisit(serverVisit)
      }
    }
    else if (event instanceof PlayerKillEvent) {
      let warmup = event.warmup
      let match = await this.getMatch(event.matchGuid)

      if (match || warmup) {
        let killer = await this.createOrGetPlayer(event.killer.steamId, event.killer.name)
        let victim = await this.createOrGetPlayer(event.victim.steamId, event.victim.name)
  
        let frag = new Frag
  
        frag.date = now
        frag.killer = new FragParticipant
        frag.killer.playerId = killer.id
        frag.matchId = match ? match.id : null
        frag.victim = new FragParticipant
        frag.victim.playerId = victim.id
        frag.serverId = server.id
  
        frag.otherTeamAlive = event.otherTeamAlive
        frag.otherTeamDead = event.otherTeamDead
        frag.suicide = event.suicide
        // event.teamKill
        frag.teamAlive = event.teamAlive
        frag.teamDead = event.teamDead
        frag.time = event.time
  
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
  
        await this.createFrag(frag)  
      }
    }
    else if (event instanceof PlayerMedalEvent) {
      let match = await this.getMatch(event.matchGuid)

      if (match) {
        let player = await this.createOrGetPlayer(event.steamId, event.name)

        let medal = new Medal
  
        medal.matchId = match.id
        medal.playerId = player.id
        medal.serverId = server.id
  
        medal.medal = event.medal
  
        await this.createMedal(medal)
      }
    }
    else if (event instanceof PlayerStatsEvent) {
      let warmup = event.warmup
      let match = await this.getMatch(event.matchGuid)
      let matchParticipation = await this.getActiveMatchParticipation(event.steamId, event.matchGuid)

      if (match && matchParticipation || warmup) {
        let player = await this.createOrGetPlayer(event.steamId, event.name)

        let stats = new Stats

        stats.matchId = match ? match.id : null
        stats.matchParticipationId = matchParticipation.id
        stats.playerId = player.id
        stats.serverId = server.id
  
        stats.aborted = event.aborted
        stats.blueFlagPickups = event.blueFlagPickups
        stats.deaths = event.deaths
        stats.holyShits = event.holyShits
        stats.kills = event.kills
        // event.lose
        stats.maxStreak = event.maxStreak
        // event.model
        stats.neutralFlagPickups = event.neutralFlagPickups
        stats.playTime = event.playTime
        // event.quit
        stats.rank = event.rank
        stats.redFlagPickups = event.redFlagPickups
        stats.score = event.score
        // event.team
        stats.teamJoinTime = event.teamJoinTime
        stats.teamRank = event.teamRank
        stats.tiedRank = event.tiedRank
        stats.tiedTeamRank = event.tiedTeamRank
        // event.warmup
        // event.win
        stats.damageDealt = event.damage.dealt
        stats.damageTaken = event.damage.taken
        
        stats.medals = {
          accuracy: event.medals.accuracy,
          assists: event.medals.assists,
          captures: event.medals.captures,
          comboKill: event.medals.comboKill,
          defends: event.medals.defends,
          excellent: event.medals.excellent,
          firstFrag: event.medals.firstFrag,
          headshot: event.medals.headshot,
          humiliation: event.medals.humiliation,
          impressive: event.medals.impressive,
          midair: event.medals.midair,
          perfect: event.medals.perfect,
          perforated: event.medals.perforated,
          quadGod: event.medals.quadGod,
          rampage: event.medals.rampage,
          revenge: event.medals.revenge
        }

        stats.pickups = {
          ammo: event.pickups.ammo,
          armor: event.pickups.armor,
          armorRegeneration: event.pickups.armorRegeneration,
          battleSuit: event.pickups.battleSuit,
          doubler: event.pickups.doubler,
          flight: event.pickups.flight,
          greenArmor: event.pickups.greenArmor,
          guard: event.pickups.guard,
          haste: event.pickups.haste,
          health: event.pickups.health,
          invisibility: event.pickups.invisibility,
          invulnerability: event.pickups.invulnerability,
          kamikaze: event.pickups.kamikaze,
          medKit: event.pickups.medKit,
          megaHealth: event.pickups.megaHealth,
          otherHoldable: event.pickups.otherHoldable,
          otherPowerUp: event.pickups.otherPowerUp,
          portal: event.pickups.portal,
          quadDamage: event.pickups.quadDamage,
          redArmor: event.pickups.redArmor,
          regeneration: event.pickups.regeneration,
          scout: event.pickups.scout,
          teleporter: event.pickups.teleporter,
          yellowArmor: event.pickups.yellowArmor,
        }

        stats.bfg = {
          deaths: event.weapons.bfg.deaths,
          damageGiven: event.weapons.bfg.damageGiven,
          damageReceived: event.weapons.bfg.damageReceived,
          hits: event.weapons.bfg.hits,
          kills: event.weapons.bfg.kills,
          p: event.weapons.bfg.p,
          shots: event.weapons.bfg.shots,
          t: event.weapons.bfg.t
        }

        stats.chainGun = {
          deaths: event.weapons.chainGun.deaths,
          damageGiven: event.weapons.chainGun.damageGiven,
          damageReceived: event.weapons.chainGun.damageReceived,
          hits: event.weapons.chainGun.hits,
          kills: event.weapons.chainGun.kills,
          p: event.weapons.chainGun.p,
          shots: event.weapons.chainGun.shots,
          t: event.weapons.chainGun.t
        }

        stats.gauntlet = {
          deaths: event.weapons.gauntlet.deaths,
          damageGiven: event.weapons.gauntlet.damageGiven,
          damageReceived: event.weapons.gauntlet.damageReceived,
          hits: event.weapons.gauntlet.hits,
          kills: event.weapons.gauntlet.kills,
          p: event.weapons.gauntlet.p,
          shots: event.weapons.gauntlet.shots,
          t: event.weapons.gauntlet.t
        }

        stats.grenadeLauncher = {
          deaths: event.weapons.grenadeLauncher.deaths,
          damageGiven: event.weapons.grenadeLauncher.damageGiven,
          damageReceived: event.weapons.grenadeLauncher.damageReceived,
          hits: event.weapons.grenadeLauncher.hits,
          kills: event.weapons.grenadeLauncher.kills,
          p: event.weapons.grenadeLauncher.p,
          shots: event.weapons.grenadeLauncher.shots,
          t: event.weapons.grenadeLauncher.t
        }

        stats.heavyMachineGun = {
          deaths: event.weapons.heavyMachineGun.deaths,
          damageGiven: event.weapons.heavyMachineGun.damageGiven,
          damageReceived: event.weapons.heavyMachineGun.damageReceived,
          hits: event.weapons.heavyMachineGun.hits,
          kills: event.weapons.heavyMachineGun.kills,
          p: event.weapons.heavyMachineGun.p,
          shots: event.weapons.heavyMachineGun.shots,
          t: event.weapons.heavyMachineGun.t
        }

        stats.lightningGun = {
          deaths: event.weapons.lightningGun.deaths,
          damageGiven: event.weapons.lightningGun.damageGiven,
          damageReceived: event.weapons.lightningGun.damageReceived,
          hits: event.weapons.lightningGun.hits,
          kills: event.weapons.lightningGun.kills,
          p: event.weapons.lightningGun.p,
          shots: event.weapons.lightningGun.shots,
          t: event.weapons.lightningGun.t
        }

        stats.machineGun = {
          deaths: event.weapons.machineGun.deaths,
          damageGiven: event.weapons.machineGun.damageGiven,
          damageReceived: event.weapons.machineGun.damageReceived,
          hits: event.weapons.machineGun.hits,
          kills: event.weapons.machineGun.kills,
          p: event.weapons.machineGun.p,
          shots: event.weapons.machineGun.shots,
          t: event.weapons.machineGun.t
        }

        stats.nailGun = {
          deaths: event.weapons.nailGun.deaths,
          damageGiven: event.weapons.nailGun.damageGiven,
          damageReceived: event.weapons.nailGun.damageReceived,
          hits: event.weapons.nailGun.hits,
          kills: event.weapons.nailGun.kills,
          p: event.weapons.nailGun.p,
          shots: event.weapons.nailGun.shots,
          t: event.weapons.nailGun.t
        }

        stats.otherWeapon = {
          deaths: event.weapons.otherWeapon.deaths,
          damageGiven: event.weapons.otherWeapon.damageGiven,
          damageReceived: event.weapons.otherWeapon.damageReceived,
          hits: event.weapons.otherWeapon.hits,
          kills: event.weapons.otherWeapon.kills,
          p: event.weapons.otherWeapon.p,
          shots: event.weapons.otherWeapon.shots,
          t: event.weapons.otherWeapon.t
        }

        stats.plasmaGun = {
          deaths: event.weapons.plasmaGun.deaths,
          damageGiven: event.weapons.plasmaGun.damageGiven,
          damageReceived: event.weapons.plasmaGun.damageReceived,
          hits: event.weapons.plasmaGun.hits,
          kills: event.weapons.plasmaGun.kills,
          p: event.weapons.plasmaGun.p,
          shots: event.weapons.plasmaGun.shots,
          t: event.weapons.plasmaGun.t
        }

        stats.proximityLauncher = {
          deaths: event.weapons.proximityLauncher.deaths,
          damageGiven: event.weapons.proximityLauncher.damageGiven,
          damageReceived: event.weapons.proximityLauncher.damageReceived,
          hits: event.weapons.proximityLauncher.hits,
          kills: event.weapons.proximityLauncher.kills,
          p: event.weapons.proximityLauncher.p,
          shots: event.weapons.proximityLauncher.shots,
          t: event.weapons.proximityLauncher.t
        }

        stats.railgun = {
          deaths: event.weapons.railgun.deaths,
          damageGiven: event.weapons.railgun.damageGiven,
          damageReceived: event.weapons.railgun.damageReceived,
          hits: event.weapons.railgun.hits,
          kills: event.weapons.railgun.kills,
          p: event.weapons.railgun.p,
          shots: event.weapons.railgun.shots,
          t: event.weapons.railgun.t
        }

        stats.rocketLauncher = {
          deaths: event.weapons.rocketLauncher.deaths,
          damageGiven: event.weapons.rocketLauncher.damageGiven,
          damageReceived: event.weapons.rocketLauncher.damageReceived,
          hits: event.weapons.rocketLauncher.hits,
          kills: event.weapons.rocketLauncher.kills,
          p: event.weapons.rocketLauncher.p,
          shots: event.weapons.rocketLauncher.shots,
          t: event.weapons.rocketLauncher.t
        }

        stats.shotgun = {
          deaths: event.weapons.shotgun.deaths,
          damageGiven: event.weapons.shotgun.damageGiven,
          damageReceived: event.weapons.shotgun.damageReceived,
          hits: event.weapons.shotgun.hits,
          kills: event.weapons.shotgun.kills,
          p: event.weapons.shotgun.p,
          shots: event.weapons.shotgun.shots,
          t: event.weapons.shotgun.t
        }

        let finishDate = utc(matchParticipation.startDate)
        finishDate.setSeconds(finishDate.getSeconds() + event.playTime)

        matchParticipation.finishDate = finishDate
        await this.updateMatchParticipation(matchParticipation)
        await this.createStats(stats)
      }
    }
    else if (event instanceof PlayerSwitchTeamEvent) {
      if (event.newTeam != TeamType.Spectator) {
        let match = await this.getMatch(event.matchGuid)

        if (match) {
          let player = await this.createOrGetPlayer(event.steamId, event.name)

          let matchParticipation = new MatchParticipation
          matchParticipation.matchId = match.id
          matchParticipation.playerId = player.id
          matchParticipation.serverId = server.id
          matchParticipation.startDate = now
          
          await this.createMatchParticipation(matchParticipation)
        }
      }
    }
    else if (event instanceof RoundOverEvent) {
      let match = await this.getMatch(event.matchGuid)

      if (match) {
        let medals = await this.getMedalsWithMissingRound(event.matchGuid)
        let frags = await this.getFragsWithMissingRound(event.matchGuid)
        let stats = await this.getStatsWithMissingRound(event.matchGuid)
  
        let round = new Round
  
        round.matchId = match.id
        round.serverId = server.id
  
        round.round = event.round
        round.teamWon = event.teamWon
        round.time = event.time
        // event.warmup
  
        let roundId = await this.createRound(round)
  
        for (let frag of frags) {
          frag.roundId = roundId
          await this.updateFrag(frag)
        }
  
        for (let medal of medals) {
          medal.roundId = roundId
          await this.updateMedal(medal)
        }
  
        for (let stat of stats) {
          stat.roundId = roundId
          await this.updateStats(stat)
        }  
      }
    }
  }
  
  abstract getActiveMatchParticipation(steamId: string, matchGuid: string): Promise<MatchParticipation|null>
  abstract getActiveServerVisit(serverId: number, steamId: string): Promise<ServerVisit|null>
  abstract getFrags(matchGuid: string): Promise<Frag[]>
  abstract getFragsWithMissingRound(matchGuid: string): Promise<Frag[]>
  abstract getMatch(matchGuid: string): Promise<Match|null>
  abstract getMedalsWithMissingRound(matchGuid: string): Promise<Medal[]>
  abstract getRound(matchGuid: string, roundNumber: number): Promise<Round|null>
  abstract getStatsWithMissingRound(matchGuid: string): Promise<Stats[]>
  
  abstract createOrGetFactory(factoryName: string, factoryTitle: string, gameType: GameType): Promise<Factory>
  abstract createOrGetMap(mapName: string): Promise<Map>
  abstract createOrGetPlayer(steamId: string, playerName: string): Promise<Player>
  abstract createOrGetServer(ip: string, port: number): Promise<Server>

  abstract createFrag(frag: Frag): Promise<number>
  abstract createMatch(match: Match): Promise<number>
  abstract createMatchParticipation(matchParticipation: MatchParticipation): Promise<number>
  abstract createMedal(medal: Medal): Promise<number>
  abstract createRound(round: Round): Promise<number>
  abstract createServerVisit(serverVisit: ServerVisit): Promise<number>
  abstract createStats(stats: Stats): Promise<number>

  abstract updateFrag(frag: Frag): Promise<void>
  abstract updateMatch(match: Match): Promise<void>
  abstract updateMatchParticipation(matchParticipation: MatchParticipation): Promise<void>
  abstract updateMedal(medal: Medal): Promise<void>
  abstract updateServer(server: Server): Promise<void>
  abstract updateServerVisit(serverVisit: ServerVisit): Promise<void>
  abstract updateStats(stats: Stats): Promise<void>
}

function utc(date: Date = new Date): Date {
  let utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds())
  return new Date(utc)
}