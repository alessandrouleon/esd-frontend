import Diversity2Icon from "@mui/icons-material/Diversity2";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import GroupIcon from "@mui/icons-material/Group";
import { Shifts } from "../pages/shifts";
import { Departments } from "../pages/departments";
import { Dashboards } from "../pages/dashboards/inde";
import { Lines } from "../pages/lines";
import { Employees } from "../pages/employees";
import { Users } from "../pages/users";

export const APP_PAGES = [
  {
    title: "Dashboards",
    route: "/dashBoard",
    icon: <SpaceDashboardIcon />,
    component: <Dashboards />,
    showMenu: true,
  },

  {
    title: "Usuários",
    route: "/users",
    icon: <GroupIcon />,
    component: <Users />,
    showMenu: true,
  },

  {
    title: "Funcionários",
    route: "/employee",
    icon: <Diversity3Icon />,
    component: <Employees />,
    showMenu: true,
  },

  {
    title: "Departamentos",
    route: "/department",
    icon: <Diversity2Icon />,
    component: <Departments />,
    showMenu: true,
  },

  {
    title: "Linhas",
    route: "/line",
    icon: <TimelineIcon />,
    component: <Lines />,
    showMenu: true,
  },
  {
    title: "Turnos",
    route: "/turno",
    icon: <NightsStayIcon />,
    component: <Shifts />,
    showMenu: true,
  },
];
