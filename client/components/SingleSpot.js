import React from 'react';
// import { connect } from 'react-redux';
// import { fetchProducts } from '../store/allProducts';

export default class SingleSpot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let spot = this.props.location.state.spot;
        console.log('spot--->', this.props.location.state)
        console.log('props--->', this.props)
    return (
      <div id="single-spot">
              <div id='spot-details'>
                <h1 id='name'>{spot.name}</h1>
                <h5>{spot.category}</h5>
                <div>Coordinates: {spot.location}</div>
                <p>Description: {spot.description}</p>
                <p>Notes: {spot.notes}</p>
                <a href={`http://www.google.com/maps/dir//${spot.location}`}>Directions</a>
              </div>
      </div>
    );
  }
}