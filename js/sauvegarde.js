var allSyllabesSaved = new Storage("allSyllabesSaved");
var liste = document.getElementById("listSyllabe");
syllabes = castInSyllabes(allSyllabesSaved.getJSON());

function loadList(){
    liste.innerHTML = "";
    document.getElementById('syllabesSongs').innerHTML = "<center><button onclick='isSongUpload()' type='button' class='btn btn-primary'>Vérifier les enregistrements sonores.</button></center>";
    var syllabesSaved = castInSyllabes(allSyllabesSaved.getJSON());
    for(var i = 0; i<syllabesSaved.length; i++){
        var div =  document.createElement("div");
        var syllabe = syllabesSaved[i];
        div.innerHTML = "";
        div.id = syllabe.getNom();
        div.innerHTML += "<i onclick='toggleSyllabe(this)' class='fa fa-check-square checkedSyllabe' aria-hidden='true'> </i> <strong> - " + syllabe.getNom() + "</strong>";
        if(!syllabe.isUsed){
            div.classList.add("syllabeDesactived");
            div.children[0].classList.remove("fa-check-square");
            div.children[0].classList.add("fa-square-o");
        }       
        if(syllabe.getTranslation()!=""){
            div.innerHTML += " - " + syllabe.getTranslation();
        }
        if(syllabe.getTransContext()!=""){
            div.innerHTML += " - <i>" + syllabe.getTransContext() + "</i>";
        }
        div.innerHTML += "<ul>"
        var filtres = syllabe.getFilters();
        for(var j = 0; j<filtres.length; j++){
            var classes = "filterList";
            if(!filtres[j].isAbled()){
                classes += " desactived";
            }
            div.innerHTML += "<li class='marginLeft'><span class='" + classes + "' onclick ='toggleFilter(this," + j +")'>" + filtres[j].affiche() + " - " + filtres[j].getPercent() + "</span> (<a style='cursor:pointer;' onclick='modifyFilter(this," + j +")'><i>modifier</i></a>)</li>";
        }
        div.innerHTML += "<br>";
        liste.appendChild(div);
        syllabes = castInSyllabes(allSyllabesSaved.getJSON());
    }
}

function findFilter(name, nb){
    try{
        var bool = true;
        var i = 0;
        var syl;
        allSyllabesSaved.values = castInSyllabes(allSyllabesSaved.getJSON());
        while(i<allSyllabesSaved.values.length && bool){
            if(allSyllabesSaved.values[i].getNom() == name){
                syl = allSyllabesSaved.values[i].getFilters();
                bool = false;
            }
            i++;
        }
        
        return syl[nb];
    }catch(err){
        console.log("Impossible de récupérer le filtre N°" + nb + " de la syllabe " + name + " : " + err);
    }
}

function findSyllabe(name){
    try{
        var bool = true;
        var i = 0;
        var syl;
        allSyllabesSaved.values = castInSyllabes(allSyllabesSaved.getJSON());
        while(i<allSyllabesSaved.values.length && bool){
            if(allSyllabesSaved.values[i].getNom() == name){
                syl = allSyllabesSaved.values[i];
                bool = false;
            }
            i++;
        }
        
        return syl;
    }catch(err){
        console.log("Impossible de récupérer la syllabe " + name + " : " + err);
    }   
}

function toggleFilter(elem, nb){
    if(elem.classList.contains("desactived")){
        //on active
        elem.classList.remove("desactived");
    }else{
        //on désactive
        elem.classList.add("desactived");
    }
    var filtre = findFilter(elem.parentElement.parentElement.id, nb);
    filtre.toggleAbled();
    allSyllabesSaved.upload();
}

function toggleSyllabe(elem){
    if(elem.classList.contains("fa-check-square")){
        //on desactive    
        elem.classList.remove("fa-check-square");
        elem.classList.add("fa-square-o");
        elem.parentElement.classList.add("syllabeDesactived");
    }else{
        //on active
        elem.classList.remove("fa-square-o");
        elem.classList.add("fa-check-square");
        elem.parentElement.classList.remove("syllabeDesactived");
    }
    var syllabe = findSyllabe(elem.parentElement.id);
    syllabe.toggleUsed();
    allSyllabesSaved.upload();
}

function refreshSyllabes(){
    try{
        allSyllabesSaved.downloadMemory();
        loadList();
    }catch(err){
        console.log("Impossible de récupérer les syllabes en mémoire : " + err);
    }
}

function generateSelect(){
    document.getElementById('listSongs').innerHTML = selectSongs;
}

function addSong(name){
    try{
        document.getElementById('sourcesAudio').innerHTML += "<audio id='" + name +"'><!--<source src='sound/"+ name +".mp3'>--><source src='sound/"+ name +".wav'></audio>";
    }catch(e){
        //syllabesSongs
        console.log("Impossible de charger l'enregistrement correspondant au " + name + ". " + e);
    }
}

function downloadSong(){
    var decoupe = document.getElementById('listSongs').options[document.getElementById('listSongs').selectedIndex].text.split("");
    var index = decoupe[decoupe.length-1];
    var name = document.getElementById("nameInput").value;
    tabloSaved.rows[index].children[1].children[0].click();
    var lastName = tabloSaved.rows[index].children[1].children[0].children[2].download;
    tabloSaved.rows[index].children[1].children[0].children[2].download = name + ".wav";
    tabloSaved.rows[index].children[1].children[0].children[2].click();    
    tabloSaved.rows[index].children[1].children[0].children[2].download = lastName;
}

function addNewKindOfSyllabe(){
    if(computeMean(false)){
        generateSelect();
        $('#save').modal('hide');
        $('#syllabeAdd').modal('show');  
    }
}

function createNewKindOfSyllabe(){
    var name = document.getElementById('nameInput').value;
    var translation = document.getElementById('translationInput').value;
    var context = document.getElementById('contextInput').value;
    var syllabesSaved = castInSyllabes(allSyllabesSaved.getJSON());
    var memory = castInSyllabes(allSyllabesSaved.getMemoryJSON());
    var isMemo = false;
    var isSaved = false;
    var i = 0;
    while(i<syllabesSaved.length && !isSaved){
        if(name == syllabesSaved[i].getNom()){
            isSaved = true;
        }
        i++;
    }
    i=0;
    while(i<memory.length && !isMemo){
        if(name == memory[i].getNom()){
            isMemo = true;
            i--;
        }
        i++;
    }    
    if(isSaved){
        alert("Une syllabe porte déjà le même nom !");
    }else if(isMemo){
        alert("Une syllabe mémorisée porte déjà le même nom ! Merci de supprimer vos données en mémoire ou de renommer cette syllabe.")
    }else if(name == ""){
        alert("Merci de spécifier un nom pour cette syllabe !");
    }else{
        //Ajout de la syllabe
        var syllabe = new Syllabe(name, translation, context, computedFilters, true);
        allSyllabesSaved.addValue(syllabe);
        allSyllabesSaved.addValueMemory(syllabe);
        addSong(name);           
        $('#syllabeAdd').modal('hide');
        $('#buttonList').click();
    }
}

function castInSyllabes(tabJSON){
    var tab = JSON.parse(tabJSON);
    var res = new Array(tab.length);
    for(var i=0;i<res.length;i++){
        var syllabe = new Syllabe();
        syllabe.copyFromJSON(tab[i]);
        res[i] = syllabe;
    }
    return res;
}

function deleteSyllabes(){
    try{
        var syllabesSaved = castInSyllabes(allSyllabesSaved.getJSON());
        for(var i=0;i<syllabesSaved.length;i++){
            var syllabe = syllabesSaved[i];
            if(!syllabe.isUsed){
                allSyllabesSaved.removeValueFromIndex(i);
                syllabesSaved = castInSyllabes(allSyllabesSaved.getJSON());
                i--;
            }
        }
        loadList();
    }catch(err){
        console.log("Impossible de supprimer les valeurs : " + err);
    }
}

function isSongUpload(){
    var ok = true;
    var doc = document.getElementById("syllabesSongs");
    var syl = new Array();
    var syllabesSaved = castInSyllabes(allSyllabesSaved.getJSON());
    for(var i = 0; i<syllabesSaved.length;i++){
        if(!document.getElementById(syllabesSaved[i].getNom()).duration>0){
            ok = false;
            syl.push(syllabesSaved[i].getNom());
        }
    }
    if(ok){
        doc.innerHTML = "Aucun problème de chargement à signaler.";
    }else{
        if(syl.length==1){
            doc.innerHTML = "La syllabe ";
        }else{
            doc.innerHTML = "Les syllabes ";
        }
        
        for(var i = 0; i<syl.length; i++){
           if(i<syl.length-2){
               doc.innerHTML += "<strong>" + syl[i]+ "</strong>, ";
           }else if(i<syl.length-1){
               doc.innerHTML += "<strong>" + syl[i]+ "</strong> et ";
           }else{
               doc.innerHTML += "<strong>" + syl[i] + "</strong>";
           }
        }
        if(syl.length==1){
            doc.innerHTML += " n'a pas de fichier audio associé."; 
        }else{
            doc.innerHTML += " n'ont pas de fichier audio associé.";
        }    
    }
    doc.innerHTML = "<center>" + doc.innerHTML + "</center>";
}

function cleanAll(){
    try{
        allSyllabesSaved.clean();
        alert("Toutes les données stockées sur votre navigateur ont été remises à zéro.");
    }catch(e){
        alert("Un problème est intervenu. Réessayez plus tard ! ("+e+")");
    }
}

var nameSylSaved;
var nameFilSaved;

function modifyFilter(elem, nb){
    try{
        $('#syllabeUsed').modal('hide');
        $('#modifyFilters').modal('show');
        var listeFilters = document.getElementById("listFilters");
        var titleFilters = document.getElementById("titleFilters");
        var filtreCheck = findFilter(elem.parentElement.parentElement.id, nb);
        var syllabeCheck = findSyllabe(elem.parentElement.parentElement.id);
        titleFilters.innerHTML = "Modification de " + syllabeCheck.getNom() + " - " + filtreCheck.getNom();
        listeFilters.innerHTML = "";
        listeFilters.innerHTML += "<label for='moy'>Moyenne de (" + filtreCheck.getNom() + ")</label><div class='input-group'><span class='input-group-addon'><i class='fa fa-caret-right' aria-hidden='true'></i></span><input id='moy' min='0' type='number' class='form-control' value='" + filtreCheck.getValeur() + "' aria-describedby='basic-addon1'></div>";
        listeFilters.innerHTML += "<label for='ecT'>Ecart-Type de (" + filtreCheck.getNom() + ")</label><div class='input-group'><span class='input-group-addon'><i class='fa fa-caret-right' aria-hidden='true'></i></span><input id='ecT' min='0' type='number' class='form-control' value='" + filtreCheck.getEcartType() + "' aria-describedby='basic-addon1'></div>";
        listeFilters.innerHTML += "<br><center><button onclick='valideFilters(this)' style='width:30%;' data-toggle='tooltip' data-placement='bottom' title='valider' type='button' class='btn btn-success'>Enregistrer</button></center>";  
        nameSylSaved = syllabeCheck.getNom(); 
        nameFilSaved = filtreCheck.getNom();      
    }catch(err){
        console.log("Impossible de modifier les valeurs : " + err);
    }
}

function valideFilters(elem){
    try{        
        var bool = true;
        var i = 0;
        var j = 0;
        allSyllabesSaved.values = castInSyllabes(allSyllabesSaved.getJSON());
        while(i<allSyllabesSaved.values.length && bool){
            if(allSyllabesSaved.values[i].getNom() == nameSylSaved){
                var filtres = allSyllabesSaved.values[i].getFilters();
                while(j<filtres.length && bool){
                    if(filtres[j].getNom() == nameFilSaved){
                        filtres[j].valeur = document.getElementById('moy').value;
                        filtres[j].ecartType = document.getElementById('ecT').value;
                        bool = false;
                    }
                    j++;
                }
            }
            i++;
        }
        allSyllabesSaved.upload();
        if(!bool){
            elem.innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i>";
            setTimeout(function(){
                elem.innerHTML = "<i class='fa fa-check' aria-hidden='true'></i>";
            },750);
        }
    }catch(err){
        console.log("Impossible de sauvegarder les valeurs : " + err);
    }
}

function toggleAutomaticAnswer(elem){
    isAutomaticAnswer = !isAutomaticAnswer;
    elem.innerHTML="<i class='fa fa-spinner fa-spin'></i>";
    setTimeout(function(){
        if(isAutomaticAnswer){
            //Réponse automatique activée
            elem.classList.remove("btn-warning");
            elem.classList.add("btn-success");
            elem.innerHTML = "Réponse automatique activée";           
        }else{
            //Réponse automatique désactivée
            elem.classList.remove("btn-success");
            elem.classList.add("btn-warning");
            elem.innerHTML = "Réponse manuelle activée";     
        }
    },500);
}