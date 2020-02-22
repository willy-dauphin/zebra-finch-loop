/*
 * Déclarations de variables
 */

var frequenceMin = 255;
var frequenceMax = 12000;

var amplitudeMin = 0;
var amplitudeMax = 256;

var freqMin = document.getElementById('freqMin');
var freqMax = document.getElementById('freqMax');
var inputMin = document.getElementById('inputMin');
var inputMax = document.getElementById('inputMax');
var proba = document.getElementById('proba');
var harmo = document.getElementById('harmo');
var zeroCross = document.getElementById('zeroCross');
var nbSyllabes = document.getElementById('nbSyllabes');
var nbSavedMax = 100;

var ampMin = document.getElementById('ampMin');
var ampMax = document.getElementById('ampMax');
var inputAmpMin = document.getElementById('inputAmpMin');
var inputAmpMax = document.getElementById('inputAmpMax');
var nbEnregistrements = document.getElementById('nbEnregistrements');
var divProba = document.getElementById('divProba');
var divHarmo = document.getElementById('divHarmo');
var divZeroCross = document.getElementById('divZeroCross');
var divNbSyllabes = document.getElementById('divNbSyllabes');
var divNbEnregistrements = document.getElementById('divNbEnregistrements');

var toggle1 = document.getElementById('toggle1');
var toggle2 = document.getElementById('toggle2');
var toggle3 = document.getElementById('toggle3');
var toggle4 = document.getElementById('toggle4');
var toggle5 = document.getElementById('toggle5');

var zoom = 1;
var contrast = 1;

var nbGlobal = -1;

var testTablo;

var computedFilters;
var audioCtx;
var source;
var noeudGain;
var analyseur;
var tableauAmplitude;
var tableauFrequence;
var tableauBuffer = new Array();
var tableauBufferLeft = new Array();
var tableauBufferRight = new Array();
var tableauBuffersSaved = new Array();
var tailleMemoireTampon;
var isPlay = false;
var isGraph = true;
var isAnswer = false;
var isAutomaticAnswer = true;
var isRecord = false;
var isRaccourcis = true;
var nbRecurence = 5;
var timeToAnswer = 250;

var seuilHarmoniques = 85;
var seuilHarmoniques2 = 165;
var seuilZeroCrossing = 0.3;

var fauxPositifs = 0;

var autoValue = document.getElementById('autoValue');
var tablo = document.getElementById('tablo');
var tabloSaved = document.getElementById('tabloSaved');
var nbTD = 11;
var nbRow = 3;

var isAcceptUnknow = false;
var isAcceptNoise = false;
var isTranslate = false;
var isAcceptSyllabes = true;

var syllabesSaved = ["ALL"];
var selectSongs = "";
var indexSyllabeSaved = 1;
var nameSyl = "ALL";
var nbNameSyl = 0;

var testIncomplet = true;

/*
 * Variable as Object
 */

var meanFrequency = 0;
var maxFrequency = 0;
var minFrequency = 0;

var meanAmplitude = 0;
var maxAmplitude = 0;
var minAmplitude = 10;

var minOccurence = 15;
var duration = 0;

var zeroCrossing = 0;

var harmoniques = 0;
var seuilNoir = 25;//color
var seuilNbNoir = 1;//espaces
var seuilNbBlanc = 3;//espaces

/*
 * Le diamant mandarin est défini par...
 */

var meanAmplitudeZF = 50; //en dB (intensité/puissance)
var minDurationZF = 130; //en ms
var maxDurationZF = 1200; //en ms

/*
 * Sons à déclencher
 */

var distance = document.getElementById("CALL");
