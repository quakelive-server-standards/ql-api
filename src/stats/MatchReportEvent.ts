import GameType from './types/GameType'

export default class MatchReport {
  
  aborted: boolean // what is this exactly?
  captureLimit: number
  exitMsg: string // maybe enum? "Shutdown"
  factory: string
  factoryTitle: string
  firstScorer: string|'none'
  fragLimit: number
  gameLength: number
  gameType: GameType
  infected: number // maybe boolean?
  instagib: number // maybe boolean?
  lastLeadChangeTime: number
  lastScorer: string|'none'
  lastTeamScorer: string|'none'
  map: string
  matchGuid: string
  mercyLimit: number
  quadHog: number // maybe boolean?
  restarted: number
  roundLimit: number
  scoreLimit: number
  serverTitle: string
  timeLimit: number
  training: number // maybe boolean?
  teamScore0: number
  teamScore1: number

  static fromQl(data: any): MatchReport {
    let event = new MatchReport

    event.aborted = data['ABORTED']
    event.captureLimit = data['CAPTURE_LIMIT']
    event.exitMsg = data['EXIT_MSG']
    event.factory = data['FACTORY']
    event.factoryTitle = data['FACTORY_TITLE']
    event.firstScorer = data['FIRST_SCORER']
    event.fragLimit = data['FRAG_LIMIT']
    event.gameLength = data['GAME_LENGTH']
    event.gameType = data['GAME_TYPE']
    event.infected = data['INFECTED']
    event.instagib = data['INSTAGIB']
    event.lastLeadChangeTime = data['LAST_LEAD_CHANGE_TIME']
    event.lastScorer = data['LAST_SCORER']
    event.lastTeamScorer = data['LAST_TEAMSCORER']
    event.map = data['MAP']
    event.matchGuid = data['MATCH_GUID']
    event.mercyLimit = data['MERCY_LIMIT']
    event.quadHog = data['QUADHOG']
    event.restarted = data['RESTARTED']
    event.roundLimit = data['ROUND_LIMIT']
    event.scoreLimit = data['SCORE_LIMIT']
    event.serverTitle = data['SERVER_TITLE']
    event.timeLimit = data['TIME_LIMIT']
    event.training = data['TRAINING']
    event.teamScore0 = data['TSCORE0']
    event.teamScore1 = data['TSCORE1']

    return event
  }
}