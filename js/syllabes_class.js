var seuilProbabilité = 0.05;
var inTime = false;

class Filtre{
    constructor(nom, valeur, ecartType, disabled){
        this.nom = nom;
        this.valeur = valeur;
        this.ecartType = ecartType;
        this.disabled = disabled;
    }
    
    getPercent(){
        var percent;
        if(this.valeur != 0){
            percent = (this.ecartType*100)/this.valeur; 
        }else{
            percent = 0;
        }
        percent = parseInt(percent);
        var res = "";
        if(percent >= 40){
            res += "<span style='color:#d9534f'>";
        }else if(percent >= 20){
            res += "<span style='color:#f0ad4e'>";
        }else{
            res += "<span style='color:#5cb85c'>";
        }
        res += percent + "%</span>";
        return res;
    }
    
    copyFromJSON(obj){
        for (var prop in obj) this[prop] = obj[prop];
    }
    
    getNom(){
        return this.nom;
    }
    
    getValeur(){
        return this.valeur;
    }
    
    getEcartType(){
        return this.ecartType;
    }
    
    min(){
        return (this.valeur - this.ecartType);
    }
    
    max(){
        return (this.valeur + this.ecartType);
    }
    
    isAbled(){
        return !this.disabled;
    }
    
    affiche(){
        return (this.nom + " : " + this.valeur + " (+/- " + this.ecartType + ") ");
    }
    
    toggleAbled(){
        this.disabled = !this.disabled;
    }
    
    calcCorrespondance(value){
        var res;
        if(value < this.min() || value > this.max()){
            res = 0;
        }else{        
            if(this.ecartType==0){
                res = 1 - (Math.abs(this.valeur-value));
            }else{
                res = 1 - (Math.abs(this.valeur-value)/this.ecartType);
            }
        }
        console.log("---> " + this.nom + " : (moyenne " + this.valeur + "), (testée " + value + "), (ecart-type " + this.ecartType + ") --> " + res);
        return res;
    }
}

class Filtre2 extends Filtre{
    calcCorrespondance(value){
        var res;
        if(value < seuilHarmoniques){
            res = 0;
        }else{        
            if(this.ecartType==0){
                res = 1 - (Math.abs(this.valeur-value));
            }else{
                res = 1 - (Math.abs(this.valeur-value)/this.ecartType);
            }
        }
        console.log("---> " + this.nom + " : (moyenne " + this.valeur + "), (testée " + value + "), (ecart-type " + this.ecartType + ") --> " + res);
        return res;
    }
}

class Syllabe {
  constructor(nom, translation, transContext, filtres, bool) {
      this.nom = nom;
      this.translation = translation;
      this.transContext = transContext;
      this.filtres = filtres;
      this.isUsed = bool;
  }

  copyFromJSON(obj){
      for (var prop in obj) this[prop] = obj[prop];
      this.filtres = new Array();
      for(var objFiltre in obj.filtres){
          var filtre = new Filtre();
          filtre.copyFromJSON(obj.filtres[objFiltre]);
          this.filtres.push(filtre);
      }
  }

  calcCorrespondance(values) {
    var res = 0;
    var cpt = 0;
    console.log("ANALYSE(" + this.nom + ") ? ");
    for(var i =0; i<this.filtres.length;i++){
      if(this.filtres[i].isAbled()){
        res += this.filtres[i].calcCorrespondance(values[i]);
        cpt ++;
      }
    }
    res = res / cpt;
    console.log("------> " + res);
    return res;
    }

    getNom(){
      return this.nom;
    }
    getTranslation(){
      return this.translation;
    }
    getTransContext(){
      return this.transContext;
    }
    isUsed(){
      return this.isUsed;
    }
    getFilters(){
        return this.filtres;
    }
    toggleUsed(){
        this.isUsed = !this.isUsed;
    }
    
    answer(){
        try{
            if(isAnswer && !inTime){
                var song = null;
                if(!isAutomaticAnswer){
                    console.log("Réponse non-automatique !");
                    song = document.getElementById(this.nom);  
                }else{
                    console.log("Réponse automatique !");
                    var blob = createSound(tableauBuffer);
                    var url = URL.createObjectURL(blob);
                    song = document.createElement("AUDIO");
                    song.setAttribute("src", url);
                }
                if(song!=null){
                    inTime = true;
                    setTimeout(function(){
                        song.play();
                        setTimeout(function(){
                            //permet de ne pas jouer en même temps plusieurs réponses ! A etendre à l'écoute.
                            inTime = false;    
                        },song.duration*1000);
                    }, timeToAnswer);
                }  
            }
        }catch(err){
            console.log("Impossible de jouer le son : " + err)
        }
    }
}

function isNoise(name){
    var bool = false;
    var i = 0;
    while(i<parasites.length && !bool){
        if(name == parasites[i].getNom()){
            bool = true;
        }
        i++;
    }
    return bool;
}

function isASyllabe(name){
    var bool = false;
    var i = 0;
    while(i<syllabes.length && !bool){
        if(name == syllabes[i].getNom()){
            bool = true;
        }
        i++;
    }
    return bool;    
}

function max(tab){
    var max = tab[0];
    for(var i=1; i<tab.length; i++){
        if(tab[i]>max){
            max = tab[i];
        }
    }
    return max;
}

function min(tab){
    var min = tab[0];
    for(var i=1; i<tab.length; i++){
        if(tab[i]<min){
            min = tab[i];
        }
    }
    return min;
}

function moy(tab){
    var moy = 0;
    for(var i=0; i<tab.length; i++){
        moy += tab[i];
    }
    return (moy/tab.length);
}

function pente(tab){
    var pos1 = parseInt(0.25*tab.length);
    var pos2 = parseInt(0.75*tab.length);
    var res = (tab[pos2]-tab[pos1])/moy([tab[pos2], tab[pos1]]);
    return res;
}

function propMaxNoirs(){
    var max = tabNbNoirs[0]/tabLastBlack[0];
    for(var i=1 ; i<tabLastBlack.length ; i++){
        if(max < (tabNbNoirs[i]/tabLastBlack[i])){
            max = tabNbNoirs[i]/tabLastBlack[i];
        }
    }
    return max;
}



/*
 * Bornes graphiques strictes du cri
 */
var maxHarmo1 = 3;
var maxHarmo2 = 21;
var minHarmo1 = 0;
var pente1 = -1.50;
var pente2 = -0.25;
var proportionNoire1 = 0.15;
var proportionNoire2 = 0.60;

function chooseSyllabe(values){
    //values(meanFrequency, minFrequency, maxFrequency, meanAmplitude, minAmplitude, maxAmplitude, duration, harmoniques, zeroCrossing)
    var res = null;
    if( pente(tabLastBlack) > 0 && min(tabHarmonique) == 0){
        //pente positive ET minHarmo
        console.log("Bruit : pente négative OU minHarmo != 0");
        res = BRUIT;
        //console.log("C'est un bruit !");
    }else if(values[6] >= minDurationZF && values[6] <= maxDurationZF){
        //Test durée accepté
        res = null;
        if((max(tabHarmonique) > maxHarmo1 && max(tabHarmonique) < maxHarmo2) && (propMaxNoirs() > proportionNoire1 && propMaxNoirs() < proportionNoire2)){
            //Test MaxHarmo, Proportion
            //console.log("C'est sans doute un cri !");
            var bestValue = 0;
            for(var i = 0; i<syllabes.length; i++){
                if(syllabes[i].isUsed){
                    var test = syllabes[i].calcCorrespondance(values);
                    if(test>bestValue && test>seuilProbabilité){
                        res = syllabes[i];
                        bestValue = test;     
                    }
                }
            }
        }else{
            res = BRUIT;
            console.log("Bruit : MaxHarmo mauvais OU proportion mauvaise");
            //console.log("C'est un bruit !");
        }
    }
    if(res != null){
        console.log("Syllabe choisie : " + res.getNom());
        if(!isNoise(res.getNom())){
            console.log("--> Probabilité que ce soit vrai : " + parseInt(bestValue*100) + "%.");
        }
        console.log("---------------------------");
    }
    return res;
}