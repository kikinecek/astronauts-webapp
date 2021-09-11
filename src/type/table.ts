import React, { ElementType } from "react";

/** How many rows will be displayed in the table are limited to 5 and 10 only */
export type RowsPerPageOptionsType = 5 | 10;

/** Interface defines types of fields that need table pagination */
export interface TablePaginationDefinition {
  rowsPerPageOptions: RowsPerPageOptionsType[];
  component: ElementType;
  count: number;
  rowsPerPage: RowsPerPageOptionsType;
  page: number;
};