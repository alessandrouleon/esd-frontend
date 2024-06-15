import FileSaver from "file-saver";
import * as XLSX from "xlsx";

interface CsvData {
  [key: string]: string | number | boolean | null;
}

export default function ExportCSV(csvData: CsvData[], fileName: string): void {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(csvData);
  // Definir a largura das colunas
  ws["!cols"] = [
    { wch: 20 },
    { wch: 30 }, 
    { wch: 30 }, 
    { wch: 30 }, 
    { wch: 30 }, 
    { wch: 30 }, 
    { wch: 30 }, 
  ];

  const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer: ArrayBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  }) as ArrayBuffer;
  const data: Blob = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
}
