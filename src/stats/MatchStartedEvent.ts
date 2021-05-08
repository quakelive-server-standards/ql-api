import { GameType, TeamType } from 'ql-model'
import { GameTypeMapping } from './typeMappings/GameTypeMapping'

export default class MatchStartedEvent {

  captureLimit: number
  factory: string
  factoryTitle: string
  fragLimit: number
  gameType: GameType
  infected: boolean
  instagib: boolean
  map: string
  matchGuid: string
  mercyLimit: number
  players: {
    name: string
    steamId: string
    team: TeamType
  }[]
  quadHog: boolean
  roundLimit: number
  scoreLimit: number
  serverTitle: string
  timeLimit: number
  training: boolean
 
  static fromQl(data: any): MatchStartedEvent {
    let event = new MatchStartedEvent

    event.captureLimit = data['CAPTURE_LIMIT']
    event.factory = data['FACTORY']
    event.factoryTitle = data['FACTORY_TITLE']
    event.fragLimit = data['FRAG_LIMIT']
    event.gameType = GameTypeMapping[data['GAME_TYPE']] || data['GAME_TYPE']
    event.infected = data['INFECTED'] ? true : false
    event.instagib = data['INSTAGIB'] ? true : false
    event.map = data['MAP']
    event.matchGuid = data['MATCH_GUID']
    event.mercyLimit = data['MERCY_LIMIT']

    event.players = []

    for (let player of data['PLAYERS']) {
      event.players.push({
        name: player['NAME'],
        steamId: player['STEAM_ID'],
        team: player['TEAM'] == 0 ? TeamType.Free : player['TEAM'] == 1 ? TeamType.Red : TeamType.Blue
      })
    }


    event.quadHog = data['QUADHOG'] ? true : false
    event.roundLimit = data['ROUND_LIMIT']
    event.scoreLimit = data['SCORE_LIMIT']
    event.serverTitle = data['SERVER_TITLE']
    event.timeLimit = data['TIME_LIMIT']
    event.training = data['TRAINING'] ? true : false
    
    return event
  }
}