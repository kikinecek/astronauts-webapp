import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import AstronautsTableRow from "./AstronautsTableRow";
import { AstronautsTableTranslations } from "../../utility/translations";
import { AstronautTableInterface } from "../../type/astronautComponent";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
  Tooltip
} from "@material-ui/core";

import AddCircleIcon from '@material-ui/icons/AddCircle';

/**
 * Styles for the AstronautsTable
 */
const useStyles = makeStyles({
  paper: {
    width: "70%",
    margin: "auto"
  },
  header: {
    "& > th": {
      fontWeight: "bold",
      textAlign: "center"
    }
  },
  addRow: {
    width: "100%"
  },
  addCell: {
    textAlign: "center"
  }
});

/**
 * Function represents astronauts table componenet.
 * !!! All parameters are passed inside the object (so there is technically only 1 parameter)
 * @param astronauts are passed inside the object. Astronauts is array of all astronauts
 * @param paginationOptions are values (include functions) for table pagination
 * @returns table of astronauts
 */
const AstronautsTable = ({
  astronauts,
  paginationOptions,
  onCreateNewAstronaut,
  onUpdateAstronaut,
  onDeleteAstronaut,
  onRowsPerPageChange,
  onPageChange
}: AstronautTableInterface
): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className={classes.header}>
                <TableCell>{AstronautsTableTranslations.HEADER_NAME}</TableCell>
                <TableCell>{AstronautsTableTranslations.HEADER_SURNAME}</TableCell>
                <TableCell>{AstronautsTableTranslations.HEADER_BIRTHDATE}</TableCell>
                <TableCell>{AstronautsTableTranslations.HEADER_SUPERPOWER}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {astronauts
                .slice(
                  paginationOptions.page * paginationOptions.rowsPerPage,
                  paginationOptions.page * paginationOptions.rowsPerPage + paginationOptions.rowsPerPage
                )
                .map(
                  (astronaut) => (
                    <AstronautsTableRow
                      astronaut={astronaut}
                      onUpdateAstronaut={onUpdateAstronaut}
                      onDeleteAstronaut={onDeleteAstronaut}
                    />
                  ))
              }
              <TableRow>
                <TableCell colSpan={5} className={classes.addCell}>
                  <Tooltip title={AstronautsTableTranslations.ADD_NEW_ASTRONAUT}
                  ><IconButton onClick={onCreateNewAstronaut}>
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={paginationOptions.rowsPerPageOptions}
          component={paginationOptions.component}
          count={paginationOptions.count}
          rowsPerPage={paginationOptions.rowsPerPage}
          page={paginationOptions.page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Paper>
    </>
  )
}

export default AstronautsTable;