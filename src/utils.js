import { PRICE_PER_WIN_IN_EUROS } from "./constants";

export function transformPlayerData(data) {
  if (data === null) return null;

  return {
    id: data.id,
    name: `${data.player_first_name} ${data.player_last_name}`,
    initials: `${data.player_first_name[0].toUpperCase()}${data.player_last_name[0].toUpperCase()}`,
    teamName: data.name,
    preferredName:
      data.player_first_name.toLowerCase() === "ogie"
        ? data.player_last_name
        : data.player_first_name,
    points: data.summary_overall_points,
    startedWeekNumber: data.started_event,
    latestWeekNumber: data.current_event
  };
}

export function transformWeekData(data) {
  if (data === null) return null;

  return {
    number: data.entry_history.event,
    chip: data.active_chip ? data.active_chip : "-",
    points: data.entry_history.points,
    cummulativePoints: data.entry_history.total_points,
    benchPoints: data.entry_history.points_on_bench,
    numberOfTransfers: data.entry_history.event_transfers,
    costOfTransfers: data.entry_history.event_transfers_cost,
    isWinner: false
  };
}

export function transformCurrentWeekData(player, week) {
  if (player === null || week === null) return null;

  return {
    playerId: player.id,
    playerName: player.name,
    playerInitials: player.initials,
    teamName: player.teamName,
    totalPoints: player.points,
    weekPoints: week.points,
    weekNumber: week.number,
    usedChip: week.chip,
    benchPoints: week.benchPoints,
    numberOfTransfers: week.numberOfTransfers,
    costOfTransfers: week.costOfTransfers
  };
}

export function range(start = 0, end = 0) {
  const numbers = [];

  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }

  return numbers;
}

export function getPlayerLatestWeekNumber(player) {
  if (player && Object.keys(player.weeks).length > 0) {
    return Object.keys(player.weeks).pop();
  }
  return 0;
}

export function getPlayerWeek(player, weekNumber) {
  if (player && Object.keys(player.weeks).length > 0) {
    if (weekNumber in player.weeks) {
      return player.weeks[weekNumber];
    }

    return null;
  }

  return null;
}

export function sortPlayersByWeek(players = [], weekNumber) {
  if (players.length === 0 || weekNumber === 0) return [...players];

  return [...players].sort((playerOne, playerTwo) => {
    const playerOneWeek = getPlayerWeek(playerOne, weekNumber);
    const playerTwoWeek = getPlayerWeek(playerTwo, weekNumber);

    if (playerOneWeek.points > playerTwoWeek.points) {
      return -1;
    }
    if (playerOneWeek.points < playerTwoWeek.points) {
      return 1;
    }
    return 0;
  });
}

export function setWinners(players = [], latestWeek = 0) {
  if (players.length === 0 || latestWeek === 0) return [...players];
  for (let currentWeek = 1; currentWeek <= latestWeek; currentWeek++) {
    const { winner } = players.reduce((topScorer, player) => {
      const points = getPlayerWeek(player, currentWeek).points;
      if (topScorer === null) return { winner: player, points };

      return topScorer.points > points ? topScorer : { winner: player, points };
    }, null);

    winner.weeks[currentWeek].isWinner = true;
  }

  return [...players];
}

export function getPlayerTotalWins(player) {
  return Object.keys(player.weeks).reduce((totalWins, weekNumber) => {
    const week = player.weeks[weekNumber];

    if (week.isWinner) return totalWins + 1;
    return totalWins;
  }, 0);
}

export function getPlayerTotalLosses(player) {
  return Object.keys(player.weeks).reduce((totalWins, weekNumber) => {
    const week = player.weeks[weekNumber];

    if (!week.isWinner) return totalWins + 1;
    return totalWins;
  }, 0);
}

export function getPlayerTotalCashWinnings(player) {
  return getPlayerTotalWins(player) * PRICE_PER_WIN_IN_EUROS;
}

export function getPlayerTotalCashLosses(player) {
  return -(getPlayerTotalLosses(player) * PRICE_PER_WIN_IN_EUROS);
}

export function getPlayerCashBalance(player) {
  return getPlayerTotalCashWinnings(player) + getPlayerTotalCashLosses(player);
}

export function getPlayerCashBalanceColor(player) {
  const balance = getPlayerCashBalance(player);
  if (balance < 0) return "red";
  if (balance > 0) return "green";
  return undefined;
}
