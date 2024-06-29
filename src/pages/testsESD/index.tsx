import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { columns } from "./table/columns";
import {  ITestEsdProps, TestEsdExport, initialStateData } from "./interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "@mui/material";
import { COLORS } from "../../themes/colors";
import { Alert } from "../../components/alert";
import { InitialAlertProps } from "../../components/alert/interfaces";
import { Loader } from "../../components/loader";
import { findAllTestEsdNotPaginated, findManyTestEsds, searchForTestEsds } from "../../services/testEsd";
import { ToolbarTestEsd } from "./components/toolbar";
import { formatTime } from "../../utils/date";
import ExportXLSX from "../../utils/exportXLSX";

export function TestsESD() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(11);
  const [data, setData] = useState(initialStateData);

  const [dataRefresh, setDataRefresh] = useState(false);
  const [alert, setAlert] = useState(InitialAlertProps);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(page + 1);
  };

  //Exportar todos os items da tabela de listagem.
  const handleExport = useCallback(async () => {
    try {
      const response = await findAllTestEsdNotPaginated();
      if (response.status === 200) {
        const parseData = response.data.testEsd.map((item: TestEsdExport) => ({
          Nome: item.Employee?.name,
          Departamento: item.Employee?.Department?.description,
          Turno: item.Employee?.Shift?.description,
          Linha: item.Employee?.Line?.code,
          "Bota antiestática": item.boot,
          "Pulseira antiestática": item.bracelete,
          "Data de criação": formatTime(item.createdAt),
        }));
        ExportXLSX(parseData, "Lista de Teste ESD");
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Erro ao emitir relatório de usuários",
        type: "error",
      });
    }
  }, []);


  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await findManyTestEsds(page);
        const testEsds = response.data.testEsds;
        const customTestEsdList = testEsds.map((item: ITestEsdProps) => ({
          ...item,
          name: item.Employee?.name,
          department: item.Employee?.Department?.description,
          shift: item.Employee?.Shift?.description,
          line: item.Employee?.Line?.code,
        }));
        setData({
          testEsd: customTestEsdList,
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
        const response = await searchForTestEsds(page, searchValue);
        const testsEsd = response.data.testEsds;
        const customTestEsdList = testsEsd.map((item: ITestEsdProps) => ({
          ...item,
          name: item.Employee?.name,
          department: item.Employee?.Department?.description,
          shift: item.Employee?.Shift?.description,
          line: item.Employee?.Line?.code,
        }));

        setData({
          testEsd: customTestEsdList,
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
          <ToolbarTestEsd
            titleModule="Gerenciador de Testes ESD"
            onSearch={handleSearch}
            handleExport={handleExport}
            onUpload={() => {}}
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
                {data.testEsd.map((testesd) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={testesd.id}
                      sx={{
                        backgroundColor:
                          selectedRow === testesd.id
                            ? COLORS.PRIMARY_50
                            : "inherit",
                        "&:hover": {
                          backgroundColor: COLORS.PRIMARY_50,
                        },
                      }}
                    >
                      {columns.map((column) => {
                        const value = testesd[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            size="small"
                          >
                            {column.renderCell
                              ? column.renderCell({ row: testesd })
                              : value}
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
