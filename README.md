# Quake Live dedicated server API

This package provides comfortable access to the rcon and stats API of a Quake Live dedicated server.

## Install

`npm install ql-api`

## Overview

The package offers object-oriented access to the rcon and stats API and represents the stats events as class instances.

### Rcon

Connecting to the rcon API is as simple as creating an instance of `Rcon` and calling `connect()` on it.

```typescript
import { Rcon } from 'ql-api'

let rcon = new Rcon('127.0.0.1:28960', 'some_name', 'password')
rcon.connect()
```

### Stats

Connecting to the stats API is as simple as creating an instance of `Stats` and calling `connect()` on it.

```typescript
import { Stats } from 'ql-api'

let stats = new Stats('127.0.0.1:27960', 'password')
stats.connect()
```

To receive Quake Live stats events register listeners.

```typescript
stats.onMatchReport((event: MatchReportEvent) => { ... })
stats.onMatchStarted((event: MatchStartedEvent) => { ... })
stats.onPlayerConnect((event: PlayerConnectEvent) => { ... })
stats.onPlayerDeath((event: PlayerDeathEvent) => { ... })
stats.onPlayerDisconnect((event: PlayerDisconnectEvent) => { ... })
stats.onPlayerKill((event: PlayerKillEvent) => { ... })
stats.onPlayerMedal((event: PlayerMedalEvent) => { ... })
stats.onPlayerStats((event: PlayerStatsEvent) => { ... })
stats.onPlayerSwitchTeam((event: PlayerSwitchTeamEvent) => { ... })
stats.onRoundOver((event: RoundOverEvent) => { ... })
```

The raw JSON data is converted into instances of classes each of them dedicated to one event. A property which can have one of a set of predefined values is realized through an enum. Overall they form a complete documentation of the event data.

If you still have the need to access the raw Quake Live event data, you can register an event handler with `onRawQlEvent`.

```typescript
stats.onRawQlEvent((event: any) => { ... })
```

### ZMQ specifics

The `connect()` method will return instantly and perform its actions in the background. To hook into specific steps you can register event listeners. Since these are based on the Node `EventEmitter` class, you can add as many listeners per event as you like.

```typescript
rcon.onConnected((eventId, address, error) => { ... })
rcon.onConnectDelayed((eventId, address, error) => { ... })
rcon.onConnectRetried((eventId, address, error) => { ... })
```

If a connection was not successful, ZMQ will retry waiting a certain amount of time between to attempts.

## Credits

Credits go out to PredatH0r of which repository some sample data was used: https://github.com/PredatH0r/XonStat/tree/master/feeder/sample-data