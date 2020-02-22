/*
 * Déclaration de fonctions
 */

initForm = function(){
    //inputMin.value = "";
    inputMax.value = "";
    //inputMin.placeholder = frequenceMin + " Hz";
    inputMax.placeholder = frequenceMax + " Hz"; 
    //inputAmpMin.value = "";
    inputAmpMax.value = "";
    //inputAmpMin.placeholder = amplitudeMin;
    inputAmpMax.placeholder = amplitudeMax;   
    proba.value = "";
    //harmo.value = "";
    //zeroCross.value = "";
    proba.placeholder = seuilProbabilité;
    //harmo.placeholder = seuilHarmoniques;
    //zeroCross.placeholder = seuilZeroCrossing;
    nbSyllabes.value = "";
    nbSyllabes.placeholder = nbRow;
    nbEnregistrements.value = "";
    nbEnregistrements.placeholder = nbSavedMax;
    
    initAutoValue();
    
    //variables constantes
    document.getElementById("seuilNoir").innerHTML = seuilNoir;
    document.getElementById("seuilNbNoir").innerHTML = seuilNbNoir;
    document.getElementById("seuilNbBlanc").innerHTML = seuilNbBlanc;
    document.getElementById("minDurationZF").innerHTML = minDurationZF + " ms";
    document.getElementById("maxDurationZF").innerHTML = maxDurationZF + " ms";
    document.getElementById("meanAmplitudeZF").innerHTML = meanAmplitudeZF + " dB";
    document.getElementById("seuilProbabilité").innerHTML = "(" + seuilProbabilité + "/1.00) soit " + seuilProbabilité*100 + "%";
    document.getElementById("seuilHarmoniques").innerHTML = seuilHarmoniques;
}

playORstop = function(){
    isPlay = !isPlay;
    Spectre();
}

initAutoValue = function(){
    autoValue.innerHTML = timeToAnswer +" ms";
}

setAutoValue = function(bool){
    var value = 10;
    if(bool){
        //plus
        timeToAnswer += value;
    }else if(timeToAnswer >= value){
        //moins
        timeToAnswer -= value;
    }
    initAutoValue();
}

/*
 * Initialisation
 */
window.onload = function(){
    initForm();
    updateDisplay();
    initTabloSaved();
    //initStorage();
}

/*
 * Gestion des boutons principaux.
 */

var mute = document.getElementById('mute');
mute.addEventListener('click', function(){
    if(mute.classList.toggle('floatButtonOFF')){
        //mute OFF
        mute.innerHTML = "<i class='fa fa-microphone-slash' aria-hidden='true'></i>";
        noeudGain.gain.value = 0;
    }else{
        //mute ON
        mute.innerHTML = "<i class='fa fa-microphone' aria-hidden='true'></i>";
        noeudGain.gain.value = 1;
    }
});

var play = document.getElementById('play');
play.addEventListener('click', function(){
    if(play.classList.toggle('floatButtonOFF')){
        //play OFF
        play.innerHTML = "<i class='fa fa-pause' style='color:white' aria-hidden='true'></i>";
    }else{
        //play ON
        play.innerHTML = "<i class='fa fa-play' aria-hidden='true'></i>";
    }
    playORstop();
});

var graph = document.getElementById('graph');
graph.addEventListener('click', function(){
    if(graph.classList.toggle('floatButtonOFF')){
        //graph OFF
        canvas.height = 0;
        isGraph = false;
        plus.classList.add("hidden");
        plusContrast.classList.add("hidden");
        minus.classList.add("hidden");
        minusContrast.classList.add("hidden");
    }else{
        //graph ON
        canvas.height = canvas.width*0.125;
        isGraph = true;
        nbGlobal = -1;
        plus.classList.remove("hidden");
        plusContrast.classList.remove("hidden");
        minus.classList.remove("hidden");
        minusContrast.classList.remove("hidden");
    }
});

var call = document.getElementById('call');
call.addEventListener('click', function(){
    if(!inTime){
        inTime = true;
        call.innerHTML = "<i class='fa fa-volume-up'></i>";
        setTimeout(function(){
            call.innerHTML = "<i class='fa fa-volume-down'></i>";  
            inTime = false;
        },distance.duration*1000);
        distance.play();
    }
});


/*
 * Gestion des réglages input
 */

/*freqMin.addEventListener('click', function(){
    console.log("Fonction fréquence minimum - " + inputMin.value);
    if(inputMin.value == ""){
        frequenceMin = 0;
    }else{
        frequenceMin = inputMin.value;  
    }
    initForm();
});*/

freqMax.addEventListener('click', function(){
    console.log("Fonction fréquence maximum - " + inputMax.value);
    if(inputMax.value == ""){
        frequenceMax = 0;
    }else{
        frequenceMax = inputMax.value;  
    }
    initForm();
});

/*ampMin.addEventListener('click', function(){
    console.log("Fonction amplitude minimum - " + inputAmpMin.value);
    if(inputAmpMin.value == ""){
        amplitudeMin = 0;
    }else{
        amplitudeMin = inputAmpMin.value;  
    }
    initForm();
});*/

ampMax.addEventListener('click', function(){
    console.log("Fonction amplitude maximum - " + inputAmpMax.value);
    if(inputAmpMax.value == ""){
        amplitudeMax = 0;
    }else{
        amplitudeMax = inputAmpMax.value;  
    }
    initForm();
});

divProba.addEventListener('click', function(){
    console.log("Fonction proba - " + proba.value);
    if(proba.value != ""){
        if(proba.value*1>=0 && proba.value*1<=1){
            seuilProbabilité = proba.value;             
        } 
    }
    initForm();
});

divNbEnregistrements.addEventListener('click', function(){
    console.log("Fonction nbEnregistrements - " + nbEnregistrements.value);
    if(nbEnregistrements.value != "" && nbEnregistrements.value*1>0){
            nbSavedMax = nbEnregistrements.value*1;
    }
    initForm();
});

/*divHarmo.addEventListener('click', function(){
    console.log("Fonction Harmoniques - " + harmo.value);
    if(harmo.value != ""){
        if(harmo.value*1>=0){
            seuilHarmoniques = harmo.value;             
        } 
    }
    initForm();
});

divZeroCross.addEventListener('click', function(){
    console.log("Fonction ZeroCrossing - " + zeroCross.value);
    if(zeroCross.value != ""){
        if(zeroCross.value*1>=0){
            seuilZeroCrossing = zeroCross.value;             
        } 
    }
    initForm();
});*/

divNbSyllabes.addEventListener('click', function(){
    console.log("Fonction nbSyllabes - " + nbSyllabes.value);
    if(nbSyllabes.value != "" && nbSyllabes.value*1 > 0){
        nbRow = nbSyllabes.value*1;
        while(tablo.rows.length>=2){
            tablo.deleteRow(1); 
        }
        isRowInit = false; 
        addOneRow();
    }
    initForm();
});

/*
 * Gestion des réglages toggle
 */

$(toggle1).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    //ANSWER ?
    if(toggle1.children[0].classList.contains("off")){
        isAnswer = true;
    }else{
        isAnswer = false;
    }
});

$(toggle2).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    //SAUVEGARDE
    if(toggle2.children[0].classList.contains("off")){
        isRecord = true;
        //show 7,4,6
        document.getElementById('toggle4').classList.remove("hidden");
        document.getElementById('toggle6').classList.remove("hidden");
        document.getElementById('toggle7').classList.remove("hidden");
        
    }else{
        isRecord = false;
        //hide 7,4,6
        document.getElementById('toggle4').classList.add("hidden");
        document.getElementById('toggle6').classList.add("hidden");
        document.getElementById('toggle7').classList.add("hidden");
    }
});

$(toggle3).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    if(toggle3.children[0].classList.contains("off")){
        isRaccourcis = true;        
    }else{        
        isRaccourcis = false;              
    }
});

$(toggle4).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    if(toggle4.children[0].classList.contains("off")){
        isAcceptUnknow = true;         
    }else{
        isAcceptUnknow = false;           
    }
});

$(toggle5).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    if(toggle5.children[0].classList.contains("off")){
        isTranslate = true;         
    }else{
        isTranslate = false;            
    }
});


$(toggle6).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    if(toggle6.children[0].classList.contains("off")){
        isAcceptNoise = true;         
    }else{
        isAcceptNoise = false;            
    }
});


$(toggle7).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
    if(toggle7.children[0].classList.contains("off")){
        isAcceptSyllabes = true;         
    }else{
        isAcceptSyllabes = false;            
    }
    console.log(isAcceptSyllabes);
});

/*
 * Gestion du zoom
 */

var plus = document.getElementById('plus');
var minus = document.getElementById('minus');
var zoomValue = document.getElementById('zoomValue');

plus.addEventListener('click', function(){
    if(zoom<3){
        zoom+=0.5;
        zoomValue.innerHTML = "x" + zoom;
        if(zoomValue.innerHTML.split("").length == 2){
            zoomValue.innerHTML += ".0";
        }
    }
});

minus.addEventListener('click', function(){
    if(zoom>0.5){
        zoom -= 0.5;
        zoomValue.innerHTML = "x" + zoom;
        if(zoomValue.innerHTML.split("").length == 2){
            zoomValue.innerHTML += ".0";
        }
    }
});

/*
 * Gestion du contraste
 */

var plusContrast = document.getElementById('plusContrast');
var minusContrast = document.getElementById('minusContrast');
var contrastValue = document.getElementById('contrastValue');

plusContrast.addEventListener('click', function(){
    if(contrast<3){
        contrast+=0.1;
        contrastValue.innerHTML = "x" + Math.round(contrast*100)/100;
        if(contrastValue.innerHTML.split("").length == 2){
            contrastValue.innerHTML += ".0";
        }
    }
});

minusContrast.addEventListener('click', function(){
    if(contrast>0.2){
        contrast -= 0.1;
        contrastValue.innerHTML = "x" + Math.round(contrast*100)/100;
        if(contrastValue.innerHTML.split("").length == 2){
            contrastValue.innerHTML += ".0";
        }
    }
});

/*
 * Entrées au clavier
 */

document.onkeydown = function(e){
    if(!isRaccourcis || e.target.tagName.toLowerCase()=="input"){
        //on ne fait rien
    }else if(e.keyCode==32){
        //Touche espace
        play.click();
    }else if(e.keyCode==67){
        //touche c     
        call.click();     
    }else if(e.keyCode==71){
        //touche g
        graph.click();
    }
    else if(e.keyCode==77){
        //touche m
        mute.click();
    }
}