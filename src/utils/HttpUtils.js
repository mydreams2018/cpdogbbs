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
            callback(error);
        });
}

function userLogin(obj,callback){
    axios({
        method: 'post',
        url: '/api/defaultLogin',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        console.log(error);
        callback(error);
    });
}

function rePassWord(obj,callback){
    axios({
        method: 'post',
        url: '/api/user/resetPassword',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        console.log(error);
        callback(error);
    });
}

function getUserInfo(obj,callback){
    axios({
        method: 'get',
        url: '/api/getCurrentUser',
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

function sendPorts(obj,callback){
    axios({
        method: 'post',
        url: '/api/report/insert',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        console.log(error);
        callback(error);
    });
}

function signByPrimaryKey(obj,callback){
    axios({
        method: 'post',
        url: '/api/userSign/selectByPrimaryKey',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        console.log(error);
        callback(error);
    });
}

function signByOn(obj,callback){
    axios({
        method: 'post',
        url: '/api/userSign/signOn',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        console.log(error);
        callback(error);
    });
}
function queryReplyWeek(obj,callback){
    axios({
        method: 'post',
        url: '/api/userReplyPort/selectAll',
        data: obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        console.log(error);
        callback(error);
    });
}

function queryHomeReport(obj,callback){
    axios({
        method: 'post',
        url: '/api/report/queryReport',
        data: obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        console.log(error);
        callback(error);
    });
}
function queryUserByAlias(obj,callback){
    axios({
        method: 'post',
        url: '/api/user/home',
        data: obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        console.log(error);
        callback(error);
    });
}

function queryPortDetails(obj,callback){
    axios({
        method: 'post',
        url: '/api/report/selectByPrimaryKey',
        data: obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        console.log(error);
        callback(error);
    });
}

function queryDetailsTextAnswer(obj,callback){
    axios({
        method: 'post',
        url: '/api/detailsText/queryDetails',
        data: obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
       callback(response.data);
   }).catch(function (error) {
       console.log(error);
       callback(error);
   });
}
function sendReplyAnswer(obj,callback){
    axios({
        method: 'post',
        url: '/api/detailsText/sendReply',
        data: obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        console.log(error);
        callback(error);
    });
}

function portsUploadImg(obj,callback){
    const data = new FormData();
    data.append('file', obj);
    axios({
        method: 'post',
        url: '/api/uploadImg',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        callback(error);
    });
}

function userIsCollect(obj,callback){
    axios({
        method: 'post',
        url: '/api/userCollect/selectByPrimaryKey',
        data: obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        callback(error);
    });
}
function sendCollect(obj,callback){
    axios({
        method: 'post',
        url: '/api/userCollect/sendCollect',
        data: obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then(function (response) {
        callback(response.data);
    }).catch(function (error) {
        callback(error);
    });
}
export {getApiImg,getRigister,userLogin,rePassWord,getUserInfo,sendPorts,signByPrimaryKey, signByOn,queryReplyWeek
    ,queryHomeReport,queryUserByAlias ,queryPortDetails ,queryDetailsTextAnswer,sendReplyAnswer,portsUploadImg
    ,userIsCollect ,sendCollect }