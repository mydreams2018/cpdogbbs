import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {portsUploadImg} from "../utils/HttpUtils";
import {notification} from "antd";
/*
upload（） 方法必须返回一个 promise：
通过成功上传包含有关上传文件信息的对象来解决（请参阅有关响应式图像的部分以了解更多信息），
由于错误而被拒绝，在这种情况下，任何内容都不会插入到内容中。
abort（） 方法必须允许编辑器中止上载过程。例如，当图像在上传完成之前被用户从内容中删除或编辑器实例被销毁时，这是必要的。

{
   default: 'http://example.com/images/image–default-size.png'
}
*/
const openNotificationWithIcon = (type,msg) => {
    notification[type]({
        message: '提醒',
        description: msg,
        duration:1.5
    });
};
class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve,reject) => {
                this._sendRequest(file,(rsp)=>{
                    if(rsp.status===1){
                        resolve({
                            default: rsp.action
                        });
                    }else{
                        openNotificationWithIcon('warning',"只支持jpg或gif格式的图片<1M");
                        reject(rsp.msg);
                    }
                });
            }));

    }

    _sendRequest(file,callback) {
        portsUploadImg(file,callback);
    }

    abort() {
        // Reject the promise returned from the upload() method.
        console.log("abort");
    }
}

function BaseCkedit(props) {
    return (
        <div className="base-ckedit">
            <CKEditor
                editor={ClassicEditor}
                config={{}}
                data={props.linkContext.detailsText}
                onReady={editor => {
                    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                        return new MyUploadAdapter(loader);
                    };
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    props.linkContext.detailsText = data;
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
}

export default BaseCkedit