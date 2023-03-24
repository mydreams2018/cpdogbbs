
function autoViewformlogin(){
   let viewFormLogin = document.getElementById("view-form-login");
   if(viewFormLogin){
       let bodyHeight = document.documentElement.clientHeight;
       let rtHeight = bodyHeight-65 - viewFormLogin.clientHeight;
       if(rtHeight > 0){
           viewFormLogin.style.paddingTop = (rtHeight-65)/2+"px";
       }
   }
}

export {autoViewformlogin};