import { Paper, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import themes from "../../../util/theme";
import Body from "../../body/components/Body";
import ReduxLoading from "./ReduxLoading";
import ROUTE_ELEMENTS from "../../body/util/routeElements";
import Header from "../../header/components/Header";
import InvalidPath from "../../invalidPath/components/InvalidPath";
import { Provider } from "react-redux";
import store, { persistor } from "../../../store";
import ErrorHandler from "./ErrorHandler";

const AppBase = ({ routes }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      }}
    >
      <Header />
      <Routes>
        {routes}
        <Route path="*" element={<InvalidPath />} />
      </Routes>
    </Paper>
  );
};

const RouterWrappedApp = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppBase
        routes={Object.values(ROUTE_ELEMENTS).map((route) => (
          <Route
            exact
            key={route.id}
            path={route.path}
            element={<Body elementId={route.id} />}
          >
            {route.extraRoute && (
              <Route
                path={route.extraRoute.path}
                element={<Body elementId={route.id} />}
              />
            )}
          </Route>
        ))}
      />
    </BrowserRouter>
  );
};

const PersistorWrappedApp = () => {
  return (
    <PersistGate loading={<ReduxLoading />} persistor={persistor}>
      <RouterWrappedApp />
    </PersistGate>
  );
};

const ReduxWrappedApp = () => {
  return (
    <Provider store={store}>
      <PersistorWrappedApp />
    </Provider>
  );
};

const ErrorHandlerWrappedApp = () => {
  return (
    <ErrorHandler>
      <ReduxWrappedApp />
    </ErrorHandler>
  );
};

const ThemeWrappedApp = () => {
  return (
    <ThemeProvider theme={themes.darkTheme}>
      <ErrorHandlerWrappedApp />
    </ThemeProvider>
  );
};

const App = ThemeWrappedApp;

export default App;
