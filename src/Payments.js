import React, { Fragment } from "react";
import { FormattedNumber } from "react-intl";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  getPlayerTotalWins,
  getPlayerTotalLosses,
  getPlayerTotalCashWinnings,
  getPlayerTotalCashLosses,
  getPlayerCashBalance,
  getPlayerCashBalanceColor
} from "./utils";

export default function Payments({ players = [], latestWeekNumber = 0 }) {
  return (
    <Fragment>
      <Typography component="h5" variant="h5" style={{ marginBottom: 10 }}>
        Payments
      </Typography>
      <Paper style={{ width: "auto" }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell variant="head" align="left" style={{ minWidth: 30 }} />
              {players.map(player => (
                <TableCell
                  key={player.id}
                  variant="head"
                  align="center"
                  style={{ minWidth: 30 }}
                >
                  {player.preferredName}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell variant="head" align="left" style={{ minWidth: 30 }}>
                Total Winnings
              </TableCell>
              {players.map(player => (
                <TableCell
                  key={player.id}
                  variant="body"
                  align="center"
                  style={{ minWidth: 30 }}
                >
                  {getPlayerTotalWins(player)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell variant="head" align="left" style={{ minWidth: 30 }}>
                Total Losses
              </TableCell>
              {players.map(player => (
                <TableCell
                  key={player.id}
                  variant="body"
                  align="center"
                  style={{ minWidth: 30 }}
                >
                  {getPlayerTotalLosses(player)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell variant="head" align="left" style={{ minWidth: 30 }}>
                Cash Winnings
              </TableCell>
              {players.map(player => (
                <TableCell
                  key={player.id}
                  variant="body"
                  align="center"
                  style={{ minWidth: 30, color: "green" }}
                >
                  <FormattedNumber
                    value={getPlayerTotalCashWinnings(player)}
                    style="currency"
                    currency="EUR"
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell variant="head" align="left" style={{ minWidth: 30 }}>
                Cash Losses
              </TableCell>
              {players.map(player => (
                <TableCell
                  key={player.id}
                  variant="body"
                  align="center"
                  style={{ minWidth: 30, color: "red" }}
                >
                  <FormattedNumber
                    value={getPlayerTotalCashLosses(player)}
                    style="currency"
                    currency="EUR"
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell variant="head" align="left" style={{ minWidth: 30 }}>
                Cash Balance
              </TableCell>
              {players.map(player => (
                <TableCell
                  key={player.id}
                  variant="body"
                  align="center"
                  style={{
                    minWidth: 30,
                    color: getPlayerCashBalanceColor(player)
                  }}
                >
                  <FormattedNumber
                    value={getPlayerCashBalance(player)}
                    style="currency"
                    currency="EUR"
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Fragment>
  );
}
