import createId from "../../../util/createId";
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
};

export default ROUTE_ELEMENTS;
