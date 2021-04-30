import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { fetchProducts } from '../store/allProducts';

export class SingleSpot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let spots = this.props;
    if (!spots.length) {
      return <div>No spots, go explore!</div>;
    }
    return (
      <div id="single-spot">
        {spots.map((spot) => (
          <div key={spot.id}>
            <Link to={`/products/${spot.id}`}>
              <div id='spot-details'>
                <h1 id='name'>{spot.name}</h1>
                <div>Location: {spot.coordinates}</div>
                <p>Description: {spot.description}</p>
                <p>Notes: {spot.notes}</p>
              </div>
            </Link>
          </div>

        ))}
      </div>
    );
  }
}