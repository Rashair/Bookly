import React from "react";
import Checkbox from "react-three-state-checkbox";

class Bookings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      bookings: null,
      status: null
    };

    this.fetchBookings = this.fetchBookings.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.fetchBookings(null);
  }

  componentDidUpdate() {
    // this.fetchBookings(this.state.status);
  }

  fetchBookings(newStatus) {
    // TODO : put url in config file
    const url = `http://localhost:8080/booking${
      newStatus !== null ? `?status=${newStatus.toString()}` : ""
    }`;
    fetch(url)
      .then(data => data.json())
      .then(
        bookings => {
          this.setState({ bookings, isLoading: false, status: newStatus });
        },
        error => {
          // eslint-disable-next-line no-console
          console.log(`ERROR: ${error}`);
        }
      );
  }

  handleCheck() {
    const currValue = this.state.status;
    // eslint-disable-next-line no-nested-ternary
    let newValue = null;
    if (currValue === null) {
      newValue = true;
    } else if (currValue === true) {
      newValue = false;
    }

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
            {bookings &&
              bookings.map((booking, ind) => (
                <BookingLine key={booking.id} booking={booking} ind={ind} />
              ))}
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
    <td>
      {booking.active === true ? (
        <i className="fas fa-check" />
      ) : (
        <i className="fas fa-times" />
      )}
    </td>
  </tr>
);

export default Bookings;
