function keypress(e, spectrum) {
    if (e.key == " ") {
        spectrum.togglePaused();
    } else if (e.key == "f") {
        spectrum.toggleFullscreen();
    } else if (e.key == "c") {
        spectrum.toggleColor();
    } else if (e.key == "ArrowUp") {
        spectrum.rangeUp();
    } else if (e.key == "ArrowDown") {
        spectrum.rangeDown();
    } else if (e.key == "ArrowLeft") {
        spectrum.rangeHalf();
    } else if (e.key == "ArrowRight") {
        spectrum.rangeDouble();
    } else if (e.key == "s") {
        spectrum.incrementSpectrumPercent();
    } else if (e.key == "w") {
        spectrum.decrementSpectrumPercent();
    } else if (e.key == "+") {
        spectrum.incrementAveraging();
    } else if (e.key == "-") {
        spectrum.decrementAveraging();
    } 
}

function main()
{
	var spectrum = new Spectrum(
        "waterfall", {
            spectrumPercent: 20
    });

    // Bind keypress handler
    window.addEventListener("keydown", function (e) {
        keypress(e, spectrum);
    });

    var socket = io.connect('/');

    socket.on('disconnect', function(){
    	console.log("disconnected from server")
    });

    socket.on('message', function(msg){
    	console.log("received message from server " + msg)

    	if (msg.center) {
    		spectrum.setCenterHz(msg.center);
    	}
    	if (msg.span) {
    		spectrum.setSpanHz(msg.span);
    	}

    })

    socket.on('data', function(data){

    	spectrum.addData(data);
    	
    })

}

window.onload = main;

