import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { findAllShiftNotPanitadet, findManyShift } from "../../services/shifts";
import { columns } from "./table/columns";
import {
  IFormUpdateShift,
  ShiftExport,
  initialShiftUpdate,
  initialStateData,
} from "./interfaces";
import { useCallback, useEffect, useState } from "react";
import { formatTime } from "../../utils/date";
import { Grid, IconButton } from "@mui/material";
import { COLORS } from "../../themes/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { HeaderTable } from "../../components/heeader";
import { CreateModal } from "./modal/createModal";
import { Alert } from "../../components/alert";
import { InitialAlertProps } from "../../components/alert/interfaces";
import { UpdateModal } from "./modal/updateModal";
import { DeleteModal } from "./modal/deleteModal";
import ExportCSV from "../../utils/exportCSV";

export function Shifts() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(11);
  const [data, setData] = useState(initialStateData);
  const [open, setOpen] = useState(false);
  const [dataRefresh, setDataRefresh] = useState(false);
  const [alert, setAlert] = useState(InitialAlertProps);
  const [shift, setShift] = useState<IFormUpdateShift>(initialShiftUpdate);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchValue, setSearchValue] = useState("");
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = (value: any) => {
    setSearchValue(value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpen = () => setOpen(!open);

  const handleUpdate = (item: IFormUpdateShift) => {
    setShift(item);
    setOpenUpdate(!openUpdate);
    setSelectedRow(item.id);
  };

  const handleOpenDelete = (item: IFormUpdateShift) => {
    setShift(item);
    setOpenDelete(!openDelete);
    setSelectedRow(item.id);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reseta para a primeira página ao alterar o número de linhas por página
  };

  //Exportar todos os items da tabela de listagem.
  const handleExport = useCallback(async () => {
    try {
      const response = await findAllShiftNotPanitadet();
      if (response.status === 200) {
        console.log("aqui::", response.data);
        const parseData = response.data.map((item: ShiftExport) => ({
          Código: item.code,
          Descrição: item.description,
          "Data de criação": formatTime(item.createdAt),
        }));
        ExportCSV(parseData, "Lista de Turnos");
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Erro ao emitir relatório de turnos",
        type: "error",
      });
    }
  }, []);

  const fetchData = async (page: number) => {
    try {
      const response = await findManyShift(page);
      setData({
        shifts: response.data.shifts,
        total: response.data.total,
        currentPage: response.data.currentPage,
        nextPage: response.data.nextPage,
        prevPage: response.data.prevPage,
        lastPage: response.data.lastPage,
      });
      setDataRefresh(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(page);
    setSelectedRow(null);
  }, [page, dataRefresh]);

  return (
    <>
      <Alert
        open={alert.open}
        onClose={() => setAlert({ ...alert, open: false })}
        message={alert.message}
        type={alert.type}
      />

      {open && (
        <CreateModal
          open={open}
          setOpen={setOpen}
          setPage={setPage}
          setDataRefresh={setDataRefresh}
          dataRefresh={dataRefresh}
          setAlert={setAlert}
        />
      )}

      {openUpdate && (
        <UpdateModal
          shift={shift}
          open={openUpdate}
          setOpen={setOpenUpdate}
          setAlert={setAlert}
          setDataRefresh={setDataRefresh}
          dataRefresh={dataRefresh}
        />
      )}

      {openDelete && (
        <DeleteModal
          shift={shift}
          open={openDelete}
          setOpen={setOpenDelete}
          setAlert={setAlert}
          setDataRefresh={setDataRefresh}
          dataRefresh={dataRefresh}
        />
      )}

      <HeaderTable
        titleModule="Turno"
        onSearch={handleSearch}
        textBtnExp="Exportar"
        handleExport={handleExport}
        textBtnImp="Importar"
        textBtnCreate="Novo Turno"
        handleSave={handleOpen}
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
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={shift.id}
                  sx={{
                    backgroundColor:
                      selectedRow === shift.id ? COLORS.PRIMARY_50 : "inherit",
                    "&:hover": {
                      backgroundColor: COLORS.PRIMARY_50,
                    },
                  }}
                >
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
                              <IconButton
                                size="small"
                                onClick={() => handleUpdate(shift)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton
                                size="small"
                                onClick={() => handleOpenDelete(shift)}
                              >
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
        rowsPerPageOptions={[0]}
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
