
function autoViewformlogin(){
   let viewformlogin = document.getElementById("view-form-login");
   if(viewformlogin){
       let bodyHeight = document.documentElement.clientHeight;
       let rtHeight = bodyHeight-65 - viewformlogin.clientHeight;
       if(rtHeight > 0){
           viewformlogin.style.paddingTop = (rtHeight-65)/2+"px";
       }
   }
}

export {autoViewformlogin};