Tiempo = (function (Events) {

    var Tiempo = function() {
        this.construct.apply(this, arguments);
    }

    function cuenta(){
        if(window.navigator.onLine) {
            console.log("si se puede")
        } else {
            alert("si se pudo?")
        }
    }
    
    setInterval(cuenta,1000)

    return Tiempo;
})(Events)



