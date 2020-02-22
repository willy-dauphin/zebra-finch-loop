/*
 * Cette page peut se modifier assez simplement, si vous souhaitez rajouter des syllabes.
 * Dans ce cas, il suffit de suivre les instruction ci-dessous :
 * Un filtre se compose ainsi : 
 * new Filtre(NOM, MOYENNE, ECART_TYPE, BOOLEAN);
 * - NOM : nom du filtre (permet un debugage rapide)
 * - MOYENNE : moyenne du filtre, obtenue grâce à une série statistique préliminaire
 * - ECART_TYPE : écart-type autour de la moyenne précédente
 * - BOOLEAN : si TRUE, le paramètre n'est pas pris en compte dans la recherche de la syllabe / si FALSE, il est pris en compte !
 * 
 * Une fois les filtres spécifiés, il faut simplement les assembler dans un tableau - new Array(...,...,...);
 * Ce tableau permet la création d'une syllabe : 
 * new Syllabe(NOM, SIGNIFICATION, CONTEXT, TABLEAU_DE_FILTRES)
 *
 * Une fois la syllabe instanciée, il ne reste plus qu'à l'ajouter au tableau syllabes en bas de page.
 *
 * N.B : il est préférable d'utiliser les mêmes filtres pour chaque syllabes car leur valeurs en temps réel sont calculées indépendamment.
 * C'est pour cela qu'a été introduit le boolean permettant de choisir si tel ou tel filtre est signifiant pour telle ou telle syllabe !
 */

//false --> filtre utilisé
//true --> filtre non utilisé

/*
//Syllabes courtes !
var freqMoy0 = new Filtre("Fréquence moyenne", 924, 376, testIncomplet);
var freqMin0 = new Filtre("Fréquence minimum", 258, 0, testIncomplet);
var freqMax0 = new Filtre("Fréquence maximum", 7830, 2206, testIncomplet);
var intMoy0 = new Filtre("Intensité moyenne", 21.56, 4.42, testIncomplet);
var intMin0 = new Filtre("Intensité minimum", 5, 0, testIncomplet);
var intMax0 = new Filtre("Intensité maximum", 115.7, 19.56, false);
var duree0 = new Filtre("Durée", 335.3, 64.55, false);
var harmo0 = new Filtre("Harmoniques", 0, 0, testIncomplet);
var zero0 = new Filtre("Zero-Crossing", 0, 0, testIncomplet);

var f0 = new Array(freqMoy0, freqMin0, freqMax0, intMoy0, intMin0, intMax0, duree0, harmo0, zero0);
var SC = new Syllabe("STACK", "Watch me ! / Join me !", "(intention)", f0, true);

//Syllabes Distance !
var freqMoy1 = new Filtre("Fréquence moyenne", 958.5, 486.43, testIncomplet);
var freqMin1 = new Filtre("Fréquence minimum", 258, 0, testIncomplet);
var freqMax1 = new Filtre("Fréquence maximum", 9689.3, 1476.95, false);
var intMoy1 = new Filtre("Intensité moyenne", 19.4, 4.25, false);
var intMin1 = new Filtre("Intensité minimum", 5, 0, testIncomplet);
var intMax1 = new Filtre("Intensité maximum", 141.1, 9.02, false);
var duree1 = new Filtre("Durée", 478.7, 68.68, false);
var harmo1 = new Filtre("Harmoniques", 0, 0, testIncomplet);
var zero1 = new Filtre("Zero-Crossing", 0, 0, testIncomplet);

var f1 = new Array(freqMoy1, freqMin1, freqMax1, intMoy1, intMin1, intMax1, duree1, harmo1, zero1);
var DIST = new Syllabe("DIST", "Join me ! / I'm here ! / It's me !", "(localisation / identity / alarm)", f1, true);

//Bruits et syllabes mélangés
var freqMoy3 = new Filtre("Fréquence moyenne", 471.37, 55.93, false);
var freqMin3 = new Filtre("Fréquence minimum", 258, 0, testIncomplet);
var freqMax3 = new Filtre("Fréquence maximum", 10558, 744.91, false);
var intMoy3 = new Filtre("Intensité moyenne", 23.26, 3.66, false);
var intMin3 = new Filtre("Intensité minimum", 5, 0, testIncomplet);
var intMax3 = new Filtre("Intensité maximum", 116.33, 16.44, false);
var duree3 = new Filtre("Durée", 704.4, 171.76, false);
var harmo3 = new Filtre("Harmoniques", 0, 0, testIncomplet);
var zero3 = new Filtre("Zero-Crossing", 0, 0, testIncomplet);

var f3 = new Array(freqMoy3, freqMin3, freqMax3, intMoy3, intMin3, intMax3, duree3, harmo3, zero3);
var MELANGES = new Syllabe("MÉLANGE", "", "", f3, true);
*/

//Toutes les syllabes utilisées sont mises dans un même tableau !
var syllabes = new Array();