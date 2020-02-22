/*
var boobool = false;

//Bruit Ailes
var freqMoy2 = new Filtre("Fréquence moyenne", 653.41, 237.40, boobool);
var freqMin2 = new Filtre("Fréquence minimum", 258, 0, boobool);
var freqMax2 = new Filtre("Fréquence maximum", 10282.25, 960.82, false);
var intMoy2 = new Filtre("Intensité moyenne", 22.72, 1.86, false);
var intMin2 = new Filtre("Intensité minimum", 5, 0, boobool);
var intMax2 = new Filtre("Intensité maximum", 87.94, 9.01, false);
var duree2 = new Filtre("Durée", 694.13, 133.65, false);
var harmo2 = new Filtre("Harmoniques", 187.31, 56.01, true);
var zero2 = new Filtre("Zero-Crossing", 0, 0, true);

var f2 = new Array(freqMoy2, freqMin2, freqMax2, intMoy2, intMin2, intMax2, duree2, harmo2, zero2);
var AILES = new Syllabe("AILES", "Bruit parasite", "(pas de contexte)", f2, true);

//Bruit Mélange
var freqMoy3 = new Filtre("Fréquence moyenne", 551.40, 85.44, false);
var freqMin3 = new Filtre("Fréquence minimum", 258, 0, boobool);
var freqMax3 = new Filtre("Fréquence maximum", 6519.9, 184.55, false);
var intMoy3 = new Filtre("Intensité moyenne", 22.6, 0.85, false);
var intMin3 = new Filtre("Intensité minimum", 5, 0, boobool);
var intMax3 = new Filtre("Intensité maximum", 88, 3.13, false);
var duree3 = new Filtre("Durée", 563.7, 41.49, false);
var harmo3 = new Filtre("Harmoniques", 162.6, 20.68, true);
var zero3 = new Filtre("Zero-Crossing", 1, 0, true);

var f3 = new Array(freqMoy3, freqMin3, freqMax3, intMoy3, intMin3, intMax3, duree3, harmo3, zero3);
var MELANGE = new Syllabe("MELANGE", "Bruit parasite", "(pas de contexte)", f3, true);

//Bruit Saut
var freqMoy4 = new Filtre("Fréquence moyenne", 781.12, 299.32, boobool);
var freqMin4 = new Filtre("Fréquence minimum", 258, 0, boobool);
var freqMax4 = new Filtre("Fréquence maximum", 5610.79, 1955.99, false);
var intMoy4 = new Filtre("Intensité moyenne", 23.06, 1.91, false);
var intMin4 = new Filtre("Intensité minimum", 5.03, 0.1, boobool);
var intMax4 = new Filtre("Intensité maximum", 76.53, 16.71, false);
var duree4 = new Filtre("Durée", 276.74, 128.15, false);
var harmo4 = new Filtre("Harmoniques", 70.50, 65.26, true);
var zero4 = new Filtre("Zero-Crossing", 0, 0, true);

var f4 = new Array(freqMoy4, freqMin4, freqMax4, intMoy4, intMin4, intMax4, duree4, harmo4, zero4);
var SAUT = new Syllabe("SAUT", "Bruit parasite", "(pas de contexte)", f4, true);


//Tous les bruits à éviter sont mis dans le tableau ci-dessous !
var parasites = [SAUT, AILES, MELANGE];*/

//Bruit
var freqMoyNoise = new Filtre("Fréquence moyenne", 1, 1, false);
var freqMinNoise = new Filtre("Fréquence minimum", 1, 1, false);
var freqMaxNoise = new Filtre("Fréquence maximum", 1, 1, false);
var intMoyNoise = new Filtre("Intensité moyenne", 1, 1, false);
var intMinNoise = new Filtre("Intensité minimum", 1, 1, false);
var intMaxNoise = new Filtre("Intensité maximum", 1, 1, false);
var dureeNoise = new Filtre("Durée", 1, 1, false);
var harmoNoise = new Filtre("Ratio (harm.)", 1, 1, false);
var zeroNoise = new Filtre("Ratio (ZC.)", 1, 1, false);

var fNoise = new Array(freqMoyNoise, freqMinNoise, freqMaxNoise, intMoyNoise, intMinNoise, intMaxNoise, dureeNoise, harmoNoise, zeroNoise);
var BRUIT = new Syllabe("BRUIT", "Bruit parasite", "(pas de contexte)", fNoise, true);

var parasites = [BRUIT];