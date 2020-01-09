import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Forbidden extends React.Component {
  componentDidMount() {
    if (this.props.auth === null) {
      this.props.history.push("/");
    }
  }

  render() {
    return <div>You do not have access to this resource</div>;
  }
}
const mapStateToProps = (state /* , ownProps */) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, null)(withRouter(Forbidden));
