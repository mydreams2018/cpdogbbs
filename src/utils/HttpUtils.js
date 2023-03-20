import axios from "axios";
import cookies from "./Cookies";
axios.defaults.headers.common['jwtToken'] = cookies.getItem("jwtToken") || '';
axios.interceptors.response.use(function (response) {
    //2xx范围内的状态码都会触发该函数
    return response;
}, function (error) {
    //超出2xx范围的状态码都会触发该函数
    if(error.response.data && "用户已失效" === error.response.data.msg){
        userLogout({},(rsp)=>{
            if(rsp.status===1){
                cookies.removeItem("jwtToken","/");
                cookies.removeItem("JSESSIONID","/");
                cookies.removeItem("remember-me","/");
                window.location.reload();
            }
        });
    }
    return Promise.reject(error);
});

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

function userLogout(obj,callback){
    axios({
        method: 'post',
        url: '/api/clearAll',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then((response) => {
        callback(response.data);
    }).catch((error) => {
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

function acceptReply(obj,callback){
    axios({
        method: 'post',
        url: '/api/detailsText/acceptReply',
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

function updateUserDes(obj,callback){
    axios({
        method: 'post',
        url: '/api/user/updateByPrimaryKey',
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

function queryMyPorts(obj,callback){
    axios({
        method: 'post',
        url: '/api/report/myQueryReport',
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
function deleteMyPorts(obj,callback){
    axios({
        method: 'post',
        url: '/api/report/deleteByIdsOnUser',
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
function likePorts(obj,callback){
    axios({
        method: 'post',
        url: '/api/detailsText/likeAccount',
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
function editPortDetails(obj,callback){
    axios({
        method: 'post',
        url: '/api/detailsText/updateByPrimaryKey',
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
function queryPortCollections(obj,callback){
    axios({
        method: 'post',
        url: '/api/userCollect/queryReport',
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
function deletePortCollections(obj,callback){
    axios({
        method: 'post',
        url: '/api/userCollect/deleteReports',
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
function queryMyReplyPorts(obj,callback){
    axios({
        method: 'post',
        url: '/api/report/myReplyPorts',
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

function deleteMyReplyPorts(obj,callback){
    axios({
        method: 'post',
        url: '/api/detailsText/deleteByIdsOnUser',
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
function updateUserPassword(obj,callback){
    axios({
        method: 'post',
        url: '/api/user/rePass',
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
function collaborationCompanyQuery(obj,callback){
    axios({
        method: 'post',
        url: '/api/collaborationCompany/selectAll',
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

function managerAuthPort(obj,callback){
    axios({
        method: 'post',
        url: '/api/manager/getAllPorts',
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
function managerAuthPortDetails(obj,callback){
    axios({
        method: 'post',
        url: '/api/manager/selectByPrimaryKey',
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

function managerUpdatePortAuth(obj,callback){
    axios({
        method: 'post',
        url: '/api/manager/updatePortAuth',
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
function managerAuthPortsReply(obj,callback){
    axios({
        method: 'post',
        url: '/api/manager/getAllPortsReply',
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
function managerUpdateReplyPort(obj,callback){
    axios({
        method: 'post',
        url: '/api/manager/updateReplyPortAuth',
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
function managerGetUser(obj,callback){
    axios({
        method: 'post',
        url: '/api/manager/getAllUser',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then((response) => {
        callback(response.data);
    }).catch((error) => {
        console.log(error);
        callback(null);
    });
}
function updateUserIsManager(obj,callback){
    axios({
        method: 'post',
        url: '/api/manager/updateUserIsManager',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then((response) => {
        callback(response.data);
    }).catch((error) => {
        console.log(error);
        callback(null);
    });
}
function deleteUser(obj,callback){
    axios({
        method: 'post',
        url: '/api/manager/updateUserState',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then((response) => {
        callback(response.data);
    }).catch((error) => {
        console.log(error);
        callback(null);
    });
}
function updatePortIsTop(obj,callback){
    axios({
        method: 'post',
        url: '/api/manager/updatePortIsTop',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then((response) => {
        callback(response.data);
    }).catch((error) => {
        console.log(error);
        callback(null);
    });
}
function collaborationInsert(obj,callback){
    axios({
        method: 'post',
        url: '/api/manager/collaborationInsert',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then((response) => {
        callback(response.data);
    }).catch((error) => {
        console.log(error);
        callback(null);
    });
}
function selectAuthCount(obj,callback){
    axios({
        method: 'post',
        url: '/api/manager/selectAuthCount',
        data:obj,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
    }).then((response) => {
        callback(response.data);
    }).catch((error) => {
        console.log(error);
        callback(null);
    });
}
export {getApiImg,getRigister,userLogin,rePassWord,getUserInfo,sendPorts,signByPrimaryKey, signByOn,queryReplyWeek
    ,queryHomeReport,queryUserByAlias ,queryPortDetails ,queryDetailsTextAnswer,sendReplyAnswer,portsUploadImg
    ,userIsCollect ,sendCollect,acceptReply ,updateUserDes,queryMyPorts,deleteMyPorts,likePorts,editPortDetails,
    queryPortCollections,deletePortCollections,queryMyReplyPorts ,deleteMyReplyPorts,updateUserPassword,
    collaborationCompanyQuery,managerAuthPort,managerAuthPortDetails,managerUpdatePortAuth,managerAuthPortsReply
,managerUpdateReplyPort,userLogout,managerGetUser,updateUserIsManager,deleteUser,updatePortIsTop,collaborationInsert
,selectAuthCount}