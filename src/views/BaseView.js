import './BaseView.css'

function BaseView(props){
    console.log(props.type);
    return (
        <div className={"base-view"}>
            <div className={"left"}>
                java-left
            </div>
            <div className={"right"}>
                java-right
            </div>
        </div>
    )
}

export default BaseView