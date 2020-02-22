/*
 * Visualisation d'un chargement
 * - element : élement remplacé temporairement par le chargement
 * - time : durée en ms de chargement
 */
function loading(element, time){
    var last = element.innerHTML;
    element.innerHTML = "<i class='fa fa-spinner fa-pulse fa-fw'></i>";
    setTimeout(function(){
        element.innerHTML = last;
    }, time);
}


/*
 * Fonction lancée pour copier vers EXCEL
 */

function saveDatas(){
    excelExport();
}

/*
 * Permet de créer une piste audio et un lien de téléchargement pour toutes les pistes sauvegardées, visibles et sélectionnées
 */
function allDown(){
    for(var i=1; i<tabloSaved.rows.length; i++){
        if(tabloSaved.rows[i].children[0].children[0].classList.contains("ok") && !tabloSaved.rows[i].children[0].parentElement.classList.contains("hidden")){
            createHTMLRecord(tabloSaved.rows[i].children[1].children[0], i);
        }
    }
}

/*
 * Permet d'inverser une selection visible
 */
function allCheck(){
    for(var i=1; i<tabloSaved.rows.length; i++){
        if(!tabloSaved.rows[i].children[0].parentElement.classList.contains("hidden")){
            toggleOK(tabloSaved.rows[i].children[0].children[0]);
        }
    }
}

/*
 * Fonction de tri des syllabes en fonction de leur nom
 * le nom de la syllabe courante est stocké dans nameSyl (variable globale)
 */
function sortByName(){
    for(var i=1; i<tabloSaved.rows.length; i++){;
        var elemt = tabloSaved.rows[i].children[0].children[0];
        var nameElemt = tabloSaved.rows[i].children[2].innerHTML;
        if(nameSyl=="ALL"){
            elemt.parentElement.parentElement.classList.remove("hidden");
        }else if(nameElemt!=nameSyl){
            elemt.parentElement.parentElement.classList.add("hidden");
        }else{
            nbNameSyl++;
            elemt.parentElement.parentElement.classList.remove("hidden");          
        }
    }
}

/*
 * Gestion du tri de syllabe
 */
function selectSyllabe(){
    nbNameSyl = 0;
    if(indexSyllabeSaved >= syllabesSaved.length){
        indexSyllabeSaved = 0;
    }
    nameSyl = syllabesSaved[indexSyllabeSaved];
    sortByName();
    updateDatasDisplay();
    indexSyllabeSaved ++;
}


/*
 * Initialisation de l'entête du tableau des sauvegardes
 * permet de remettre à jour l'entête après ajout des moyennes
 */
function initTabloSaved(){
    for(var i=0; i<=nbTD ; i++){
        var cell = tabloSaved.rows[0].children[i];
        switch(i){                 
            case 0:
                cell.innerHTML = "";
                break;
            case 1:
                cell.innerHTML = "Son";
                break;
            case 2:
                cell.innerHTML = "Syllabe";
                break;
            case 3:
                cell.innerHTML = "Fréquence moyenne";
                break;
            case 4:
                cell.innerHTML = "Fréquence minimum";
                break;
            case 5:
                cell.innerHTML = "Fréquence maximum";
                break;
            case 6:
                cell.innerHTML = "Intensité moyenne";
                break;
            case 7:
                cell.innerHTML = "Intensité minimum";
                break;
            case 8:
                cell.innerHTML = "Intensité maximum";
                break;
            case 9:
                cell.innerHTML = "Durée";
                break;
            case 10:
                cell.innerHTML = "Ratio (Harm.)";
                break;
            case 11:
                cell.innerHTML = "Ratio (ZC.)";
                break;
            default:
                break;
        }
    }
}


/*
 * calcul et affichage des moyennes dans l'entête du tableau des sauvegardes
 */
function computeMean(bool=true){
    var res = false;
    if(tabloSaved.rows.length>=2){
        res = true;
        initTabloSaved();
        computedFilters = new Array();
        var res = new Array(nbTD+1);
        var cpt = new Array(nbTD+1);
        var ecT = new Array(nbTD+1);

        for(var i = 0; i<res.length;i++){
            res[i] = 0;
            cpt[i] = 0;
            ecT[i] = 0;
        }
        if(!bool){
            selectSongs = "";
        }
        for(var i=1; i<tabloSaved.rows.length;i++){
            if(tabloSaved.rows[i].children[0].children[0].classList.contains("ok") && !tabloSaved.rows[i].children[0].parentElement.classList.contains("hidden")){
                if(!bool){
                    selectSongs += "<option>Bande sonore N°" + i + "</option>";
                }
                for(var j=3; j<=nbTD;j++){
                    res[j] += parseInt(tabloSaved.rows[i].children[j].innerHTML);
                    cpt[j]++;
                }
            }
        }

        //ECART TYPE
        for(var i=1; i<tabloSaved.rows.length;i++){
            if(tabloSaved.rows[i].children[0].children[0].classList.contains("ok") && !tabloSaved.rows[i].children[0].parentElement.classList.contains("hidden")){
                for(var j=3; j<=nbTD;j++){
                    var value = (parseInt(tabloSaved.rows[i].children[j].innerHTML));
                    var moy = res[j] / cpt[j];
                    var total = value-moy;
                    ecT[j] += Math.pow(total,2);
                }
            }
        }
        
        for(var i=3; i<=nbTD ; i++){
            var moy = res[i]/cpt[i];
            var ecart = Math.sqrt(ecT[i]/(tabloSaved.rows.length-1));
            if(bool){
                tabloSaved.rows[0].children[i].innerHTML += " <br><span style='color:#f0ad4e;'>moy(" + Math.round(moy*100)/100 +")</span><br><span style ='color:#d9534f'>σ(" + Math.round(ecart*100)/100 + ")</span>";
            }else{
                var filter = new Filtre(tabloSaved.rows[0].children[i].innerHTML, moy, ecart, false);
                var percent = 100;
                if(filter.valeur != 0){
                    percent = (filter.ecartType*100)/filter.valeur; 
                }
                if(percent>=20){
                    filter.disabled = true;
                }
                computedFilters.push(filter);     
            }      
        }
    }else{
        alert("Aucune valeur à tester !")
    }
    return res;
}


/*
 * Suppression des données
 * suppression de toutes les données sauvegardées
 * mise à jour de l'affichage
 */
function deleteDatas(){
    loading(document.getElementById('buttonDelete'), 500);
    for(var i = tabloSaved.rows.length-1; i>0;i--){
        tabloSaved.deleteRow(i);
    }
    tableauBuffersSaved = new Array();
    document.getElementById("nbDataSaved").innerHTML = "Données sauvegardées";
    
    fauxPositifs = 0;
    var excelInput = document.getElementById("excelExport");
    
    excelExport.value = "";
    if(!excelInput.classList.contains("hidden")){
        excelInput.classList.add("hidden");
    }
    
    indexSyllabeSaved = 1;
    syllabesSaved = ["ALL"];
    initTabloSaved();
}

/*
 * concaténation des valeurs sauvegardées pour export excel
 * colonnes séparées par une virgule
 */
function excelExport(){
    //parcours de tabloSaved
    //caractère ";" pour changer de cellule
    //caractère "/" pour changer de ligne
    var excelInput = document.getElementById("excelExport");
    var res = "Syllabe, fréquence moyenne (Hz), fréquence minimum (Hz), fréquence maximum (Hz), intensité moyenne (dB), intensité minimum (dB), intensité maximum (dB), durée (ms), ratio (harm.), ratio (ZC.),";
    res+="\n";
    for(var i=1; i<tabloSaved.rows.length;i++){
        if(tabloSaved.rows[i].children[0].children[0].classList.contains("ok")){
            //nbTD inclu et 2
            for(var j=2; j<=nbTD;j++){
                res += tabloSaved.rows[i].children[j].innerHTML + ",";
            }
            res += "\n";
        }
    }
    
    excelInput.value = res;
    excelInput.select();
    
    try {
        var successful = document.execCommand('copy');
    }catch (err){
        console.log('Oops, unable to copy : ' + err);
    }
}

/*
 * Affichage du "titre" du tableau des syllabes sauvegardées
 */
function updateDatasDisplay(){
    if(tabloSaved.rows.length<=1){
        document.getElementById("nbDataSaved").innerHTML = "Aucune syllabe n'a encore été sauvegardée..";
    }else{
        var nameInterne = nameSyl;
        if(nameSyl!="ALL"){
            nameInterne = nameInterne + " ("+nbNameSyl+")";
        }
        if((tabloSaved.rows.length)>1){
            document.getElementById("nbDataSaved").innerHTML = nameInterne + " - Données sauvegardées : (" + ((tabloSaved.rows.length-1)-fauxPositifs) + "/" + (tabloSaved.rows.length-1) + ") ~ " + parseInt((((tabloSaved.rows.length-1)-fauxPositifs)*100)/(tabloSaved.rows.length-1)) + "%";
        }else{
            document.getElementById("nbDataSaved").innerHTML = nameInterne + " - Donnée sauvegardée : (" + ((tabloSaved.rows.length-1)-fauxPositifs) + "/" + (tabloSaved.rows.length-1) + ") ~ " + parseInt((((tabloSaved.rows.length-1)-fauxPositifs)*100)/(tabloSaved.rows.length-1)) + "%";
        }
    }    
}

/*
 * Ajout d'une ligne dans le tableau des sauvegardes
 */
function addDatas(){
    // Create an empty <tr> element and add it to the 1st position of the table:
    if((tabloSaved.rows.length)<=nbSavedMax){
        var row = tabloSaved.insertRow(tabloSaved.rows.length);
        if(syllabesSaved.indexOf(name)==-1){
            syllabesSaved.push(name);
        }

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        for(var i=0; i<nbTD+1 ; i++){
            var cell = row.insertCell(i);
            switch(i){                 
                case 0:
                    cell.innerHTML = "<i onclick='toggleOK(this)' class='fa fa-check-square ok' aria-hidden='true'></i>";
                    break;
                case 1:
                    cell.innerHTML = "<a style='color:black;' onclick='createHTMLRecord(this, " + (tabloSaved.rows.length-1) + ")'><i class='fa fa-caret-square-o-down' aria-hidden='true'></i></a>";
                    break;
                case 2:
                    cell.innerHTML = name;
                    break;
                case 3:
                    cell.innerHTML = parseInt(meanFrequency);
                    break;
                case 4:
                    cell.innerHTML = parseInt(minFrequency);
                    break;
                case 5:
                    cell.innerHTML = parseInt(maxFrequency);
                    break;
                case 6:
                    cell.innerHTML = parseInt(meanAmplitude);
                    break;
                case 7:
                    cell.innerHTML = parseInt(minAmplitude);
                    break;
                case 8:
                    cell.innerHTML = parseInt(maxAmplitude);
                    break;
                case 9:
                    cell.innerHTML = parseInt(duration);
                    break;
                case 10:
                    cell.innerHTML = parseInt(harmoniques);
                    break;
                case 11:
                    cell.innerHTML = parseInt(zeroCrossing);
                    break;
                default:
                    break;
            }
        }
        updateDatasDisplay(); 
    }
}

/*
 * Check or not check (valeurs en fonction de la classe "OK")
 */

function toggleOK(elem){
    if(elem.classList.contains("ok")){
        elem.parentElement.parentElement.style.opacity = 0.6;
        elem.parentElement.innerHTML = "<i onclick='toggleOK(this)' class='fa fa-square-o' aria-hidden='true'></i>";
        fauxPositifs ++;
    }else{
        elem.parentElement.parentElement.style.opacity = 1;    
        elem.parentElement.innerHTML = "<i onclick='toggleOK(this)' class='fa fa-check-square ok' aria-hidden='true'></i>";
        fauxPositifs --;
    }
    updateDatasDisplay();
}