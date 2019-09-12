import React, { Fragment } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { BottomNavigationAction, BottomNavigation } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GameWeekIcon from "@material-ui/icons/PlayCircleOutline";
import PaymentsIcon from "@material-ui/icons/EuroSymbol";
import HistoryIcon from "@material-ui/icons/History";

const useStyles = makeStyles({
  nav: {
    width: "100%",
    backgroundColor: "rgb(248, 249, 250)"
  }
});

export default function Header({ view, onViewChange }) {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position="sticky">
        <Toolbar variant="regular">
          <Typography variant="h6" color="inherit">
            Lunchers FPL League
          </Typography>
        </Toolbar>
      </AppBar>
      <BottomNavigation
        style={{ marginTop: 20, marginBottom: 20 }}
        value={view}
        onChange={(event, newView) => {
          onViewChange(newView);
        }}
        showLabels
        className={classes.nav}
      >
        <BottomNavigationAction label="Latest Week" icon={<GameWeekIcon />} />
        <BottomNavigationAction label="History" icon={<HistoryIcon />} />
        <BottomNavigationAction label="Payments" icon={<PaymentsIcon />} />
      </BottomNavigation>
    </Fragment>
  );
}
