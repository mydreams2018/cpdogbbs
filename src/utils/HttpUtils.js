import axios from "axios";

function getApiImg(setCheckCode){
    axios({
        method: 'get',
        url: 'https://www.kungreat.cn/api/image',
        headers: {'Content-Type': 'text/plain',
            "Accept":"*/*"},
        responseType: 'text'
    }).then(function (response) {
        if(response.data){
            setCheckCode(response.data);
        }
    }).catch(function (error) {
        setCheckCode("获得验证码错误");
    });
}

export {getApiImg}