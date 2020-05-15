import { connect } from "react-redux";
import { ILwState, IPlayer } from "../../redux/state";
import NewPlayerFormView from "./new-player-form-view";
import { savePlayer } from "../../redux/actions/player-actions";

const mapStateToProps = (state: ILwState) => ({
  players: state.players,
});

const mapDispatchToProps = (dispatch: any) => ({
    savePlayer: (player: IPlayer) => dispatch(savePlayer(player))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPlayerFormView);