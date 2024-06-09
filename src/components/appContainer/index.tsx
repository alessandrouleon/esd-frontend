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
import { Button, List, ListItem, Menu } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuList } from "./menuList";
import { Content } from "./content";
import AvatarComponent from "../avatar";
import { signOut } from "../../contexts/Auth";
import { UserToken } from "../../services/localStorage";
import { getSingleRegistration } from "../../services/employees";
import { EmployeeProps } from "../../pages/employees/interfaces";
import { AppBar, Drawer, DrawerHeader } from "./styles";
import { COLORS } from "../../themes/colors";
import LogoESD from "../../assets/icon-esd.png";
import LogoALP from "../../assets/alp-software.png";
import ImageDefault from "../../assets/image_defalt.png";

interface AppContainerProps {
  children?: React.ReactNode;
}

export function AppContainer({ children }: AppContainerProps) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const data: string | null = UserToken.getLocalStorageToken();
  const username: string | null = UserToken.getLocalStorageName();
  const [foundUser, setFoundUser] = React.useState<EmployeeProps | undefined>(
    undefined
  );

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

  const handleFindUser = async () => {
    try {
      if (data) {
        const [, payload] = data.split(".");
        const decoded = JSON.parse(atob(payload));
        const employee = await getSingleRegistration(decoded.employeeId);
        return employee.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const fetchUser = async () => {
      const employee = await handleFindUser();
      setFoundUser(employee);
    };
    fetchUser();
  }, []);

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
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <AvatarComponent
                src={`${
                  foundUser?.imageId === "" || foundUser?.imageId === undefined
                    ? ImageDefault
                    : foundUser?.imageId
                } `}
                alt="Avatar"
                size={40}
                isOnline={true}
              />
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
              sx={{ mt: 5, mr: 4 }}
            >
              <Typography
                m={1}
                color={COLORS.NEUTRAL_800}
                fontSize={14}
                width={200}
              >
                <strong> Usuário: </strong>
                {username}
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
                  onClick={signOut}
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
            {theme.direction === "rtl" ? <MenuOpenIcon /> : <MenuOpenIcon />}
          </IconButton>
        </DrawerHeader>
        <MenuList open={open} />
        {open && (
          <List style={{ marginTop: `auto` }}>
            <ListItem
              style={{ display: "flex", flexDirection: "column" }}
            ></ListItem>
          </List>
        )}
      </Drawer>

      <Content>{children}</Content>
    </Box>
  );
}
