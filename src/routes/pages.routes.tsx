import Diversity2Icon from "@mui/icons-material/Diversity2";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import SpaceDashboardIcon  from "@mui/icons-material/SpaceDashboard";
import { Shifts } from "../pages/Shifts";
import { Departments } from "../pages/Departments";
import { Dashboards } from "../pages/Dashboards/inde";

export const APP_PAGES = [
  {
    title: "Dashboards",
    route: "/home",
    icon: <SpaceDashboardIcon />,
    component: <Dashboards />,
    showMenu: true,
  },
  {
    title: "Turno",
    route: "/turno",
    icon: <NightsStayIcon />,
    component: <Shifts />,
    showMenu: true,
  },
  {
    title: "Departamento",
    route: "/department",
    icon: <Diversity2Icon />,
    component: <Departments />,
    showMenu: true,
  },
];
