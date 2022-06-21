import './PreContent.css'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

/*
const createMarkup = () => {
    return {__html: props.portsInfoDetails.detailsText};
}
<div dangerouslySetInnerHTML={createMarkup()}></div>
*/

function PreContent(props){
    return(
        <div className={"pre-content"}>
            <CKEditor
                editor={ClassicEditor}
                disabled={true}
                data={props.portsInfoDetails.detailsText}/>
        </div>
    )
}
export default PreContent