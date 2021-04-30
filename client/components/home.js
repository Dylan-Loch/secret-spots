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
      spots: [
        {
          id: 1,
          name: 'Elk Creek Hot Spring',
          location: '39.572, -106.164',
          category: 'hot-spring',
          description: 'Small natural hot spring, about 1.5 miles from the trailhead. Big enough for 5-6 people',
          notes: 'Access road may be closed in winter',
        },
        {
          id: 2,
          name: 'Skyscraper Glacier',
          location: '39.956, -105.688',
          category: 'ski',
          description: 'Steep glacier that stays skiable through summer. Descent of about 750 vertical feet',
          notes: 'Six mile hike required. There is some cliff jumping at the lake at the bottom',
        }
      ],
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
        <div id="logged">Logged in as {this.props.username}</div>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
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
        <div id="newSpot">
          Add a new spot
        </div>
        <div>
          <h1>YOUR SPOTS</h1>
          <div>
            {this.state.spots.length === 0 ? <h1>No spots, go explore!</h1> : (
              this.state.spots.map((spot) => (
                <div className={spot.category} key={spot.id}>
                  <Link to={{pathname: `/spots/${spot.id}`, state: {spot: spot}}}>
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
