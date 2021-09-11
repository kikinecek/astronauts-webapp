import { Astronaut, AstronautForm } from "./astronaut";
import { TablePaginationDefinition } from "./table";

/** Interface representing Astronauts */
export interface AstronautDialogInterface {
  astronaut?: Astronaut
  open: boolean,
  onClose: () => void,
  onSubmit: (data: AstronautForm) => void
};

/** Interface representing Astronauts table */
export interface AstronautTableInterface {
  astronauts: Astronaut[],
  paginationOptions: TablePaginationDefinition,
  onCreateNewAstronaut: () => void,
  onUpdateAstronaut: (astronaut: Astronaut) => void,
  onDeleteAstronaut: (astronautId: number) => void,
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onPageChange: (event: unknown, newPage: number) => void
}

/** Interface representing Astronauts table row */
export interface AstronautTableRow {
  astronaut: Astronaut,
  onUpdateAstronaut: (astronaut: Astronaut) => void,
  onDeleteAstronaut: (astronautId: number) => void
}