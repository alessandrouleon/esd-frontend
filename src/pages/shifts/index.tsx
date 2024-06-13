// import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { findManyShift } from "../../services/shifts";
import { columns } from "./table/columns";
import { initialStateData } from "./interfaces/shifits";
import { useEffect, useState } from "react";
import { formatTime } from "../../utils/date";
import { Grid, IconButton } from "@mui/material";
import { COLORS } from "../../themes/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { HeaderTable } from "../../components/heeader";

export function Shifts() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState(initialStateData);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchValue, setSearchValue] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = (value: any) => {
    setSearchValue(value);

  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reseta para a primeira página ao alterar o número de linhas por página
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findManyShift(page + 1);
        setData({
          shifts: response.data.shifts,
          total: response.data.total,
          currentPage: response.data.currentPage,
          nextPage: response.data.nextPage,
          prevPage: response.data.prevPage,
          lastPage: response.data.lastPage,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  return (
    <>
      <HeaderTable
        titleModule="Turno"
        onSearch={handleSearch}
        textBtnExp="Exportar"
        textBtnImp="Importar"
        textBtnCreate="Novo Turno"
      />
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: COLORS.PRIMARY_100,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.shifts.map((shift) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={shift.id}>
                  {columns.map((column) => {
                    const value = shift[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        size="small"
                      >
                        {column.id === "createdAt" ? formatTime(value) : value}
                        {column.id === "actions" && (
                          <Grid container spacing={1} justifyContent="center">
                            <Grid item>
                              <IconButton size="small" onClick={() => {}}>
                                <EditIcon />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton size="small" onClick={() => {}}>
                                <DeleteOutlineIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
