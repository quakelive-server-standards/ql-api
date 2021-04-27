import Rcon from './Rcon'
import Stats from './Stats'

let stats = new Stats('95.216.19.32:27962', 'quakeliveserverstandards', 'quakeliveserverstandards')
let rcon = new Rcon('95.216.19.32:28962', 'quakeliveserverstandards', 'quakeliveserverstandards')

stats.connect()
rcon.connect()
