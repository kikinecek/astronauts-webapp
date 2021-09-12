import React, { useState, useEffect } from "react";
import AstronautsTable from "./AstronautsTable";
import AstronautsDialog from "./AstronautsDialog";
import { Astronaut, AstronautForm } from "../../type/astronaut";
import HttpResource from "../../resource";

import { TablePaginationDefinition, RowsPerPageOptionsType } from "../../type/table";

/**
 * Function represents component astronauts talbe container.
 * This componend manipulates (fetching, deleting, ...) with data and pass them to the table. 
 */
const AstronautsTableContainer = (

): JSX.Element => {
  /** Astronauts useState hook serves to carry all astronauts shown in the table */
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  /** useState hook for keeping astronaut that is being to be updated */
  const [updatedAstronaut, setUpdatedAstronaut] = useState<Astronaut | undefined>();
  /** This hook defines if dialog for creating astronaut is open or not */
  const [isAstronautDialogOpen, setIsAstronautDialogOpen] =
    useState<boolean>(false);

  /**
   * Function opens dialog for astronaut
   */
  const openAstronautDialog = (): void => {
    setIsAstronautDialogOpen(true)
  };
  /**
   * Function closes dialog for astronaut.
   * If updatedAstronaut hook is set then the function clears the hook
   */
  const closeAstronautDialog = (): void => {
    setIsAstronautDialogOpen(false)
    if (updatedAstronaut) {
      setUpdatedAstronaut(undefined);
    }
  };
  /**
   * Function opens dialog for astronaut and sets astronaut for update
   * @param astronaut is astronaut that is going to be updated
   */
  const openAstronautDialogForUpdate = (astronaut: Astronaut): void => {
    setUpdatedAstronaut(astronaut);
    openAstronautDialog();
  }

  /**
   * Function is called on astronauts dialog submit.
   * If updateAstroanut hook is set then it calls update from HttpResource
   * otherwise create from HttpResource
   * @param data are the new data for the astronaut
   */
  const submitAstronautDialog = (data: AstronautForm): void => {
    if (updatedAstronaut) {
      HttpResource.updateAstronaut(updatedAstronaut.id, data)
        .then(() => {
          reload();
          // updateAstronaut hook has to be cleared for next dialog usage
          setUpdatedAstronaut(undefined);
        });
    } else {
      HttpResource.createAstronaut(data).then(() => reload());
    }

    closeAstronautDialog();
  }

  /**
   * Function uses HttpResource to send request to delete astronaut
   * @param astronautId is id of the astronaut that is going to be deleted
   */
  const deleteAstronaut = (astronautId: number): void => {
    HttpResource.deleteAstronaut(astronautId).then(() => reload());
  }

  /** Hook to handle pages in the table */
  const [tablePaginationOptions, setTablePaginationOptions] = useState<TablePaginationDefinition>({
    rowsPerPageOptions: [5, 10],
    component: "div",
    count: astronauts.length,
    rowsPerPage: 5,
    page: 0
  });

    /**
   * Function is triggered when user wants to change page on the table
   * @param event is reacts event
   * @param newPage is new page number
   */
     const onPageChange = (event: unknown, newPage: number): void => {
      setTablePaginationOptions({
        ...tablePaginationOptions,
        page: newPage
      })
    };
  
    /**
     * Function is triggered when user wants to change rows per page on the table
     * @param event is reacts event
     */
    const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setTablePaginationOptions({
        ...tablePaginationOptions,
        // recasting is fine here since there are only options from RowsPerPageOptionsType to chose
        rowsPerPage: parseInt(event.target.value) as RowsPerPageOptionsType
      })
    }

  /**
   * Reload function fetches astronauts from BE and store them in "astronauts" useState hook
   */
  const reload = async (): Promise<void> => {
    const fetchedAstronauts: Astronaut[] = await HttpResource.getAstronauts();
    setAstronauts(fetchedAstronauts)
  };

  /**
   * Function resents pagination to page 0 and updates item count
   */
  const resetPagination = (): void => {
    setTablePaginationOptions({
      ...tablePaginationOptions,
      page: 0,
      count: astronauts.length
    })
  }

  /** This useEffect hook reaload astronauts once container component is loaded */
  useEffect(() => {
    reload();
  }, []);

  /**
   * This useEffect hook resents page and updates item count for table pagination
   * whenever astronauts are updated
   */
  useEffect(() => {
    resetPagination();
  }, [astronauts])

  return (
    <>
      <AstronautsTable
        astronauts={astronauts}
        paginationOptions={tablePaginationOptions}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        onCreateNewAstronaut={openAstronautDialog}
        onUpdateAstronaut={openAstronautDialogForUpdate}
        onDeleteAstronaut={deleteAstronaut}
      />
      <AstronautsDialog
        open={isAstronautDialogOpen}
        astronaut={updatedAstronaut}
        onClose={closeAstronautDialog}
        onSubmit={submitAstronautDialog}
      />
    </>
  )
};

export default AstronautsTableContainer;