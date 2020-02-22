class Storage{
    constructor(nom, tableau = new Array()){
        try{
            if(!tableau instanceof Array){
                throw new Error("Le second paramètre du constructeur de Storage doit être de type Array() !");
            }
            this.nom = nom;
            this.values = tableau;
            if(this.isUndefined(this.nom+"Memory")){
                //Mémoire pas encore créée
                localStorage.setItem(this.nom+"Memory", JSON.stringify(this.values));
            }
            if(this.isUndefined(this.nom)){
                //pas encore créé
                this.upload();
            }else{
                this.download();
            }
        }catch(err){
            console.log(err);
        }
    }
    
    getValue(index){
        try{
            if(index >= this.values.length){
                throw new Error("Index trop grand pour le tableau !");
            }
            return this.values[index];
        }catch(err){
            console.log(err);
        }
    }
    
    isUndefined(name){
        var res = false;
        if(localStorage.getItem(name) == null || localStorage.getItem(name) == undefined || localStorage.getItem(name) == "null" || localStorage.getItem(name) == "undefined" || localStorage.getItem(name) == ""){
            res = true;
        }
        return res;
    }
    
    upload(){
        try{
            localStorage.setItem(this.nom, JSON.stringify(this.values));
            //à supprimer ! 
            syllabes = this.values;
        }catch(err){
            console.log("Impossible de sauvegarder les valeurs pour (" + this.nom + ") : " + err);
        }
    }
    
    download(){
        try{
            this.values = JSON.parse(localStorage.getItem(this.nom));
        }catch(err){
            console.log("Impossible de récupérer les valeurs sauvegardées pour (" + this.nom + ") : " + err);
        }
    }
    
    downloadMemory(){
        try{
            this.values = JSON.parse(localStorage.getItem(this.nom+"Memory"));
        }catch(err){
            console.log("Impossible de récupérer les valeurs sauvegardées pour (" + this.nom + "Memory) : " + err);
        }
        this.upload();
    }
    
    getMemory(){
        try{
            return JSON.parse(localStorage.getItem(this.nom+"Memory"));
        }catch(err){
            console.log("Impossible de récupérer les valeurs en mémoire pour (" + this.nom + ") : " + err);
        }
    }
    
    getJSON(){
        return localStorage.getItem(this.nom);
    }
    
    getMemoryJSON(){
        return localStorage.getItem(this.nom+"Memory");
    }
    
    getValues(){
        return this.values;
    }
    
    addValue(value){
        var res = false;
        if(this.index(value)==-1){
            res = true;
            this.values.push(value);
            this.upload();
        }
        return res;
    }
    
    removeValue(value, bool=true){
        var res = false;
        var index = this.index(value);
        if(index!=-1){
            res = true;
            this.values.splice(index, 1);
            if(bool){
                this.upload();
            }
        }
        return res;
    }
    
    removeValueFromIndex(nb, bool=true){
        try{
            var res = false;
            if(nb<this.values.length){
                res = true;
                this.values.splice(nb, 1);
                if(bool){
                    this.upload();
                }
            }else{
                throw new Error("Index trop grand pour le tableau !");
            }
            return res;
        }catch(err){
            console.log(err);
        }
    }
    
    index(value){
        return this.values.indexOf(value);
    }
    
    addValueMemory(value){
        try{
            var memory = this.getMemory();
            memory.push(value);
            localStorage.setItem(this.nom+"Memory", JSON.stringify(memory));
        }catch(err){
            console.log("Impossible d'ajouter au localStorage." + this.nom + "Memory : " + err);
        }
    }
    
    clean(){
        try{
            localStorage.setItem(this.nom, JSON.stringify(new Array()));
            localStorage.setItem(this.nom+"Memory", JSON.stringify(new Array()));
            this.downloadMemory();
            //localStorage.removeItem(this.nom);
            //localStorage.removeItem(this.nom+"Memory");
            //this.values = new Array();
        }catch(err){
            console.log("Impossible de nettoyer le localStorage." + this.nom + " : " + err);
        }
    }
}
