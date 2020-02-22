// MP3 bit rate
var BIT_RATE = [64, 80, 96, 112, 128, 160, 192, 224, 256, 320];

var cptBitRate = 4;
var bitRate = BIT_RATE[cptBitRate];

function incrementBITRATE(){
    if((cptBitRate+1)>=BIT_RATE.length){
        cptBitRate = -1;
    }
    bitRate = BIT_RATE[++cptBitRate];
    console.log("BIT_RATE = " + bitRate);
}

/*
 * bitRate - MP3 bit rate [kbps]
 * buffers - array of sample buffers ([Float32Array, Float32Array])
 */
function createSound(buffer){
    var encoder = new Mp3LameEncoder(audioCtx.sampleRate, bitRate);
    var buffers = [buffer, buffer];
    encoder.encode(buffers);
    
    var blob = encoder.finish();
    return blob;
}

function playRecording(elem){
    var audio = elem.parentElement.parentElement.children[0].children[0];
    if(!elem.classList.contains("playB")){
        //on clique sur play
        elem.classList.add("playB");
        elem.innerHTML = "<i class='fa fa-stop' style='color:#B71F1F' aria-hidden='true'></i>";
        audio.play();
        setTimeout(function(){
            elem.classList.remove("playB");
            elem.innerHTML = "<i class='fa fa-play' style='color:#0BAE16' aria-hidden='true'></i>";
        }, audio.duration*1000);
    }else{
        //on clique sur pause
        elem.classList.remove("playB");
        elem.innerHTML = "<i class='fa fa-play' style='color:#0BAE16' aria-hidden='true'></i>";
        audio.pause();
        audio.currentTime = 0;
    }
}

function createRecord(blob, element, name){
    var url = URL.createObjectURL(blob);
    var html = "<p recording='" + url + "'>" + "<audio id='boli' class='hidden' controls src='" + url + "'></audio> "
    + "<a onclick='playRecording(this)'><i class='fa fa-play' aria-hidden='true' style='color:#0BAE16'></i></a>"
    + " <a href='" + url + "'download='recording" + name + ".wav'>" + "<i class='fa fa-download' aria-hidden='true'></i></a></p>";
    element.innerHTML = html;
}

function createHTMLRecord(element, nb){
    var buffer = tableauBuffersSaved[nb-1];
    createRecord(createSound(buffer), element.parentElement, (nb+""));   
}

function downloadAll(){
    try{
        if(tableauBuffersSaved.length>0){
            var allSongs = tableauBuffersSaved[0];
            for(var i = 1; i<tableauBuffersSaved.length; i++){
                for(var j = 0; j<tableauBuffersSaved[i].length;j++){
                    allSongs.push(tableauBuffersSaved[i][j]);
                }
            }
            var buffer = createSound(allSongs);
            var url = URL.createObjectURL(buffer);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "all.wav";
            a.click();
            window.URL.revokeObjectURL(url);
        }else{
            alert("Aucun son n'a été mémorisé !");
        }
    }catch(err){
        alert("Un problème est survenu : " + err);
    }
}

function reset(element){
    element.innerHTML = "<i class='fa-li fa fa-download'></i>";
}