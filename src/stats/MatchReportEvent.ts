import GameType from './types/GameType'

export default class MatchReport {
  
  aborted: boolean
  captureLimit: number
  exitMsg: string // maybe enum? "Shutdown"
  factory: string
  factoryTitle: string
  firstScorer: string|'none' // none needs to become null
  fragLimit: number
  gameLength: number
  gameType: GameType
  infected: number
  instagib: number
  lastLeadChangeTime: number
  lastScorer: string|'none' // none needs to become null
  lastTeamScorer: string|'none' // none needs to become null
  map: string
  matchGuid: string
  mercyLimit: number
  quadHog: number
  restarted: number
  roundLimit: number
  scoreLimit: number
  serverTitle: string
  timeLimit: number
  training: number
  tScore0: number // what is this?
  tScore1: number // what is this?

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
    event.tScore0 = data['TSCORE0']
    event.tScore1 = data['TSCORE1']

    return event
  }
}