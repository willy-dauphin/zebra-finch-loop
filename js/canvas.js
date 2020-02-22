var context;
var canvas;

(function() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;//Attention si bordures !
        if(canvas.width<768 && canvas.width>=640){
            canvas.height = canvas.width*0.3;    
        }else if(canvas.width<640){
            canvas.width*0.5;
        }else{
            canvas.height = canvas.width*0.15;
        }

        /**
         * Your drawings need to be inside this function otherwise they will be reset when 
         * you resize the browser window and the canvas goes will be cleared.
         */
        drawStuff(); 
    }
        resizeCanvas();

    function drawStuff() {
            // do your drawing stuff here
    }
})();