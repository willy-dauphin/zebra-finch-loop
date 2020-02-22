/*
 * Général
 */
function checkFrequency(freq){
    return (freq<=frequenceMax && freq>=frequenceMin) ? true : false; 
}

function checkAmplitude(amp){
    return (amp<=amplitudeMax && amp>=amplitudeMin) ? true : false; 
}

function checkRecurence(rec){
    return (rec>=nbRecurence) ? true : false;
}

/*
 * Dessin et analyse du graphe
 */
var echelleFrequency;
var largeurBarre;
var hauteurBarre;
var x;
var y;
var cpt = 0;
var isSyl= false;
var colorSyll;
var dateDeb;
var dateFin;
var xSyl;
var isRowInit = false;
var harmonique = new Array();//pour comparaison
var isInferieur = false;
var name = "";
var tabHarmonique = new Array();
var tabLastBlack = new Array();
var tabNbNoirs = new Array();
var tabNbBlancs = new Array();

var nbNoirs = 0;
var nbBlancs = 0;
var lastBlack = 0;

function initValues(){
    minAmplitude = tableauFrequence[0];
    maxAmplitude = tableauFrequence[0];
    minFrequency = 44100;
    maxFrequency = 0;
    meanAmplitude = 0;
    meanFrequency = 0;
    duration = 0;
    harmoniques = 0;
    harmonique = new Array();
    zeroCrossing = 0;
    tableauBuffer = new Array();
    tableauBufferLeft = new Array();
    tableauBufferRight = new Array();
    tabHarmonique = new Array();
    tabLastBlack = new Array();
    nbNoirs = 0;
    nbBlancs = 0;
    lastBlack = 0;
    tabNbNoirs = new Array();
    tabNbBlancs = new Array();
}


function Spectre(){
    if(isPlay){
        if(nbGlobal==-1){
            initSpectre();
        }
        tablooo = new Uint8Array(tailleMemoireTampon);
        analyseur.getByteFrequencyData(tableauFrequence);
        analyseur.getByteTimeDomainData(tableauAmplitude);
        analyseur.getFloatTimeDomainData(testTablo);
        
        /*
         * Valeurs graphiques
         */ 
        largeurBarre = canvas.width/500;
        nbFreqAnalyse = Math.round((frequenceMax-frequenceMin)/echelleFrequency);
        hauteurBarre = (canvas.height/nbFreqAnalyse)*zoom;
        x = (nbGlobal*largeurBarre);
        y = canvas.height - hauteurBarre;
        /*
         * Boucle pour chaque colonne d'affichage
         */
        for(var i=0;i<tailleMemoireTampon;i++){
            //si en dehors de ces valeurs, pas de dessin ni même de prise en compte dans les calculs!
            if(isGraph){
                drawSpectre(i);
            }
            updateValues(i);
        }
        
        tabHarmonique.push(countHarmo(harmonique));
        harmonique = new Array();
        tabLastBlack.push(lastBlack);
        lastBlack = 0;
        tabNbNoirs.push(nbNoirs);
        tabNbBlancs.push(nbBlancs);
        nbNoirs = 0;
        nbBlancs = 0;
        isSyllabe();
        
        requestAnimationFrame(function(){
            if(nbGlobal*largeurBarre>=canvas.width){
                nbGlobal=0;
                context.clearRect(0, 0, canvas.width, canvas.height);
                xSyl = 0;
            }else{
                nbGlobal++;
            }
            Spectre();
        });
    }
}

function initSpectre(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    analyseur.fftSize = 2048;
    echelleFrequency = 44100/analyseur.fftSize;
    tailleMemoireTampon = analyseur.frequencyBinCount;
}

function drawSpectre(i){
    /*
     * Couleur en fonction de la puissance du son
     */
    var color = 255-(tableauFrequence[i]);
    
    if(color < 240){
        color = contrast*color;
        if(color>255){
            color = 255;
        }
    }

    /*
     * Tracé du graphe
     */
    context.fillStyle = 'rgb(' + color + ','+ color +','+ color +')';
    context.fillRect(x, y, largeurBarre, hauteurBarre);
    y-=hauteurBarre;
}


function updateValues(i){
    //Calcule les paramètres du son (fréquence moyenne, amplitude moyenne,...)
    var freqCurrent = i*echelleFrequency;
    /*
     * Gestion du zero-crossing
     */
    if(tableauAmplitude[i]<127){
        if(!isInferieur){
            zeroCrossing++;
        }
        isInferieur = true;
    }else if(tableauAmplitude[i]>128){
        if(isInferieur){
            zeroCrossing++;
        }
        isInferieur = false;
    }
    
    /*
     * Gestion du buffer
     */    
    tableauBuffer.push(testTablo[i]);

    
    /*
     *Gestion des harmoniques
     */
    
    if(i<tailleMemoireTampon && checkAmplitude(tableauFrequence[i]) && checkFrequency(i*echelleFrequency) && checkRecurence(tableauFrequence[i])){
        cpt++;
        meanAmplitude += tableauFrequence[i];
        meanFrequency += freqCurrent;
        if(tableauFrequence[i]<minAmplitude){
            minAmplitude = tableauFrequence[i];
        }
        if(tableauFrequence[i]>maxAmplitude){
            maxAmplitude = tableauFrequence[i];
        }
        if(freqCurrent>maxFrequency){
            maxFrequency = freqCurrent;
        }
        if(freqCurrent<minFrequency){
            minFrequency = freqCurrent;
        }
        if(tableauFrequence[i]>seuilNoir){
            //couleur noire
            harmonique.push("N");
            if(i>lastBlack){
                lastBlack = i;
            }
            nbNoirs++;
        }else{
            //couleur blanche
            harmonique.push("B");
            nbBlancs++;
        }
        
    }

    if(i==(tailleMemoireTampon-1)){
        //Appel à chaque fin d'instance graphique
        if(meanAmplitude!=0 && cpt!=0){meanAmplitude = meanAmplitude/cpt;}
        if(meanFrequency!=0 && cpt!=0){meanFrequency = meanFrequency/cpt;}
    }
}

function updateDisplay(){
    //Met à jour l'affichage des paramètres du son (fréquence moyenne, amplitude moyenne,...)
    var index = tablo.rows.length-1;
    tablo.rows[index].cells[0].style.color = colorSyll;
    tablo.rows[index].cells[2].innerHTML = Math.round(meanFrequency) + " Hz";
    tablo.rows[index].cells[3].innerHTML = Math.round(minFrequency) + " Hz";
    tablo.rows[index].cells[4].innerHTML = Math.round(maxFrequency) + " Hz";
    tablo.rows[index].cells[5].innerHTML = Math.round(meanAmplitude) + " dB";
    tablo.rows[index].cells[6].innerHTML = Math.round(minAmplitude) + " dB";
    tablo.rows[index].cells[7].innerHTML = Math.round(maxAmplitude) + " dB";
    tablo.rows[index].cells[8].innerHTML = duration + " ms";

    var diff = maxFrequency - minFrequency;
    
    if(zeroCrossing!=0){
        //zeroCrossing = zeroCrossing/Math.log(zeroCrossing);
        zeroCrossing = Math.log(zeroCrossing);
    }
    
    
    tablo.rows[index].cells[10].innerHTML = zeroCrossing;   
    
    
    /*
     * Gestion des harmoniques
     */
    
    harmoniques = max(tabHarmonique);
    /*
    console.log("------------------------");
    console.log("MAX harmo : " + max(tabHarmonique));
    console.log("MIN harmo : " + min(tabHarmonique));
    console.log("MOY harmo : " + moy(tabHarmonique));
    console.log("Pente : " + pente(tabLastBlack));
    console.log("MOY NbNoirs : " + moy(tabNbNoirs));
    console.log("MOY NbBlancs : " + moy(tabNbBlancs));
    console.log("MOY LastBlack : " + moy(tabLastBlack));
    console.log("Proportion max de noirs (sur le cri) : " + propMaxNoirs());
    console.log();*/
    
    
    tablo.rows[index].cells[9].innerHTML = Math.round(harmoniques);
    
    /*
     * Gestion du reste
     */
    
    var mesValeurs = new Array(meanFrequency, minFrequency, maxFrequency, meanAmplitude, minAmplitude, maxAmplitude, duration, harmoniques, zeroCrossing);
    var sylabo = chooseSyllabe(mesValeurs);
    
    name = "???";
    var translation = "Syllabe inconnue";
    var transContext = "(pas de contexte)";
    if(sylabo != null){
        name = sylabo.getNom();
        transContext = sylabo.getTransContext();
        translation = sylabo.getTranslation();
        if(isNoise(name)){
            tablo.rows[index].style.opacity = 0.3;
        }else{
            sylabo.answer();
        }
    }else{
        tablo.rows[index].style.opacity = 0.3;
    }
    tablo.rows[index].cells[1].innerHTML = name;
    if(isTranslate){
        document.getElementById('context').innerHTML = transContext;
        document.getElementById('translation').innerHTML = translation;        
    }
}

function isSyllabe(){
    if(!inTime){
        if(cpt>=minOccurence){
            if(!isSyl){
                //début syllabe
                initValues();
                dateDeb = new Date().getTime();
                xSyl = x;
                isSyl = true;
            }
            cpt=0;
        }else{
            if(isSyl){
                //fin syllabe
                dateFin = new Date().getTime();
                duration = dateFin - dateDeb;
                if(duration>=minDurationZF && duration<=maxDurationZF){
                    colorSyll = "rgba(" + parseInt(Math.random()*255) + "," + parseInt(Math.random()*255) + "," + parseInt(Math.random()*255) + ",1)"; 
                    context.fillStyle = colorSyll;
                    context.fillRect(xSyl, 0, 1, canvas.height);
                    context.fillStyle = colorSyll;
                    context.fillRect(x, 0, 1, canvas.height);
                    addOneRow();
                    if(tablo.rows.length>nbRow+1 || !isRowInit){
                        deleteFirstRow();
                        isRowInit = true;
                    }
                    
                    updateDisplay();
                    
                    if(isRecord && (isAcceptUnknow||name!="???") && (isAcceptNoise || !isNoise(name)) && (isAcceptSyllabes || !isASyllabe(name))){
                        addDatas();
                        tableauBuffersSaved.push(tableauBuffer);
                        tableauBuffer = new Array();
                    }
                }
                isSyl = false;
            }
        }
        return isSyl;
    }
}

/*
 * Gestion du tableau de syllabes (id='tablo')
 */

function addOneRow(){
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = tablo.insertRow(tablo.rows.length);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    for(var i=0; i<nbTD ; i++){
        var cell = row.insertCell(i);
        if(i>0){
            cell.innerHTML = "NaN";
        }else{
            cell.innerHTML = "<i class='fa fa-asterisk' aria-hidden='true'></i>";
        }
    }
}

function deleteFirstRow(){
    if(tablo.rows.length>1){
        tablo.deleteRow(1);
    }
}

function countHarmo(tab){
    var res = 0;
    var isWhite = false;
    var cptWhite = 0;
    var cptBlack = 1;
    if(tab[0]=="B"){
        isWhite = true;
        cptWhite = 1;
        cptBlack = 0;
    }
    
    for(var i=1 ; i<tab.length ; i++){
        if(tab[i]=="B"){
            //couleur blanche
            if(!isWhite){
                //début de blanc
                if(cptWhite >= seuilNbBlanc){
                    if(cptBlack >= seuilNbNoir){
                        res++;
                    }
                }
                cptWhite = 0;
                isWhite = true;
            }
            cptWhite++;
        }else{
            //couleur noire
            if(isWhite){
                //début de noir
                cptBlack = 0;
                isWhite = false;
            }
            cptBlack++;
        }
    }
    if(!isWhite){
        //fini sur du noir
        if(cptBlack >= seuilNbNoir){
            res++;
        }
    }
    return res;
}