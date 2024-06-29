import { Box, Chip, Typography } from "@mui/material";
import { COLORS } from "../../../../themes/colors";

interface CustomChipProps {
    label: string;
    icon: React.ReactElement;
    color: string;
    variant?: "outlined" | "filled";
  }
  
  export const CustomChip = ({
    label,
    icon,
    color,
    variant = "filled",
  }: CustomChipProps) => {
    return (
      <Chip
        label={
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              fontWeight: "500",
              color: COLORS.NEUTRAL_700,
            }}
          >
            {label}
            <Box sx={{ marginLeft: 1, pt: "0.2rem" }}>{icon}</Box>
          </Typography>
        }
        sx={{
          backgroundColor: variant === "outlined" ? "transparent" : color,
          border: variant === "outlined" ? `1px solid ${color}` : "none",
          flex: 1,
          justifyContent: "center",
          pt: "0.2rem",
        }}
        variant={variant}
      />
    );
  };