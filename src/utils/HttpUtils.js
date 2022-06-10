import axios from "axios";

function getApiImg(setCheckCode){
    axios({
        method: 'get',
        url: '/api/image',
        responseType: 'text'
    }).then(function (response) {
        if(response.data){
            setCheckCode(response.data);
        }
    }).catch(function (error) {
        setCheckCode("获得验证码错误");
    });
}

function getRigister(obj,callback){
    axios({
        method: 'post',
        url: '/api/register',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
            callback(response.data);
        }).catch(function (error) {
            console.log(error);
            callback(null);
        });
}

export {getApiImg,getRigister}