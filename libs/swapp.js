/* 
 * 2017 Felipe Rodríguez Gutiérrez
 *
 * CODIGO CREADO BAJO LICENCIA CREATIVE COMMONS
 *
 * Reconocimiento - NoComercial - CompartirIgual (by-nc-sa): 
 *
 * No se permite un uso comercial de la obra original ni de las posibles obras 
 * derivadas, la distribución de las cuales se debe hacer con una licencia igual
 * a la que regula la obra original.
 */

/* 
 * Módulo: Desarrollo Web Entorno Cliente
 * Tema 06: Programación AJAX en JavaSccript
 * Tarea 6: Starwarspedia
 * Alumno: Felipe Rodríguez Gutiérrez
 */

/**
 * Eventos disponibles a la finalización de la carga de la página
 */
$(document).ready(function(){

    //Evento cuando se hace click en un poster de un episodio y muestre en el
    //cuadro de resultados los datos de dicho episodio
    $('img').click(function() {
        //Obtenemos el el valor id de dicho poster
        var episodio = $(this).attr('id');
        //Hacemos la búsqueda de los datos a mostrar
        buscaEpisodio(episodio);
    });

    //Evento que se dispara cuando cambia de imagen (para ocultar el 
    //cuadro de resultados si existiera una búsqueda previa)
    $('#myCarousel').bind('slide.bs.carousel', function (e) {
        $('#resultado').addClass('hide');
    });

    //Evento que se dispara cuando se usa el cuadro de búsqueda de Pelicula
    //haciendo click en el botón de búsqueda
    $('#enviarPelicula').click(buscaPelicula);
    
    //Evento que se dispara cuando se usa el cuadro de búsqueda de Personaje
    //haciendo click en el botón de búsqueda
    $('#enviarPersonaje').click(buscaPersonaje);

    //Evento que manda el valor del input en el que se hace enter
    $('input').bind('keypress', function(e){
        //Si se presiona Enter
        if(e.which === 13) {
            //Obtenemos el valor ID del campo input activo, que tendrá el mismo
            //nombre que los métodos a utilizar
            var valBusqueda = $(this).attr('id');
            //Lanzamos el método que conrresponde con el nombre de dicho ID
            //Gentileza buscando en los foros de StackOverflow
            window[valBusqueda]();
        }
    });

});

/* EVENTOS AJAX BUSQUEDA*/
/************************/

/**
 * Metodo buscaPersonaje, que recupera el del input de búsqueda de personaje, lo
 * envia a la API y recupera el resultado. Dependiendo del resultado obtenido
 * envia al metodo para su proceso o muestra los correspondientes mensajes de
 * error.
 */
function buscaPersonaje(){
    //Obtenemos el valor del cuadro de texto
    var valor = $("#buscaPersonaje").val();
    
    //Si se ha introducido texto
    if (valor) {
        //Ocultamos algún resultado previo
        $('#resultado').addClass('hide');
        //Ocultamos algún error existente
        $('#errorPelicula').addClass('hide');
        $('#errorPersonaje').addClass('hide');
        //Ocultamos el marco con los elementos
        $('#marco-ejercicio').addClass('hide');
        //Mostramos el gif de la espada laser cargando
        $('#load').removeClass('hide');

        //Hacemos la llamada AJAX
        $.ajax({
            url: 'https://swapi.co/api/people/?search=' + valor,
            type: 'GET',
            dataType: 'json'
        })

        //En el caso de recibir respuesta correcta
        .done(function(response) { 
            //Elaboramos la respuesta llamando al metodo
            muestraPersonaje(response);
            //Mostramos por consola la respuesta por DEBUG
            //console.log(response);
        })

        //En el caso de no recibir respuesta correcta
        .fail(function() {
            //Mostramos un mensaje en la consola por DEBUG
            console.log("error");
            //Mostramos un mensaje en la página
            $('#error-conexion').removeClass('hide');
            $('#load').addClass('hide');
        })

        //En cualquier caso
        .always(function() {
            //Mostramos un mensaje en la consola por DEBUG
            console.log("Accion completada");
        });
    } else {
        //Ocultamos algún resultado previo
        $('#resultado').addClass('hide');
        //Mostramos el cuadro de errores de personaje, ocultamos el de pelicula
        //por si se encontrara activo
        $('#errorPersonaje').removeClass('hide');
        $('#errorPelicula').addClass('hide');
        //Le asignamos un mensaje
        $('#errorPersonaje').html('Error sith: Primero un texto introducir debes');
    }
}

/**
 * Metodo buscaPelicula, que recupera el del input de búsqueda de pelicula, lo
 * envia a la API y recupera el resultado. Dependiendo del resultado obtenido
 * envia al metodo para su proceso o muestra los correspondientes mensajes de
 * error.
 */
function buscaPelicula(){
    //Obtenemos el valor del cuadro de texto
    var valor = $('#buscaPelicula').val();
    
    //Si se ha introducido texto
    if (valor) {
        //Ocultamos algún resultado previo
        $('#resultado').addClass('hide');
        //Ocultamos algún error existente
        $('#errorPelicula').addClass('hide');
        $('#errorPersonaje').addClass('hide');
        //Ocultamos el marco con los elementos
        $('#marco-ejercicio').addClass('hide');
        //Mostramos el gif de la espada laser cargando
        $('#load').removeClass('hide');

        //Hacemos la llamada AJAX
        $.ajax({
            url: 'https://swapi.co/api/films/?search=' + valor,
            type: 'GET',
            dataType: 'json'
        })

        //En el caso de recibir respuesta correcta
        .done(function(response) { 
            //Elaboramos la respuesta llamando al metodo
            muestraPelicula(response);
            //Mostramos por consola la respuesta por DEBUG
            //console.log(response);
        })

        //En el caso de no recibir respuesta correcta
        .fail(function() {
            //Mostramos un mensaje en la consola por DEBUG
            console.log("error");
            //Mostramos un mensaje en la página
            $('#error-conexion').removeClass('hide');
            $('#load').addClass('hide');
        })

        //En cualquier caso
        .always(function() {
            //Mostramos un mensaje en la consola por DEBUG
            console.log("Accion completada");
        });
    } else {
        //Ocultamos algún resultado previo
        $('#resultado').addClass('hide');
        //Mostramos el cuadro de errores
        $('#errorPelicula').removeClass('hide');
        $('#errorPersonaje').addClass('hide');
        //Le asignamos un mensaje
        $('#errorPelicula').html('Error sith: Primero un texto introducir debes');
    }
}

/**
 * Metodo buscaEpisodio, que recupera el id del episodio pasado por parametro, lo
 * envia a la API y recupera el resultado. Dependiendo del resultado obtenido
 * envia al metodo para su proceso o muestra los correspondientes mensajes de
 * error.
 * 
 * @param {type} idEpisodio 
 */
function buscaEpisodio(idEpisodio){
    //Ocultamos algún resultado previo
    $('#resultado').addClass('hide');
    //Ocultamos algún error existente
    $('#errorPelicula').addClass('hide');
    $('#errorPersonaje').addClass('hide');
    //Ocultamos el marco con los elementos
    $('#marco-ejercicio').addClass('hide');
    //Mostramos el gif de la espada laser cargando
    $('#load').removeClass('hide');

    //Hacemos la llamada AJAX
    $.ajax({
        url: 'https://swapi.co/api/films/' + idEpisodio,
        type: 'GET',
        dataType: 'json'
    })
    
    //En el caso de recibir respuesta correcta
    .done(function(response) { 
        //Elaboramos la respuesta llamando al metodo
        muestraEpisodio(response);
        //Mostramos por consola la respuesta por DEBUG
        //console.log(response);
    })
    
    //En el caso de no recibir respuesta correcta
    .fail(function() {
        //Mostramos un mensaje en la consola por DEBUG
        console.log("error");
        //Mostramos un mensaje en la página
        $('#error-conexion').removeClass('hide');
        $('#load').addClass('hide');
    })

    //En cualquier caso
    .always(function() {
        //Mostramos un mensaje en la consola por DEBUG
        console.log("Accion completada");
    });
}

/**
 * Metodo nombrePersonaje, que al serle pasada la url del personaje recupera su
 * nombre y lo inserta en la lista no ordenada de personajes
 * 
 * @param {type} urlPersonaje
 */
function nombrePersonaje(urlPersonaje){
    //Hacemos la llamada AJAX
    $.ajax({
        url: urlPersonaje,
        type: 'GET',
        dataType: 'json'
    })
    
    //En el caso de recibir respuesta correcta
    .done(function(response) { 
        //Agregamos a la etiqueta #personajes en la respuesta el listado de 
        //personajes intervinientes en la pelicula
        $('#personajes').append('<li>' + response.name + '</li>');
        //Asincrono total, vaya
    })
    
    //En el caso de no recibir respuesta correcta
    .fail(function() {
        //Mostramos un mensaje en la consola por DEBUG
        console.log("error");
        //Mostramos un mensaje en la página
        $('#error-conexion').removeClass('hide');
        $('#load').addClass('hide');
    })

    //En cualquier caso
    .always(function() {
        //Mostramos un mensaje en la consola por DEBUG
        console.log("Accion completada");
    });
}


/* MANEJO Y ELABORACION DE RESULTADOS */
/**************************************/

/**
 * Metodo muestraPersonaje que recibe los datos y los gestiona para mostrarlo en
 * la capa div de resultados.
 * 
 * @param {type} datos cadena json con los resultados
 */
function muestraPersonaje(datos){
    //Mostramos la capa de controles
    $('#marco-ejercicio').removeClass('hide');
    //Ocultamos el gif de la espada laser cargando
    $('#load').addClass('hide');

    //Preparamos una variable de resultados
    var resultados = "";

    //Si el contador de resultados ha sido cero
    if (datos.count === 0) {
        //Mostramos el cuadro de resultados
        $('#resultado').removeClass('hide');
        //Asignamos mensaje de feedback
        $('#resultado').html('<div class="container res"><strong>No se han encontrado coincidencias, pero Jar Jar Binks existe :_(</strong></div>');
    //Si existen resultados
    } else {
        //Mostramos el cuadro de resultados
        $('#resultado').removeClass('hide');
        //Recorremos los datos tantas como ocurrencias hayan existido
        for (i = 0; i < datos.count; i++){
            //Se abre una capa y se van añadiendo a la variable de resultados
            resultados += '<div class="container res">';
                resultados += '<h2>' + datos.results[i].name + '</h2>';
                resultados += '<p><strong>Sexo: </strong>' + datos.results[i].gender + '</p>';
                resultados += '<p><strong>Fecha nacimiento: </strong>' + datos.results[i].birth_year + '</p>';
                resultados += '<p><strong>Peso: </strong>' + datos.results[i].mass + ' Kg</p>';
                resultados += '<p><strong>Altura: </strong>' + conversorAltura(datos.results[i].height) + ' m</p>';
            resultados += '</div>';
        }
        //Asignamos el html a la capa de resultados
        $('#resultado').html(resultados);
    }
}

/**
 * Metodo muestraPelicula que recibe los datos y los gestiona para mostrarlo en
 * la capa div de resultados.
 * 
 * @param {type} datos cadena json con los resultados
 */
function muestraPelicula(datos){
    //Mostramos la capa de controles
    $('#marco-ejercicio').removeClass('hide');
    //Ocultamos el gif de la espada laser cargando
    $('#load').addClass('hide');

    //Preparamos una variable de resultados
    var resultados = "";
    
    //Si el contador de resultados ha sido cero
    if (datos.count === 0) {
        //Mostramos el cuadro de resultados
        $('#resultado').removeClass('hide');
        //Asignamos mensaje de feedback
        $('#resultado').html('<div class="container res"><strong>No se han encontrado coincidencias,tal vez lo tuyo sea Star Trek ;)</strong></div>');
    //Si existen resultados
    } else {
        //Mostramos el cuadro de resultados
        $('#resultado').removeClass('hide');
        //Recorremos los datos tantas como ocurrencias hayan existido
        for (i = 0; i < datos.count; i++){
            //Se abre una capa y se van añadiendo a la variable de resultados
            resultados += '<div class="container res">';
                resultados += '<h2>' + datos.results[i].title + '</h2>';
                resultados += '<p><strong>Director: </strong>' + datos.results[i].director + '</p>';
                resultados += '<p><strong>Productor: </strong>' + datos.results[i].producer + '</p>';
                resultados += '<p><strong>Fecha estreno: </strong>' + conversorFecha(datos.results[i].release_date) + '</p>';
                resultados += '<p><strong>Nº actores participantes: </strong>' + datos.results[i].characters.length + '</p>';
            resultados += '</div>';
        }
        //Asignamos el html a la capa de resultados
        $('#resultado').html(resultados);
    }
}


/**
 * Metodo muestraEpisodio que recibe los datos y los gestiona para mostrarlo en
 * la capa div resultados
 * 
 * @param {type} datos cadena json con los resultados
 */
function muestraEpisodio(datos) {
    //Mostramos la capa de controles
    $('#marco-ejercicio').removeClass('hide');
    //Mostramos la capa de resultados
    $('#resultado').removeClass('hide');
    //Ocultamos el gif de la espada laser cargando
    $('#load').addClass('hide');
    
    //Preparamos una variable de resultados
    var resultados = '';

    //Se abre una capa y se añade a dicha capa los diferentes resultados
    resultados += '<div class="container res">';
            resultados += '<h2>' + datos.title + '</h2>';
            resultados += '<p><strong>Director: </strong>' + datos.director + '</p>';
            resultados += '<p><strong>Productor: </strong>' + datos.producer + '</p>';
            resultados += '<p><strong>Fecha estreno: </strong>' + conversorFecha(datos.release_date) + '</p>';
            resultados += '<p><strong>Nº actores participantes: </strong>' + datos.characters.length + '</p>';
            //En esta etiqueta que añadimos, añadiremos los personajes que 
            //posteriormente vamos a buscar.
            resultados += '<ul id="personajes"></ul>';
    resultados += '</div>';

    //Asignamos el html a la capa de resultados
    $('#resultado').html(resultados);
    
    //EXTRA EXTRA:
    //Si seleccionamos un poster de un episodio, vamos a añadir a los resultados
    //los personajes que salen en dicho episodio. Para ello, vamos a obtener la
    //url de cada personaje y vamos a pasarla al metodo correspondiente, el cual
    //al obtener el dato lo insertará en la id de personajes de la capa de 
    //resultados.
    //
    //Esta idea es algo chapuza a mi criterio sinceramente, aunque funciona
    //tras haberme empapado el funcionamiento de Deferreds y Promises sin llegar
    //a la solución que pretendía (devolver el resultado de un solo golpe).
    //Creo que el secreto está en .then(), pero son las 01:24 y ya estoy alargando
    //la tarea más de la cuenta.
    for (i = 0; i < datos.characters.length; i++) {
        nombrePersonaje(datos.characters[i]);
    }
}


/* Funciones auxiliares */
/************************/

/**
 * Función auxiliar para convertir la fecha al formato DD-MM-YYYY
 * 
 * @param {type} fecha String con en formato fecha ISO
 * 
 * @returns {String} String con la fecha formateada dd-mm-yyyy
 */
function conversorFecha(fecha){
    //Instanciamos un nuevo objeto fecha
    var fch = new Date(fecha);
    //Devolvemos una cadena con el formato indicado
    return (fch.getDate() + '-' + fch.getMonth() + '-' + fch.getFullYear());
}

/**
 * Función auxiliar para pasar los cm de altura a metros
 * 
 * @param {type} altura altura en centimetros
 * 
 * @returns {Number} altura en metros con decimales
 */
function conversorAltura(altura){
    //Se divide la altura entre 100
    return Number(altura) / 100;
}
