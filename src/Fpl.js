import React from "react";
import { IntlProvider } from "react-intl";
import { Box, Container } from "@material-ui/core";
import Header from "./Header";
import LatestWeek from "./LatestWeek";
import Payments from "./Payments";
import History from "./History";
import { CURRENT_WEEK_VIEW, PAYMENTS_VIEW, HISTORY_VIEW } from "./constants";
import data from "./data";
import usePlayers from "./usePlayers";
import { getPlayerLatestWeekNumber } from "./utils";
import DebugPanel from "./DebugPanel";

export default function Fpl() {
  const [view, setView] = React.useState(CURRENT_WEEK_VIEW);
  const players = usePlayers(data.playerIds);
  const numberOfPlayers = data.playerIds.length;
  const latestWeekNumber = getPlayerLatestWeekNumber(players[0]);

  return (
    <IntlProvider locale="en">
      <Box m={-1} style={{ backgroundColor: "rgb(248, 249, 250)" }}>
        <Header view={view} onViewChange={setView} />
        <Container fixed>
          {view === CURRENT_WEEK_VIEW && (
            <LatestWeek
              weekNumber={latestWeekNumber}
              players={players}
              numberOfPlayers={numberOfPlayers}
            />
          )}
          {view === PAYMENTS_VIEW && (
            <Payments players={players} latestWeekNumber={latestWeekNumber} />
          )}
          {view === HISTORY_VIEW && (
            <History players={players} latestWeekNumber={latestWeekNumber} />
          )}
          <DebugPanel players={players} />
        </Container>
      </Box>
    </IntlProvider>
  );
}
