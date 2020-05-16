import { connect } from "react-redux";
import { ILwState, IPlayer, IAdventure } from "../../redux/state";
import { savePlayer } from "../../redux/actions/player-actions";
import PlayerView from "./player.view";
import { selectPlayer } from "../../redux/selectors/players.selectors";

const mapStateToProps = (state: ILwState, ownProps) => ({
  player: selectPlayer(state, ownProps.match.params.playerId),
});

const mapDispatchToProps = (dispatch: any) => ({
  savePlayer: (player: IPlayer) => dispatch(savePlayer(player))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerView);
