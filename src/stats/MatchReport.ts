import GameType from './GameType'

export default class MatchReport {
  aborted : boolean
  captureLimit: number
  exitMsg: string // maybe enum? "Shutdown"
  factory: string
  factoryTitle: string
  firstScorer: string|'none'
  fragLimit: number
  gameLength: number
  gameType: GameType
  infected: number
  instagib: number
  lastLeadChangeTime: number
  lastScorer: string|'none'
  lastTeamScorer: string|'none'
  map: string
  matchGuid: string
  mercyLimit: number
  quadhog: number
  restarted: number
  roundLimit: number
  scoreLimit: number
  serverTitle: string
  timeLimit: number
  training: number
  tscore0: number
  tscore1: number
}