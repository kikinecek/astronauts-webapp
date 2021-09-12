import { makeStyles } from '@material-ui/core/styles';
import {
  TableRow,
  TableCell,
  IconButton,
  Tooltip
} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import { dateFormatOptions } from "../../utility/date";
import { AstronautsTableTranslations } from "../../utility/translations";
import { AstronautTableRow } from "../../type/astronautComponent";

/**
 * Styles for the AstronautsTableRow
 */
const useStyles = makeStyles({
  cells: {
    "& > td": {
      textAlign: "center"
    }
  }
});

/**
 * Function representating row for astronaut's table.
 * Incudes update/delete buttons.
 * !!! All parameters are passed inside the object (so there is technically only 1 parameter)
 * @param astronaut is passed inside the object. Contains astronaut's data for the row.
 * @param onUpdateAstronaut is function that is triggered when updateAstronaut button is clicked
 * @param onDeleteAstronaut is function that is treggered when deleteAstronaut button is clicked
 * @returns table row
 */
const AstronautsTableRow = ({
  astronaut,
  onUpdateAstronaut,
  onDeleteAstronaut
}: AstronautTableRow
): JSX.Element => {
  const classes = useStyles();

  return (
    <TableRow className={classes.cells} key={astronaut.id}>
      <TableCell>{astronaut.name}</TableCell>
      <TableCell>{astronaut.surname}</TableCell>
      <TableCell>{astronaut.birthdate.toLocaleDateString("en-US", dateFormatOptions)}</TableCell>
      <TableCell>{astronaut.superpower}</TableCell>
      <TableCell>
        <div>
          <Tooltip title={AstronautsTableTranslations.UPDATE_ASTRONAUT}>
            <IconButton onClick={() => onUpdateAstronaut(astronaut)}>
              <CreateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={AstronautsTableTranslations.REMOVE_ASTRONAUT}>
            <IconButton onClick={() => onDeleteAstronaut(astronaut.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  )
};

export default AstronautsTableRow;