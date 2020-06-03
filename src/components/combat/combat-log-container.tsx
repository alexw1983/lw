import { ILwState, IAdventure } from "../../redux/types";
import { selectAdventure } from "../../redux/selectors/adventures.selectors";
import CombatLogView from "./combat-log-view";
import {
  saveAdventure,
  takeDamage,
} from "../../redux/actions/adventures-action";
import { connect } from "react-redux";

const mapStateToProps = (state: ILwState, ownProps: any) => ({
  adventure: selectAdventure(
    state,
    ownProps.match.params.playerId,
    ownProps.match.params.bookNumber
  ),
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  saveAdventure: (adventure: IAdventure) => dispatch(saveAdventure(adventure)),
  takeDamage: (damage: number) =>
    dispatch(
      takeDamage(
        damage,
        ownProps.match.params.bookNumber,
        ownProps.match.params.playerId
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CombatLogView);
