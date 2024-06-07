import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
 import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, List, ListItem, Menu } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuList } from "./MenuList";
import { Content } from "./Content";
import LogoESD from "../../assets/icon-esd.png";
import LogoALP from "../../assets/alp-software.png";
import { AppBar, Drawer, DrawerHeader } from "./styles";
// import Cookies from 'universal-cookie';
// import MailIcon from "@mui/icons-material/Mail";
// import ApartmentIcon from "@mui/icons-material/Apartment";
import { COLORS } from "../../shared/themes/colors";
import { AccountCircle } from "@mui/icons-material";
// import VersionModal from '../ModalVersion/version';

interface AppContainerProps {
  children?: React.ReactNode;
}

export function AppContainer({ children }: AppContainerProps) {
  // const ITEM_HEIGHT = 100;
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  //const data = localStorage.getItem("data");
  // const user = JSON.parse(data ?? '{"result":true, "count":42}');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function Logout() {
    // const cookie = new Cookies();
    // cookie.remove('token');
    localStorage.removeItem("data");
    window.location.href = "/";
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: COLORS.PRIMARY_500,
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 0,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ color: COLORS.BACKGROUND_BASE }} />
            </IconButton>
            <img src={LogoESD} alt="Logo do ESD" style={{ width: "14%" }} />
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ backgroundColor: COLORS.BACKGROUND_BASE }}
            />
            <Typography
              color={COLORS.BACKGROUND_BASE}
              variant="body1"
              noWrap
              component="div"
            >
              ESD
            </Typography>
          </Box>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <AccountCircle fontSize="medium" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ mt: 4, mr: 4 }}
            >
              <Typography
                m={1}
                color={COLORS.NEUTRAL_800}
                fontSize={14}
                pl={2}
                pr={2}
              >
                Usuário
              </Typography>
              <Typography
                m={1}
                color={COLORS.NEUTRAL_800}
                fontSize={14}
                pl={2}
                pr={2}
              >
                matheus.castro
              </Typography>
              <Divider
                orientation="horizontal"
                variant="fullWidth"
                flexItem
                sx={{ backgroundColor: COLORS.BACKGROUND_BASE }}
              />
              <Box textAlign="start" mt={1}>
                <Button
                  fullWidth
                  variant="text"
                  onClick={() => Logout()}
                  startIcon={<LogoutIcon />}
                  sx={{ justifyContent: "flex-start", borderRadius: "0" }}
                >
                  <Typography fontSize={12}>Sair</Typography>
                </Button>
              </Box>
            </Menu>
       
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            background: `${COLORS.PRIMARY_500}`,
            width: "100%",
          }}
        >
          <img
            src={LogoALP}
            alt="Logo ALP"
            style={{
              height: "55%",
              display: "block",
              margin: "auto",
              paddingRight: "1rem",
            }}
          />
          <IconButton
            color="primary"
            aria-label="open drawer"
            sx={{
              marginLeft: 0,
              color: COLORS.BACKGROUND_BASE,
            }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <MenuOpenIcon />
            ) : (
              <MenuOpenIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}
        <MenuList open={open} />
        {open && (
          <List style={{ marginTop: `auto` }}>
            <ListItem style={{ display: "flex", flexDirection: "column" }}>
              {/* <VersionModal /> */}
            </ListItem>
          </List>
        )}
      </Drawer>

      <Content>{children}</Content>
    </Box>
  );
}
