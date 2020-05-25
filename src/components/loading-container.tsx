import { connect } from "react-redux";
import { toggleLoading } from "../redux/actions/other-actions";
import Loading from "./loading";
import { ILwState } from "../redux/types";

const mapStateToProps = (state: ILwState) => ({
  loading: state.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleLoading: () => dispatch(toggleLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
