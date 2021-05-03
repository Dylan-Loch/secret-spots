import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup , LeafletMap, eventHandlers } from 'react-leaflet';
import { map } from 'leaflet';
import axios from 'axios';
import { icons } from './Icons';


/**
 * COMPONENT
 */
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [],
      newSpot: {
        title: "",
        location: "",
        category: "",
        description: "",
        notes: "",
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount(){
    const { data: spots } = await axios.get('/api/spots');
    this.setState({
      spots: spots
    })
  }

  handleChange(evt){
    let targetName = evt.target.name;
    let value = evt.target.value;
    this.setState({
      newSpot: {...this.state.newSpot, [targetName]: value}
    })
  }

  async handleSubmit(){
    const newSpot = this.state.newSpot;
    const { data: spot } = await axios.post('/api/spots', newSpot);
    this.setState({
      spots: [...this.state.spots, spot]
    })
  }

  handleClick(evt) {
    console.log('location-->', evt.latlng)
    navigator.clipboard.writeText(evt.latlng);
  }

  render() {
    
    const Frisco = [39.5764, -106.093]
    
    return (
      <>
        <div id="logged">Logged in as {this.props.username}</div>
        <MapContainer center={Frisco} zoom={13} scrollWheelZoom={true} eventHandlers={this.handleClick}>
          <div id="mapid"></div>
            <TileLayer
              // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              url="https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=ziLWSLIxln34WCM7lthh"
            />
          <Marker position={Frisco} icon={icons['home']}>
            <Popup>
              Home Base! 
            </Popup>
          </Marker>
          {this.state.spots.map((spot) =>
            <Marker key={spot.id} position={[Number(spot.location.split(',')[0]), Number(spot.location.split(',')[1])]} icon={icons[spot.category]}>
              <Popup>
                <Link to={{pathname: `/spots/${spot.id}`, state: {spot: spot}}}>
                  <h2>{spot.title}</h2>
                  <span>{spot.category} <br/> {spot.location}</span>
                </Link>
              </Popup>
            </Marker>
          )}
        </MapContainer>
        <br />
        <div id="newSpot" className="spotForm">
          <h3 id="new-spot-title">ADD A NEW SPOT!</h3>
          <form id='new-spot-form' className="spotForm" onSubmit={this.handleSubmit}>
            <label htmlFor='title'>Spot Title</label>
            <input name='title' onChange={this.handleChange}></input>

            <label htmlFor='location'>Coordinates</label>
            <input name='location' onChange={this.handleChange}></input>

            <label htmlFor='category'>Category</label>
            <select name='category' defaultValue="" onChange={this.handleChange}>
              <option value="" disabled hidden>Select Category</option>
              <option value="hotspring">Hot Spring</option>
              <option value="camping">Camping</option>
              <option value="hiking">Hiking</option>
              <option value="ski">Ski</option>
              <option value="fishing">Fishing</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor='description'>Description</label>
            <input name='description' onChange={this.handleChange}></input>

            <label htmlFor='notes'>Notes</label>
            <input name='notes' onChange={this.handleChange}></input>
            <br/> <br/>
            <button type='submit'>Submit</button>
          </form>
        </div>
        <div>
          <h1 id="your-landmarks">YOUR LANDMARKS</h1>
          <div>
            {this.state.spots.length === 0 ? <h1>No spots, go explore!</h1> : (
              this.state.spots.map((spot) => (
                <div className={spot.category} key={spot.id}>
                  <Link to={{pathname: `/spots/${spot.id}`, state: {spot: spot}}}>
                    <div id='item-dec'>
                      <h3 id='title'>{spot.title}</h3>
                      <div>{spot.category}</div>
                      <div>{spot.location}</div>
                    </div>
                  </Link>
                  <br />
                </div>
              )))}
          </div>
        </div>
      </>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
