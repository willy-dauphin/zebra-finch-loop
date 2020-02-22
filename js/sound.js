    /*
     * Mise en place du graphe audio
     */

    // getUserMedia block - grab stream
    // put it into a MediaStreamAudioSourceNode
    // also output the visuals into a video element

    if (navigator.mediaDevices) {
        //Le navigateur supporte l'entrée microphone !
        console.log('getUserMedia supported.');
        navigator.mediaDevices.getUserMedia ({audio: true, video: false})
        .then(function(stream) {
            //Instanciation
            audioCtx = new AudioContext();
            source = audioCtx.createMediaStreamSource(stream);
            noeudGain = audioCtx.createGain();
            analyseur = audioCtx.createAnalyser();
            //Connexion
            source.connect(noeudGain);
            isConnected = true; //Gestion du play/stop
            noeudGain.connect(analyseur);
            analyseur.connect(audioCtx.destination);
            
            //Traitement
            tailleMemoireTampon = analyseur.frequencyBinCount;
            tableauAmplitude = new Uint8Array(tailleMemoireTampon);
            tableauFrequence = new Uint8Array(tailleMemoireTampon);
            testTablo = new Float32Array(tailleMemoireTampon); 
            Spectre();
        })
        .catch(function(err) {
            console.log('Une erreur gUM a été rencontrée : ' + err);
        });
    } else {
        //Le navigateur ne supporte pas l'entrée microphone
        console.log('Votre navigateur ne supporte pas getUserMedia !');
        alert('Votre navigateur ne supporte pas getUserMedia !');
    }