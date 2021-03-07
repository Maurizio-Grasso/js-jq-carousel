$(document).ready( function() {
    mainFunction();    
});

const   sliderClassName = 'single-slider-root'; // Nome della classe assegnata agli slider
var     allSliders; // La variabile che conterrà tutti gli slider presenti nella pagina deve essere globale




function popolateHeaderMenu(slider) {
//  Questa funzione inserisce un link al menu per ogni slider presente nella pagina

    var sliderName = getSliderName(slider);
    var sliderId =  setSliderId(slider,sliderName);
    
    setSliderId(slider,sliderName);    // Assegna id univoco allo slider
    
    $(document).find('.inner-menu').find('ul').append('<li> <a href="#'+sliderId+'">'+sliderName+'</a></li>');
}

function getSliderName(slider) {
    //  Questa funzione Determina il nome da assegnare ad ogni slider in base al titolo H2 che lo precede    
    return $(slider).closest('.single-slider-root').find('.slider-heading').text();
}

function setSliderId(slider,sliderName) {
    //  Questa funzione assegna un id ad ogni slider    
    var sliderId = sliderName.toLowerCase().replace(/ /g,'-') + '-slider';
    $(slider).attr('id',sliderId);
    return sliderId;
}


function mainFunction() {
    
    
    allSliders = document.getElementsByClassName(sliderClassName);  // Tutti gli slider presenti nella pagina    
    
    var slidersCount = contaSlider(allSliders);    // Numero di slider trovati
    
    if (slidersCount > 0) { //  Se nella pagina sono presenti slider
        
        $(document).find('.hamburger-icon').click(function() {showMenu()});
        $(document).find('.close-window-icon').click(function() {hideMenu()});
        
        for (var i = 0; i < slidersCount; i++ ) {

        popolateHeaderMenu(allSliders[i]);

        popolateSliderNav(allSliders[i]);  // Popola il nav di ogni slider
        }
        
        $('.prev').click( function() { cambiaImmagine(this,-1); });   // Assegna evento a freccia sinistra
        $('.next').click( function() { cambiaImmagine(this,1); });   // Assegna evento a freccia destra
    
        $(document).keydown(function(keyPressed) {
            if (keyPressed.keyCode == 37)   // Se viene premuto tasto sinistro da tastiera
                cambiaImmagine("byKeyboard",-1);
            else if (keyPressed.keyCode == 39)  // Se viene premuto tasto destro da tastiera
                cambiaImmagine("byKeyboard",1);
        }
        );
    }
}


function cambiaImmagine(callingElement , offset) {
//  Passati come parametri un elemento chiamante (callingElement) ed un offset questa funzione cambia la slide visualizzata
//  'callingElement' è un elemento del DOM o la stringa "byKeyboard" se l'input è dato da tasiera
//  'offset' può essere uguale a: -1 (slide precendente), 1 (slide successiva), 0 (la slide da visualizzare si deduce da 'callingElement')

    if (callingElement == "byKeyboard" ){
        // Se l'input è dato da tastiera non ho altra scelta che scorrere le slide su *tutti* gli slider presenti in pagina
        // Richiamo quindi ricorsivamente la funzione stessa passando come callingElement uno slider alla volta
        for (let i = 0; i< contaSlider(allSliders); i++)
             cambiaImmagine(allSliders[i],offset);
    }
       // Se invece l'input non è dato da tastiera, determino da quale Slider proviene la chiamata
    else
        var currentSlider = $(callingElement).closest("."+sliderClassName);
    
    var activeElement = $(currentSlider).find('.active');   //  Assegna ad una variabile gli elementi attivi (Immagine e pallino)
    activeElement.removeClass('active');    // E rimuove da essi la classe active
    
    switch (offset) {
        case 0:
        // Ha chiamato il pallino del nav
            var callingElementIndex = $($(callingElement).parent()).find( "i" ).index( callingElement );    // Ottiene l'indice del pallino blu che ha chiamato (che corrisponderà alla foto da visualizzare)
            $(callingElement).addClass('active');   // Assegna classe active al pallino che ha chiamato
            $($(currentSlider).find('.images').find('img').get(callingElementIndex)).addClass('active');    // assegna classe active all'img corrisponente al pallino che ha chiamato
            break;

        case 1:
        // avanza di 1 (ha chiamato tastiera o 'next arrow')
            if (activeElement.hasClass('last')) // Se siamo sull'ultima immagine
                $(currentSlider).find('.first').addClass('active');
            else
                activeElement.next().addClass('active');
            break;

        case -1:
        // disavanza di 1 (ha chiamato tastiera o 'prev arrow')
            if (activeElement.hasClass('first'))    // Se siamo sulla prima immagine
               $(currentSlider).find('.last').addClass('active');
            else
                activeElement.prev().addClass('active');    
            break;                
        }
}



function popolateSliderNav(SingleSlider) {
    //  Questa funzione popola il nav dello slider con tanti pallini quante sono le immagini presenti nello slider stesso
    
    $(SingleSlider).find('.nav').html("");  //Per sicurezza resetta inner html prima di cominciare
    
    var imgCount = contaImmagini(SingleSlider);

    if (imgCount > 1 ) {    // Proseguo solo se c'è più di una immagine (altrimenti il nav è inutile)

        for (let i = 0; i < imgCount; i++ )
            $(SingleSlider).find('.nav').append('<i class="fas fa-circle"></i>');

        $($(SingleSlider).find('.nav').find('i').get(0)).addClass( "first active" );
        $($(SingleSlider).find('.nav').find('i').get(-1)).addClass( "last" );        
    
        for (let i = 0; i < imgCount; i++ ) {
            //  Questo blocco assegnerà un evento ad ogni pallino
            $($(SingleSlider).find('.nav').find('i').get(i)).click( function() {
                cambiaImmagine(this,0);
            })   
        }
    }
}

function contaSlider(allSliders) {
    //  Restituisce il numero di slider presenti nella pagina
    return allSliders.length;
}

function contaImmagini(SingleSlider) {    
    //  Passato uno specifico slider come parametro, la funzione conta il numero di immagini al suo interno
    return $(SingleSlider).find('.images').find('img').length;
}

function showMenu() {
    $(document).find('.inner-menu').addClass('shown');
    hideHamburger();
}
function hideMenu() {
    $(document).find('.inner-menu').removeClass('shown');
    showHamburger();
}
function showHamburger() {
    $(document).find('.hamburger-icon').addClass('shown');
}
function hideHamburger() {
    $(document).find('.hamburger-icon').removeClass('shown');
}