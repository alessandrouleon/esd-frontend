import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { findManyLines, searchForLines } from "../../services/lines";
import { columns } from "./table/columns";
import {
    IFormUpdateLine,
    // ShiftExport,
    initialUpdateLine,
  initialLineData,
} from "./interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatTime } from "../../utils/date";
import { Grid, IconButton, debounce } from "@mui/material";
import { COLORS } from "../../themes/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Toolbar } from "../../components/toolbar";
 import { CreateModal } from "./modal/createModal";
import { Alert } from "../../components/alert";
import { InitialAlertProps } from "../../components/alert/interfaces";
import { UpdateModal } from "./modal/updateModal";
// import { DeleteModal } from "./modal/deleteModal";
// import ExportXLSX from "../../utils/exportXLSX";
// import axios from "axios";

export function Lines() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(11);
  const [data, setData] = useState(initialLineData);
  const [open, setOpen] = useState(false);
  const [dataRefresh, setDataRefresh] = useState(false);
  const [alert, setAlert] = useState(InitialAlertProps);
  const [line, setLine] = useState<IFormUpdateLine>(initialUpdateLine);
    const [openUpdate, setOpenUpdate] = useState(false);
  //   const [openDelete, setOpenDelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const handleSearch = (value: string) => {
     debouncedSearch(value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpen = () => setOpen(!open);

    const handleUpdate = (item: IFormUpdateLine) => {
      setLine(item);
      setOpenUpdate(!openUpdate);
      setSelectedRow(item.id);
    };

  //   const handleOpenDelete = (item: IFormUpdateShift) => {
  //     setShift(item);
  //     setOpenDelete(!openDelete);
  //     setSelectedRow(item.id);
  //   };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(page + 1);
  };

  //Exportar todos os items da tabela de listagem.
  //   const handleExport = useCallback(async () => {
  //     try {
  //       const response = await findAllShiftNotPanitadet();
  //       if (response.status === 200) {
  //         const parseData = response.data.map((item: ShiftExport) => ({
  //           Código: item.code,
  //           Descrição: item.description,
  //           "Data de criação": formatTime(item.createdAt),
  //         }));
  //         ExportXLSX(parseData, "Lista de Turnos");
  //       }
  //     } catch (error) {
  //       setAlert({
  //         open: true,
  //         message: "Erro ao emitir relatório de turnos",
  //         type: "error",
  //       });
  //     }
  //   }, []);

  //Inport file
  //   const handleUploadShift = async (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     const files = event.target.files;
  //     if (!files || files.length === 0) return;
  //     const file = files[0];
  //     try {
  //       const response = await uploadShift(file);
  //       if (response && (response.status === 201 || response.status === 200)) {
  //         setAlert({
  //           open: true,
  //           message: "Upload turno realizado com sucesso.",
  //           type: "success",
  //         });
  //       }
  //     } catch (error) {
  //       if (axios.isAxiosError(error) && error.response) {
  //         const { message } = error.response.data;
  //         setAlert({
  //           open: true,
  //           message: message || "Internal server error",
  //           type: "error",
  //         });
  //       } else {
  //         setAlert({
  //           open: true,
  //           message: "Erro ao emitir relatório de turnos",
  //           type: "error",
  //         });
  //       }
  //     }
  //   };

  const fetchData = async (page: number) => {
    try {
      const response = await findManyLines(page);
      console.log("linhas,", response.data.lines);

      setData({
        lines: response.data.lines,
        total: response.data.total,
        currentPage: response.data.currentPage,
        nextPage: response.data.nextPage,
        prevPage: response.data.prevPage,
        lastPage: response.data.lastPage,
      });
      setDataRefresh(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const searchData = useCallback(
    async (page: number) => {
      try {
        const response = await searchForLines(page, searchValue);
        setData({
          lines: response.data.lines,
          total: response.data.total,
          currentPage: response.data.currentPage,
          nextPage: response.data.nextPage,
          prevPage: response.data.prevPage,
          lastPage: response.data.lastPage,
        });
        setDataRefresh(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [searchValue]
  );

  //Função usada no seach
    const debouncedSearch = useMemo(
      () =>
        debounce((value: string) => {
          setSearchValue(value);
        }, 500),
      [setSearchValue]
    );

  useEffect(() => {
    if (searchValue === "") {
      fetchData(page + 1);
    } else {
      searchData(page + 1);
    }
    setSelectedRow(null);
  }, [page, dataRefresh, searchValue, searchData]);

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
          line={line}
          open={openUpdate}
          setOpen={setOpenUpdate}
          setAlert={setAlert}
          setDataRefresh={setDataRefresh}
          dataRefresh={dataRefresh}
        />
      )}

      {/* {openDelete && (
        <DeleteModal
          shift={shift}
          open={openDelete}
          setOpen={setOpenDelete}
          setAlert={setAlert}
          setDataRefresh={setDataRefresh}
          dataRefresh={dataRefresh}
        />
      )} */}

      {/* <Toolbar
        titleModule="Turno"
        onSearch={handleSearch}
        textBtnExp="Exportar"
        handleExport={handleExport}
        textBtnImp="Importar"
        onUpload={handleUploadShift}
        textBtnCreate="Novo Turno"
        handleSave={handleOpen}
      /> */}

      <Toolbar
        titleModule="Linha"
        onSearch={handleSearch}
        textBtnExp="Exportar"
        handleExport={() => {}}
        textBtnImp="Importar"
        onUpload={() => {}}
        textBtnCreate="Nova Linha"
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
            {data.lines.map((line) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={line.id}
                  sx={{
                    backgroundColor:
                      selectedRow === line.id ? COLORS.PRIMARY_50 : "inherit",
                    "&:hover": {
                      backgroundColor: COLORS.PRIMARY_50,
                    },
                  }}
                >
                  {columns.map((column) => {
                    const value = line[column.id];
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
                                 onClick={() => handleUpdate(line)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton
                                size="small"
                                // onClick={() => handleOpenDelete(shift)}
                                onClick={() => {}}
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
