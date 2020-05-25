import ActionChart from "./action-chart";
import { connect } from "react-redux";
import { takeDamage } from "../../redux/actions/other-actions";
import { ILwState } from "../../redux/types";

const mapStateToProps = (state: ILwState) => ({
  actionChart: state.actionChart,
});

const mapDispatchToProps = (dispatch: any) => ({
  takeDamage: (damage: number) => dispatch(takeDamage(damage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionChart);
