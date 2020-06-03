import { connect } from "react-redux";
import { ILwState, IAdventure, IEquipment } from "../../redux/types";
import {
  selectAdventure,
  selectCurrentEndurancePoints,
  selectCurrentBeltPouch,
  selectCurrentEquipment,
} from "../../redux/selectors/adventures.selectors";
import {
  saveAdventure,
  takeDamage,
  spendMoney,
  removeEquipment,
  addEquipment
} from "../../redux/actions/adventures-action";
import ActionChartView from "./action-chart-view";

const mapStateToProps = (state: ILwState, ownProps: any) => ({
  playerId: ownProps.playerId,
  bookNumber: ownProps.bookNumber,
  adventure: selectAdventure(state, ownProps.playerId, ownProps.bookNumber),
  endurancePoints: selectCurrentEndurancePoints(
    state,
    ownProps.playerId,
    ownProps.bookNumber
  ),
  beltPouch: selectCurrentBeltPouch(
    state,
    ownProps.playerId,
    ownProps.bookNumber
  ),
  equipment: selectCurrentEquipment(
    state,
    ownProps.playerId,
    ownProps.bookNumber
  ),
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  saveAdventure: (adventure: IAdventure) => dispatch(saveAdventure(adventure)),
  takeDamage: (damage: number) =>
    dispatch(takeDamage(damage, ownProps.bookNumber, ownProps.playerId)),
  spendMoney: (cost: number) =>
    dispatch(spendMoney(cost, ownProps.bookNumber, ownProps.playerId)),
  removeEquipment: (item: IEquipment) =>
    dispatch(removeEquipment(item, ownProps.bookNumber, ownProps.playerId)),
  addEquipment: (item: IEquipment) =>
    dispatch(addEquipment(item, ownProps.bookNumber, ownProps.playerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionChartView);
