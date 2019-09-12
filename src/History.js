import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { range } from "./utils";

const columns = [
  { id: "name", label: "Name", minWidth: 200 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 }
];

export default function History({ players, latestWeekNumber = 0 }) {
  return (
    <Fragment>
      <Typography component="h5" variant="h5">
        History
      </Typography>

      <Paper style={{ width: "100%" }}>
        <div
          style={{
            maxHeight: 407,
            overflow: "auto"
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ maxWidth: 50 }}>
                  Week
                </TableCell>
                {players.map(player => (
                  <TableCell
                    key={player.id}
                    align="center"
                    style={{ minWidth: 100 }}
                  >
                    {player.name}
                  </TableCell>
                ))}
                <TableCell align="center" style={{ minWidth: 100 }}>
                  Winner
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {range(1, latestWeekNumber).map(i => (
                <TableRow hover key={i}>
                  <TableCell align="center">{i}</TableCell>
                  {players.map(player => (
                    <TableCell key={player.id} align="center">
                      {player.weeks[i].points}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    {players.find(player => player.weeks[i].isWinner).name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </Fragment>
  );
}
