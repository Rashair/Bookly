import React from "react";
import Checkbox from "react-three-state-checkbox";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { sendRequest } from "../helpers/functions";
import { API_URL, TOKEN_HEADER_KEY } from "../helpers/constants";
import { anyError } from "../redux/actions";

class Bookings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      bookings: null,
      status: null,
    };

    this.fetchBookings = this.fetchBookings.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.fetchBookings(null);
  }

  componentDidMount() {
    if (this.props.auth === null) {
      this.props.history.push("/");
    }
  }

  fetchBookings(newStatus) {
    if (this.props.auth === null) {
      return;
    }

    const { securityToken } = this.props.auth;
    const url = `${API_URL}/booking${newStatus !== null ? `?status=${newStatus.toString()}` : ""}`;
    sendRequest(url, "GET", {
      [TOKEN_HEADER_KEY]: securityToken,
    }).then(
      response => {
        if (response.ok) {
          response.json().then(json => this.setState({ bookings: json, isLoading: false, status: newStatus }));
        } else {
          this.props.history.push({ pathname: "/error" });
        }
      },
      errorResponse => {
        this.props.anyError(errorResponse);
      }
    );
  }

  handleCheck() {
    const currValue = this.state.status;
    let newValue = null;
    if (currValue === null) {
      newValue = true;
    } else if (currValue === true) {
      newValue = false;
    }

    this.setState({ isLoading: true });
    this.fetchBookings(newValue);
  }

  render() {
    const { bookings, isLoading } = this.state;

    if (isLoading) {
      return <div> Loading ...</div>;
    }

    return (
      <div className="container w-100">
        <table className="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th style={{ width: "10%" }} scope="col">
                #
              </th>
              <th style={{ width: "20%" }} scope="col">
                Type
              </th>
              <th scope="col">Booked by</th>
              <th scope="col">Date</th>
              <th scope="col">
                Active{" "}
                <Checkbox
                  checked={this.state.status}
                  indeterminate={this.state.status === null}
                  className="form-check-inline"
                  onChange={this.handleCheck}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings && bookings.map((booking, ind) => <BookingLine key={booking.id} booking={booking} ind={ind} />)}
          </tbody>
        </table>
        <span className="glyphicon glyphicon-align-left" aria-hidden="false" />
      </div>
    );
  }
}

const BookingLine = ({ booking, ind }) => (
  <tr>
    <th scope="row">{ind}</th>
    <td>{booking.type}</td>
    <td>
      {booking.owner.first_name} {booking.owner.last_name} ({booking.owner.id})
    </td>
    <td>{booking.start_date_time}</td>
    <td>{booking.active === true ? <i className="fas fa-check" /> : <i className="fas fa-times" />}</td>
  </tr>
);

const mapStateToProps = (state /* , ownProps */) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Bookings));
