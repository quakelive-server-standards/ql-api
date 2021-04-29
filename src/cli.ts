import * as readline from 'readline'
import Rcon from './Rcon'
import Stats from './Stats'
import MatchReportEvent from './stats/MatchReportEvent'
import MatchStartedEvent from './stats/MatchStartedEvent'
import PlayerConnectEvent from './stats/PlayerConnectEvent'
import PlayerDeathEvent from './stats/PlayerDeathEvent'
import PlayerDisconnectEvent from './stats/PlayerDisconnectEvent'
import PlayerMedalEvent from './stats/PlayerMedalEvent'
import PlayerStatsEvent from './stats/PlayerStatsEvent'
import PlayerSwitchTeamEvent from './stats/PlayerSwitchTeamEvent'
import RoundOverEvent from './stats/RoundOverEvent'

let address = '95.216.19.32'
let rconPort = '28962'
let rconPassword = 'quakeliveserverstandards'
let statsPassword = 'quakeliveserverstandards'
let statsPort = '27962'

let cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: address + ' '
})

cli.on('line', (line) => {
  if (line.length == 0) {
    return
  }

  if (line == 'exit') {
    console.log('Good Game')
    process.exit()
  }

  rcon.send(line)
})

cli.on('close', () => {
  console.log('Good Game')
  process.exit(0)
})

// Adjust console.log to properly handle interplay with the prompt
let log = console.log
console.log = function() {
    ;(cli as any).output.write('\x1b[2K\r')
    log.apply(console, Array.prototype.slice.call(arguments))
    ;(cli as any)._refreshLine()
}
    
let rcon = new Rcon(address + ':' + rconPort, 'admin', rconPassword)
let stats = new Stats(address + ':' + statsPort, statsPassword)

rcon.onConnected((eventValue, address, error) => {
  if (! error) {
    console.log('Rcon connected to ' + rcon.address)
    cli.prompt()
  }
  else {
    console.log('There was an error connecting to rcon API ' + rcon.address + ' -> ' + error)
  }
})

// rcon.onConnectDelayed(() => console.log('Rcon: Retried connecting to ' + rcon.address))
// rcon.onConnectRetried(() => console.log('Rcon: Delayed connecting to ' + rcon.address))

rcon.onMessage(message => {
  if (message.length > 0) {
    let str = message.toString()
    
    // Clean up messages like: broadcast: print "Vote passed.\n"
    if (str.startsWith('broadcast: print "')) {
      str = str.substring(18, str.length - 4)
    }

    // Remove ^7 characters
    str = str.replace(new RegExp('\\^7', 'g'), '')

    console.log(str)
  }

  cli.prompt()
})

stats.onConnected((eventValue, address, error) => {
  if (! error) {
    console.log('Stats connected to ' + stats.address)
  }
  else {
    console.log('There was an error connecting to stats API ' + rcon.address + ' -> ' + error)
  }
})

// stats.onConnectDelayed(() => console.log('Stats: Retried connecting to ' + stats.address))
// stats.onConnectRetried(() => console.log('Stats: Delayed connecting to ' + stats.address))

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
  if (event.killer) {
    console.log(`${now()} ${event.killer.name} fragged ${event.victim.name} with ${event.killer.weapon}`)
  }
  else {
    console.log(`${now()} ${event.mod} fragged ${event.victim.name}`)
  }
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

function now() {
  let date = new Date

  let minutes = date.getMinutes().toString().padStart(2, '0')
  let seconds = date.getSeconds().toString().padStart(2, '0')

  return `${date.getHours()}:${minutes}:${seconds}`
}