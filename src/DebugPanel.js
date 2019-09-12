import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function DebugPanel({ players = [] }) {
  return (
    <Fragment>
      <Typography variant="subtitle1" style={{ marginTop: 20 }}>
        DATA DEBUG PANEL
      </Typography>
      {players.map(player => (
        <ExpansionPanel key={player.id}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{`${player.preferredName} (${player.id})`}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <pre>{JSON.stringify(player, null, 2)}</pre>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Fragment>
  );
}
