import currencyActions from "./currency";
import saveActions from "./save";
import inventoryActions from "./inventory";
import plantActions from "./plants";
import tileActions from "./tiles";

const farmLifeActions = {
  ...currencyActions,
  ...saveActions,
  ...inventoryActions,
  ...plantActions,
  ...tileActions,
};

export default farmLifeActions;
