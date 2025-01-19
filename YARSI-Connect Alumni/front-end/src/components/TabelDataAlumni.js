import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMovieData } from "@mui/x-data-grid-generator";
import { Container } from "react-bootstrap";

const VISIBLE_FIELDS = [
  "title",
  "company",
  "director",
  "year",
  "cinematicUniverse",
];

function TabelDataAlumni() {
  const data = useMovieData();

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () =>
      data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns]
  );

  return (
    <Container>
      <DataGrid
        {...data}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Container>
  );
}

export default TabelDataAlumni;
