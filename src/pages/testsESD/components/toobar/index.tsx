import React, { useCallback, useEffect
    // , useRef 
} from "react";
import {
//   Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import AddIcon from "@mui/icons-material/Add";
// import Tooltip from "@mui/material/Tooltip";
import { COLORS } from "../../../../themes/colors";

interface HeaderProps {
  titleModule: string;
  onSearch: (searchValue: string) => void;
//   handleSave: () => void;
//   handleExport: () => void;
//   onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ToolbarTest({
  titleModule,
  onSearch,
//   handleSave,
//   handleExport,
//   onUpload,
}: HeaderProps) {
  const [searchValue, setSearchValue] = React.useState("");
//   const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClearSearch = useCallback(() => {
    setSearchValue("");
    onSearch("");
  }, [onSearch]);

  useEffect(() => {
    if (searchValue === "") {
      handleClearSearch();
    }
  }, [searchValue, handleClearSearch]);

//   const handleClickImport = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

  const clearSearchButton = (
    <IconButton
      edge="end"
      onClick={handleClearSearch}
      disabled={searchValue.trim().length === 0}
    >
      <CleaningServicesIcon />
    </IconButton>
  );

  return (
    <>
      <Grid container mb={2} alignItems="center">
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: COLORS.NEUTRAL_800 }}
          mr={5}
        >
          {titleModule}
        </Typography>
        <Grid item xs mr={2} style={{ textAlign: "right" }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Pesquisar..."
            sx={{
              borderRadius: "6rem",
              "& .MuiOutlinedInput-root": { borderRadius: "6rem" },
              width: 400,
            }}
            value={searchValue}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ pr: 1 }}>
                  {clearSearchButton}
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Grid>
        {/* <Grid item style={{ textAlign: "right" }}>
          <Tooltip title="Exportar planilha" placement="top">
            <Button
              variant="text"
              sx={{
                marginRight: "0.5rem",
                padding: "0.1rem 0 0.2rem 0",
                borderRadius: 50,
              }}
              onClick={handleExport}
            >
              <CloudDownloadIcon fontSize="large" />
            </Button>
          </Tooltip>
          <Tooltip title="Importar planilha" placement="top">
            <Button
              variant="text"
              onClick={handleClickImport}
              sx={{
                marginRight: "0.5rem",
                padding: "0.1rem 0 0.2rem 0",
                borderRadius: 50,
              }}
            >
              <CloudUploadIcon fontSize="large" />
            </Button>
          </Tooltip>
          <input
            hidden
            ref={fileInputRef}
            accept=".xlsx"
            type="file"
            onChange={(event) => {
              onUpload(event);
              event.currentTarget.value = "";
            }}
          />
          <Button
            variant="outlined"
            onClick={handleSave}
            sx={{
              marginLeft: "0.5rem",
              padding: 0,
              borderRadius: 50,
            }}
          >
            <AddIcon fontSize="large" />
          </Button>
        </Grid> */}
      </Grid>
    </>
  );
}
