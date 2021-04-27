import TeamType from './TeamType'

export default class PlayerSwitchTeam {
  steamId: string
  name: string
  oldTeam: TeamType
  newTeam: TeamType

  matchGuid: string
  time: number
  warmup: boolean
}