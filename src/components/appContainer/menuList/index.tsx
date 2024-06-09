import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { COLORS } from "../../../themes/colors";
import { APP_PAGES } from "../../../routes/pages.routes";

interface MenuListProps {
  open?: boolean;
}

export function MenuList({ open }: MenuListProps) {
  const navigate = useNavigate();
  const location = useLocation();


  const handleNavigate = (page: string) => {
    navigate(page);
  };

  return (
    <List>
      {APP_PAGES.filter((e) => e.showMenu === true).map((item, index) => (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: "block" }}
          onClick={() => handleNavigate(item.route)}
        >
          <ListItemButton
            sx={{
              minHeight: 40,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              ...(location.pathname === item.route &&
                !open && {
                  background: COLORS.PRIMARY_100,
                }),
              ...(location.pathname === item.route &&
                open && {
                  background: COLORS.PRIMARY_50,
                  color: COLORS.PRIMARY_500,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "2px",
                    backgroundColor: COLORS.PRIMARY_500,
                  },
                }),
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                margin: 0,
                justifyContent: "center",
                mr: open ? 3 : "auto",
                ...(location.pathname === item.route &&
                  !open && {
                    color: COLORS.PRIMARY_500,
                  }),
                ...(location.pathname === item.route &&
                  open && {
                    color: COLORS.PRIMARY_500,
                  }),
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                fontSize: "0.85rem",
                fontWeight: "400",
              }}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
