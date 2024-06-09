import Diversity2Icon from "@mui/icons-material/Diversity2";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import SpaceDashboardIcon  from "@mui/icons-material/SpaceDashboard";
import { Shifts } from "../pages/shifts";
import { Departments } from "../pages/departments";
import { Dashboards } from "../pages/dashboards/inde";

export const APP_PAGES = [
  {
    title: "Dashboards",
    route: "/dashBoard",
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
