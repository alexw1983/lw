import { connect } from "react-redux";
import { ILwState, IPlayer } from "../../redux/state";
import { savePlayer } from "../../redux/actions/player-actions";
import AdventureView from "./adventure.view";
import { selectAdventure } from "../../redux/selectors/players.selectors";

const mapStateToProps = (state: ILwState, ownProps) => ({
  adventure: selectAdventure(state, ownProps.match.params.playerId, ownProps.match.params.bookNumber)
});

const mapDispatchToProps = (dispatch: any) => ({
  savePlayer: (player: IPlayer) => dispatch(savePlayer(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdventureView);
