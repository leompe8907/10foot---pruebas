scrollup = (function (Scene) {

    var scrollup = function () {
        this.construct.apply(this, arguments);
    };

    $.extend(true, scrollup.prototype, Scene.prototype, {

    })

return scrollup;

})(Scene);

var boton = document.querySelector("ir");

if(document.documentElement.scrollTo > 100){
    document.querySelector("ir").style.display="block"
}
else{
    document.querySelector("ir").style.display="none"
}

boton.addEventListener("click",function(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})