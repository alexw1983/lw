import { connect } from "react-redux";
import { ILwState, IAdventure } from "../../redux/types";
import AdventureView from "./adventure.view";
import {
  selectAdventure,
  selectAdventuresForPlayer,
} from "../../redux/selectors/adventures.selectors";
import { saveAdventure } from "../../redux/actions/adventures-action";

const mapStateToProps = (state: ILwState, ownProps) => ({
  adventure: selectAdventure(
    state,
    ownProps.match.params.playerId,
    ownProps.match.params.bookNumber
  ),
  previousAdventures: selectAdventuresForPlayer(
    state,
    ownProps.match.params.playerId
  ),
});

const mapDispatchToProps = (dispatch: any) => ({
  saveAdventure: (adventure: IAdventure) => dispatch(saveAdventure(adventure)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdventureView);