import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


/**
 * COMPONENT
 */
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [{
        id: 1,
        name: 'Elk creek hot spring',
        location: '0, 0',
        category: 'hot spring',
        description: 'Small natural hot spring, about 1.5 miles from the trailhead. Big enough for 5-6 people',
        notes: 'Access road may be closed in winter'
      }],
    }
  }

  render() {

    // function LocationMarker() {
    //   const [position, setPosition] = useState(null)
    //   const map = useMapEvents({
    //     click() {
    //       map.locate()
    //     },
    //     locationfound(e) {
    //       setPosition(e.latlng)
    //       map.flyTo(e.latlng, map.getZoom())
    //     },
    //   })
    
    //   return position === null ? null : (
    //     <Marker position={position}>
    //       <Popup>You are here</Popup>
    //     </Marker>
    //   )
    // }
    
    const position = [39.5764, -106.093]
    
    return (
      <>
        <div>Logged in as {this.props.username}</div>
        <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
          <div id="mapid"></div>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {/* <LocationMarker /> */}
        </MapContainer>
        <br />
        <div>
          <h1>YOUR SPOTS</h1>
          <div>
            {this.state.spots.length === 0 ? <h1>No spots, go explore!</h1> : (
              this.state.spots.map((spot) => (
                <div id="individual-spot" key={spot.id}>
                  <Link to={`/spots/${spot.id}`} >
                    <div id='item-dec'>
                      <h3 id='title'>{spot.name}</h3>
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
