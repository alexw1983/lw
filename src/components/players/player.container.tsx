import { connect } from "react-redux";
import { ILwState, IPlayer, IAdventure } from "../../redux/types";
import { savePlayer } from "../../redux/actions/player-actions";
import PlayerView from "./player.view";
import { selectPlayer } from "../../redux/selectors/players.selectors";
import { selectAdventuresForPlayer } from "../../redux/selectors/adventures.selectors";
import { saveAdventure, removeAdventure } from "../../redux/actions/adventures-action";

const mapStateToProps = (state: ILwState, ownProps) => ({
  player: selectPlayer(state, ownProps.match.params.playerId),
  adventures: selectAdventuresForPlayer(state, ownProps.match.params.playerId),
});

const mapDispatchToProps = (dispatch: any) => ({
  savePlayer: (player: IPlayer) => dispatch(savePlayer(player)),
  saveAdventure: (adventure: IAdventure) => dispatch(saveAdventure(adventure)),
  removeAdventure : (adventure: IAdventure) => dispatch(removeAdventure(adventure))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerView);
