import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl';

function Address(){
    return(
        <div className={"address-map"} style={{width:'100%'}}>
            <Map center={{lng: 112.277112, lat: 31.785404}} zoom="11">
                <Marker position={{lng: 112.277112, lat: 31.785404}} />
                <NavigationControl />
                <InfoWindow position={{lng: 112.275531, lat: 31.809464}} title="家乡"/>
            </Map>
        </div>
    )
}

export default Address