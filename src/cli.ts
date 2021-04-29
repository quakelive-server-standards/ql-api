import * as readline from 'readline';
import Rcon from './Rcon';
import Stats from './Stats';
import MatchReportEvent from './stats/MatchReportEvent';
import MatchStartedEvent from './stats/MatchStartedEvent';
import PlayerConnectEvent from './stats/PlayerConnectEvent';
import PlayerDeathEvent from './stats/PlayerDeathEvent';
import PlayerDisconnectEvent from './stats/PlayerDisconnectEvent';
import PlayerMedalEvent from './stats/PlayerMedalEvent';
import PlayerStatsEvent from './stats/PlayerStatsEvent';
import PlayerSwitchTeamEvent from './stats/PlayerSwitchTeamEvent';
import RoundOverEvent from './stats/RoundOverEvent';

let cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '95.216.19.32 '
});

let log = console.log;
console.log = function() {
    (cli as any).output.write('\x1b[2K\r');
    log.apply(console, Array.prototype.slice.call(arguments));
    (cli as any)._refreshLine();
}
    
let stats = new Stats('95.216.19.32:27962', 'quakeliveserverstandards', 'quakeliveserverstandards')
let rcon = new Rcon('95.216.19.32:28962', 'quakeliveserverstandards', 'quakeliveserverstandards')

rcon.onConnected(() => cli.prompt())
rcon.onMessage(() => cli.prompt())

rcon.onMessage(message => {
  if (message.length > 0) {
    console.log(message.toString() + '')
  } 
})

stats.onMatchReport((event: MatchReportEvent) => {
  console.log(`${now()} Game has finished. Duration = ${event.gameLength} Aborted = ${event.aborted}`)
  cli.write(undefined, )
})

stats.onMatchStarted((event: MatchStartedEvent) => {
  console.log(`${now()} Match has started`)
})

stats.onPlayerConnect((event: PlayerConnectEvent) => {
  console.log(`${now()} Player ${event.name} connected`)
})

stats.onPlayerDeath((event: PlayerDeathEvent) => {
  console.log(`${now()} ${event.killer.name} fragged ${event.victim.name} with ${event.killer.weapon}`)
})

stats.onPlayerDisconnect((event: PlayerDisconnectEvent) => {
  console.log(`${now()} Player ${event.name} disconnected`)
})

stats.onPlayerMedal((event: PlayerMedalEvent) => {
  console.log(`${now()} Player ${event.name} earned medal ${event.medal}`)
})

stats.onPlayerStats((event: PlayerStatsEvent) => {
  console.log(`${now()} Player ${event.name} made ${event.kills} frags and died ${event.deaths} times which earned her/him rank ${event.rank}`)
})

stats.onPlayerSwitchTeam((event: PlayerSwitchTeamEvent) => {
  console.log(`${now()} Player ${event.name} switched to team ${event.newTeam}`)
})

stats.onRoundOver((event: RoundOverEvent) => {
  console.log(`${now()} Round is over`)
})

stats.connect()
rcon.connect()

cli.on('line', (line) => {
  if (line.length == 0) {
    return
  }

  rcon.send(line)
})

cli.on('close', () => {
  console.log('Bye!')
  process.exit(0)
})

function now() {
  let date = new Date

  let minutes = date.getMinutes().toString().padStart(2, '0')
  let seconds = date.getSeconds().toString().padStart(2, '0')

  return `${date.getHours()}:${minutes}:${seconds}`
}