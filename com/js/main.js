////////////////////////////////////////////////////////////////////
//Variables globals
var width;
var height;
var audio_file = new Audio('audio/music/04-Aure_woodwind_conga.wav');
var splashLoop = false;
////////////////////////////////////////////////////////////////////
window.onload = function () {
    //Començar animació i on click començar aplicació
    splashAnimation();
    document.getElementById("playIMG").addEventListener("click", startApp, false);
}
////////////////////////////////////////////////////////////////////
function startApp() {
    //Començar l'aplicació
    var app;

    if (document.readyState == "complete") {

        $("#splashIMG").delay(100).attr("src", "img/splash/splash_frame_4.png");

        app = new clsPlatformGame(window, document);
        audio_file.play();

        splashLoop = true;

        //Eliminar animació
        document.getElementById("playIMG").removeEventListener("click", startApp, false);
        document.getElementById("splashIMG").remove();
        document.getElementById("playIMG").remove();
        document.getElementById("divID").remove();

    }
}
////////////////////////////////////////////////////////////////////
//ANIMACIONS DE LA PANTALLA PRINCIPAL (ABANS DE COMENÇAR L'APLICACIÓ)
function splashAnimation() {

    $("#splashIMG").animate({
        height: 'toggle'
    }).delay(300).queue(function (next) { changeFrame(2); next(); })
        .delay(300).queue(function (next) { changeFrame(3); next(); })
        .delay(300).queue(function (next) { changeFrame(4); next(); })
        .delay(300).queue(function (next) { changeFrame(5); next(); })
        .delay(500).queue(function (next) { changeFrame(6); next(); })
        .delay(500).queue(function (next) { changeFrame(7); next(); })
        .delay(500).queue(function (next) { changeFrame(8); next(); })
        .delay(500).queue(function (next) { changeFrame(9); next(); })
        .delay(500).queue(function (next) { changeFrame(10); next(); })
        .delay(500).queue(function (next) { changeFrame(11); next(); })
        .delay(500).queue(function (next) { changeFrame(12); next(); })
        .delay(10).queue(function (next) { loopFrames(); next(); })

}

var n = 0;

function loopFrames() {
    n++;
    console.log("hi");
    if (n == 1) {
        $("#splashIMG")
            .delay(500).queue(function (next) { changeFrame(13); next(); })
            .delay(500).queue(function (next) { changeFrame(14); next(); })
            .delay(500).queue(function (next) { changeFrame(15); next(); })
            .delay(500).queue(function (next) { changeFrame(16); next(); })
    }
    if (!splashLoop && n >= 110) {
        n = 2;

        $("#splashIMG")
            .delay(500).queue(function (next) { changeFrame(13); next(); })
            .delay(500).queue(function (next) { changeFrame(14); next(); })
            .delay(500).queue(function (next) { changeFrame(15); next(); })
            .delay(500).queue(function (next) { changeFrame(16); next(); })
    }
    if(document.getElementById("divID")){
        window.requestAnimationFrame(loopFrames);
    }
}

function changeFrame(i) {

    setTimeout(function () {
        $("#splashIMG").attr("src", "img/splash/splash_frame_" + i + ".png");
    }, 1000);
}

////////////////////////////////////////////////////////////////////
//AUDIO
audio_file.addEventListener('timeupdate', function () {
    var buffer = 0.1;
    if (this.currentTime > this.duration - buffer) {
        this.currentTime = 0
        this.play()
    }
});
////////////////////////////////////////////////////////////////////
//DISTÀNCIA
function GetDistance(a, b) {
    var f1 = Math.pow(a.x - b.x, 2)
    var f2 = Math.pow(a.y - b.y, 2)
    return Math.sqrt(f1 + f2)
}
////////////////////////////////////////////////////////////////////