import { connect } from "react-redux";
import { ILwState } from "../../redux/state";
import PlayersListView from "./players-list-view";

const mapStateToProps = (state: ILwState) => ({
  players: state.players,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersListView);
