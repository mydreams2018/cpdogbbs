window.onresize= function(event) {

};
document.addEventListener('readystatechange', event => {
    console.log(event.target.readyState);
    autoViewformlogin();
});

function autoViewformlogin(){
   let viewformlogin = document.getElementById("view-form-login");
   let bodyHeight = document.body.clientHeight;
   let rtHeight = bodyHeight-130 - viewformlogin.clientHeight;
   if(rtHeight > 0){
       viewformlogin.style.paddingTop = (rtHeight-130)/2+"px";
   }
}