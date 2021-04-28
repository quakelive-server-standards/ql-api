import * as readline from 'readline'
import Rcon from './Rcon'
import Stats from './Stats'

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '95.216.19.32 '
});

let stats = new Stats('95.216.19.32:27962', 'quakeliveserverstandards', 'quakeliveserverstandards')
let rcon = new Rcon('95.216.19.32:28962', 'quakeliveserverstandards', 'quakeliveserverstandards')

rcon.onConnected(() => rl.prompt())
rcon.onMessage(() => rl.prompt())
// stats.onMessage()

stats.connect()
rcon.connect()


rl.on('line', (line) => {
  if (line.length == 0) {
    return
  }

  rcon.send(line)
})

rl.on('close', () => {
  console.log('\nBye!')
  process.exit(0)
})
