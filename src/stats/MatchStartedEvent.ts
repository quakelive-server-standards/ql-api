export default class MatchStartedEvent {

  captureLimit: number
  factory: string
  factoryTitle: string
  fragLimit: string
  gameType: string
  infected: number // maybe boolean?
  instagib: number // maybe boolean?
  map: string
  matchGuid: string
  mercyLimit: number
  players: {
    name: string
    steamId: string
    team: number
  }[]
  quadHog: number // maybe boolean?
  roundLimit: number
  scoreLimit: number
  serverTitle: string
  timeLimit: number
  training: number // maybe boolean?
 
  static fromQl(data: any): MatchStartedEvent {
    let event = new MatchStartedEvent

    event.captureLimit = data['CAPTURE_LIMIT']
    event.factory = data['FACTORY']
    event.factoryTitle = data['FACTORY_TITLE']
    event.fragLimit = data['FRAG_LIMIT']
    event.gameType = data['GAME_TYPE']
    event.infected = data['INFECTED']
    event.instagib = data['INSTAGIB']
    event.map = data['MAP']
    event.matchGuid = data['MATCH_GUID']
    event.mercyLimit = data['MERCY_LIMIT']

    event.players = []

    for (let player of data['PLAYERS']) {
      event.players.push({
        name: player['NAME'],
        steamId: player['STEAM_ID'],
        team: player['TEAM']
      })
    }


    event.quadHog = data['QUADHOG']
    event.roundLimit = data['ROUND_LIMIT']
    event.scoreLimit = data['SCORE_LIMIT']
    event.serverTitle = data['SERVER_TITLE']
    event.timeLimit = data['TIME_LIMIT']
    event.training = data['TRAINING']
    
    return event
  }
}