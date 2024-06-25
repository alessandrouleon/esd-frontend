import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { columns } from "./table/columns";
import {
  IFormUpdateUsers,
  IUsersProps,
  // IFormUpdateUsers,
  // IUsersProps,
  // UserExport,
  // initialUsersUpdate,
  initialStateData,
  initialUsersUpdate,
  // initialUsersUpdate,
} from "./interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Grid, IconButton, debounce } from "@mui/material";
import { COLORS } from "../../themes/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Toolbar } from "../../components/toolbar";
import { Alert } from "../../components/alert";
import { InitialAlertProps } from "../../components/alert/interfaces";
import { findManyUsers, searchForUsers } from "../../services/users";
import { CreateModal } from "./modal/createModal";
import { Loader } from "../../components/loader";
import { UpdateModal } from "./modal/updateModal";
// import { DeleteModal } from "./modal/deleteModal";
// import { formatTime } from "../../utils/date";
// import ExportXLSX from "../../utils/exportXLSX";
// import axios from "axios";

export function Users() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(11);
  const [data, setData] = useState(initialStateData);
  const [open, setOpen] = useState(false);
  const [dataRefresh, setDataRefresh] = useState(false);
  const [alert, setAlert] = useState(InitialAlertProps);
  const [user, setUser] = useState<IFormUpdateUsers>(initialUsersUpdate);
  const [openUpdate, setOpenUpdate] = useState(false);
  // const [openDelete, setOpenDelete] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpen = () => setOpen(!open);

  const handleUpdate = (item: IFormUpdateUsers) => {
    setUser(item);
    setOpenUpdate(!openUpdate);
    setSelectedRow(item.id);
  };

  // const handleOpenDelete = (item: IFormUpdateUsers) => {
  //   setUser(item);
  //   setOpenDelete(!openDelete);
  //   setSelectedRow(item.id);
  // };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(page + 1);
  };

  //Exportar todos os items da tabela de listagem.
  // const handleExport = useCallback(async () => {
  //   try {
  //     const response = await findAllEmployeeNotPaginated();
  //     if (response.status === 200) {
  //       const parseData = response.data.employees.map(
  //         (item: EmployeeExport) => ({
  //           Nome: item.name,
  //           Matricula: item.registration,
  //           Bota: item.boot,
  //           Pulseira: item.bracelete,
  //           Startos: item.status,
  //           Ocupação: item.occupation,
  //           Departamento: item.Department?.description,
  //           Turno: item.Shift?.description,
  //           Linha: item.Line?.code,
  //           "Data de criação": formatTime(item.createdAt),
  //         })
  //       );
  //       ExportXLSX(parseData, "Lista de Funcioários");
  //     }
  //   } catch (error) {
  //     setAlert({
  //       open: true,
  //       message: "Erro ao emitir relatório de funcionários",
  //       type: "error",
  //     });
  //   }
  // }, []);

  //Inport file
  // const handleUploadEmployee = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const files = event.target.files;
  //   if (!files || files.length === 0) return;
  //   const file = files[0];
  //   try {
  //     const response = await uploadEmployee(file);
  //     if (response && (response.status === 201 || response.status === 200)) {
  //       setAlert({
  //         open: true,
  //         message: "Upload do funcionário realizado com sucesso.",
  //         type: "success",
  //       });
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       const { message } = error.response.data;
  //       setAlert({
  //         open: true,
  //         message: message || "Internal server error",
  //         type: "error",
  //       });
  //     } else {
  //       setAlert({
  //         open: true,
  //         message: "Erro ao emitir relatório de turnos",
  //         type: "error",
  //       });
  //     }
  //   }
  // };

  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await findManyUsers(page);
        const users = response.data.users;
         const customUsersList = users.map((item: IUsersProps) => ({
         ...item,
           occupation: item.Employee?.occupation,
         }));
         
        setData({
          users: customUsersList,
          total: response.data.total,
          currentPage: response.data.currentPage,
          nextPage: response.data.nextPage,
          prevPage: response.data.prevPage,
          lastPage: response.data.lastPage,
        });

        setDataRefresh(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [page]
  );

  const searchData = useCallback(
    async (page: number) => {
      try {
        const response = await searchForUsers(page, searchValue);
        const users = response.data.users;
        const customUsersList = users.map((item: IUsersProps) => ({
          ...item,
          occupation: item.Employee?.occupation,
        }));
        
        setData({
          users: customUsersList,
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
  }, [page, searchValue, dataRefresh, searchData]);

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
          user={user}
          open={openUpdate}
          setOpen={setOpenUpdate}
          setAlert={setAlert}
          setDataRefresh={setDataRefresh}
          dataRefresh={dataRefresh}
        />
      )}

      {/* {openDelete && (
        <DeleteModal
          employee={employee}
          open={openDelete}
          setOpen={setOpenDelete}
          setAlert={setAlert}
          setDataRefresh={setDataRefresh}
          dataRefresh={dataRefresh}
        />
      )} */}

      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          {/* <Toolbar
            titleModule="Funcionários"
            onSearch={handleSearch}
            handleExport={handleExport}
            onUpload={handleUploadEmployee}
            handleSave={handleOpen}
          /> */}

          <Toolbar
            titleModule="Usuários"
            onSearch={handleSearch}
            handleExport={() => {}}
            onUpload={() => {}}
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
                {data.users.map((user) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={user.id}
                      sx={{
                        backgroundColor:
                          selectedRow === user.id
                            ? COLORS.PRIMARY_50
                            : "inherit",
                        "&:hover": {
                          backgroundColor: COLORS.PRIMARY_50,
                        },
                      }}
                    >
                      {columns.map((column) => {
                        const value = user[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            size="small"
                          >
                            {column.renderCell
                              ? column.renderCell({ row: user })
                              : value}
                            {column.id === "actions" && (
                              <Grid
                                container
                                spacing={1}
                                justifyContent="center"
                              >
                                <Grid item>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleUpdate(user)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Grid>
                                <Grid item>
                                  <IconButton
                                    size="small"
                                    // onClick={() => handleOpenDelete(user)}
                                    disabled={user.status !== "ativo"}
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
      )}
    </>
  );
}
