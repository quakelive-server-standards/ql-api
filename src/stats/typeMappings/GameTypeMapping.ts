import { GameType } from 'ql-model'

export const GameTypeMapping = {
  AD: GameType.AttackAndDefense,
  CA: GameType.ClanArena,
  CTF: GameType.CaptureTheFlag,
  DUEL: GameType.Duel,
  DOM: GameType.Domination,
  FFA: GameType.FreeForAll,
  FT: GameType.FreezeTag,
  HAR: GameType.Harvester,
  ONEFLAG: GameType.OneFlagCtf,
  RACE: GameType.Race,
  RR: GameType.RedRover,
  TDM: GameType.TeamDeathmatch
}
