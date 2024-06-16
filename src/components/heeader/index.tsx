import React, { useCallback, useEffect } from "react";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { COLORS } from "../../themes/colors";

interface HeaderProps {
  titleModule: string;
  textBtnExp: string;
  textBtnImp: string;
  textBtnCreate: string;
  onSearch: (searchValue: string) => void;
  handleSave: () => void;
  handleExport: () => void;
}

export function HeaderTable({
  titleModule,
  textBtnExp,
  textBtnImp,
  textBtnCreate,
  onSearch,
  handleSave,
  handleExport,
}: HeaderProps) {
  const [searchValue, setSearchValue] = React.useState("");

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
                  <IconButton edge="end" onClick={handleClearSearch}>
                    <CleaningServicesIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Grid>
        <Grid item style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            sx={{
              marginRight: "0.5rem",
            }}
            onClick={handleExport}
          >
            {textBtnExp}
          </Button>
          <Button
            variant="outlined"
            sx={{
              marginRight: "0.5rem",
            }}
          >
            {textBtnImp}
          </Button>
          <Button variant="contained" onClick={handleSave}>
            {textBtnCreate}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
