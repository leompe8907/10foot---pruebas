function cuenta(){
    if(window.navigator.onLine) {
        console.log("si se puede")
    } else {
        alert("si se pudo?")
    }
}

setInterval(cuenta,1000)