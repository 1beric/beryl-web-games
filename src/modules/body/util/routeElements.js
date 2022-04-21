import createId from "../../../util/createId";
import FarmLife from "../../farmLife/components/FarmLife";
import Home from "../../home/components/Home";
import Mastermind from "../../mastermind/components/Mastermind";

const ROUTE_ELEMENTS = {
  HOME: {
    id: "HOME",
    title: "Beryl Web Games",
    path: "/",
    createPath: () => "/",
    valuablePath: "/",
    navable: false,
    header: true,
    component: Home,
  },
  MASTERMIND: {
    id: "MASTERMIND",
    title: "Mastermind",
    path: "/mastermind",
    createPath: () => "/mastermind/" + createId(),
    valuablePath: "/mastermind/:mastermindId",
    navable: true,
    header: true,
    extraRoute: {
      path: ":mastermindId",
    },
    component: Mastermind,
  },
  FARM_LIFE: {
    id: "FARM_LIFE",
    title: "Farm Life",
    path: "/farm-life",
    createPath: () => "/farm-life",
    valuablePath: "/farm-life",
    navable: true,
    header: true,
    component: FarmLife,
  },
};

export default ROUTE_ELEMENTS;
