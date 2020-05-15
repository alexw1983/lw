import { connect } from "react-redux";
import { ILwState } from "../../redux/state";
import PlayersListView from "./players-list-view";
import { toggleNewPlayerForm } from "../../redux/actions/player-actions";

const mapStateToProps = (state: ILwState) => ({
  showNewPlayerForm: state.showNewPlayerForm,
  players: state.players,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleNewPlayerForm: () => dispatch(toggleNewPlayerForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersListView);
