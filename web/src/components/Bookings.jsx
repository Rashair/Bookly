import React from "react";

class Bookings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      bookings: []
    };
  }

  componentDidMount() {
    // TODO : put this in config file
    fetch("http://localhost:8080/booking")
      .then(data => data.json())
      .then(
        bookings => {
          this.setState({ bookings, isLoading: false });
        },
        error => {
          // eslint-disable-next-line no-console
          console.log(`ERROR: ${error}`);
        }
      );
  }

  render() {
    const { bookings, isLoading } = this.state;

    if (isLoading) {
      return <div> Loading ...</div>;
    }

    return (
      <div>
        {bookings &&
          bookings.map(booking => (
            <BookingLine key={booking.id} booking={booking} />
          ))}
      </div>
    );
  }
}

const BookingLine = ({ booking }) => (
  <div>
    {booking.owner.first_name} booking: ({booking.type}{" "}
    {booking.start_date_time}, active: {booking.active.toString()})
  </div>
);

export default Bookings;
