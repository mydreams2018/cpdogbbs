import { Map,ScaleControl, ToolBarControl, ControlBarControl, Geolocation ,Marker} from '@uiw/react-amap';
/*  eslint-disable  */
function Address(){
    return(
        <div className={"address-map"} style={{width:'100%',height: '70vh',border:"solid 1px black",boxSizing:"border-box"}}>
            <Map>
                <Marker visiable={true} title="老家" position={new AMap.LngLat(112.277112,31.785404)} />
                <ScaleControl offset={[16, 30]} position="LB" />
                <ToolBarControl offset={[16, 10]} position="RB" />
                <ControlBarControl offset={[16, 180]} position="RB" />
                <Geolocation
                    maximumAge={100000}
                    borderRadius="5px"
                    position="RB"
                    offset={[16, 80]}
                    zoomToAccuracy={true}
                    showCircle={true}
                />
            </Map>
        </div>
    )
}

export default  Address