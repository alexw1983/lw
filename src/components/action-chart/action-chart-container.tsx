import { connect } from "react-redux";
import { takeDamage } from "../../redux/actions/other-actions";
import { ILwState, IAdventure } from "../../redux/types";
import { selectAdventure } from "../../redux/selectors/adventures.selectors";
import { saveAdventure } from "../../redux/actions/adventures-action";
import ActionChartView from "./action-chart-view";

const mapStateToProps = (state: ILwState, ownProps: any) => ({
  adventure: selectAdventure(state, ownProps.playerId, ownProps.bookNumber),
});

const mapDispatchToProps = (dispatch: any) => ({
  saveAdventure: (adventure: IAdventure) => dispatch(saveAdventure(adventure)),
  takeDamage: (damage: number) => dispatch(takeDamage(damage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionChartView);
