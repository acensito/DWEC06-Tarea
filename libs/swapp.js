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


function buscaPersonaje(){
    //Obtenemos el valor del cuadro de texto
    var valor = $("#buscaPersonaje").val();
    
    //Si se ha introducido texto
    if (valor) {
        //Ocultamos algún resultado previo
        $('#resultado').addClass('hide');
        //Ocultamos el cuadro de búsqueda
        $('#cuadro-busqueda').addClass('hide');
        //Mostramos el gif de la espada laser cargando
        $('#load').removeClass('hide');


        $.ajax({
        url: 'https://swapi.co/api/people/?search=' + valor,
                type: 'GET',
                dataType: 'json'
        })

        .done(function(response) { muestraPersonaje(response);
                console.log(response);
        })

        .fail(function() {
                console.log("error");
                $('#error').text('Ha ocurrido un error');
        })

        .always(function() {
                console.log("Accion completada");
        });
    } else {
        $('#errorPersonaje').removeClass('hide');
        $('#errorPersonaje').html('Error sith: Primero un texto introducir debes');
    }
}

function buscaPelicula(){
	$('#resultado').addClass('hide');
	$('#cuadro-busqueda').addClass('hide');
	$('#load').removeClass('hide');
	var valor = $('#buscaPelicula').val();

	$.ajax({
	url: 'https://swapi.co/api/films/?search=' + valor,
		type: 'GET',
		dataType: 'json'
	})

	.done(function(response) { muestraPelicula(response);
		//console.log(response);
	})

	.fail(function() {
		console.log("error");
		$('#error').text('Ha ocurrido un error');
	})

	.always(function() {
		console.log('Acciones completadas');
	});
}

function buscaEpisodio(idEpisodio){
	$('#resultado').addClass('hide');
	$('#load').removeClass('hide');

	$.ajax({
	url: 'https://swapi.co/api/films/' + idEpisodio,
		type: 'GET',
		dataType: 'json'
	})

	.done(function(response) { muestraEpisodio(response);
		console.log(response);
	})

	.fail(function() {
		console.log("error");
		$('#error').text('Ha ocurrido un error');
	})

	.always(function() {
		console.log('Acciones completadas');
	});
}

function muestraPersonaje(datos){
	$('#cuadro-busqueda').removeClass('hide');
	$('#load').addClass('hide');

	var resultados = "";

	if (datos.count == 0) {
		$('#resultado').removeClass('hide');
		$('#resultado').html('<strong>No se han encontrado coincidencias, pero Jar Jar Binks existe :_(</strong>');
	} else {
		$('#resultado').removeClass('hide');
		for (i = 0; i < datos.count; i++){
			resultados += '<div class="container res">';
				resultados += '<h2>' + datos.results[i].name + '</h2>';
				resultados += '<p><strong>Sexo: </strong>' + datos.results[i].gender + '</p>';
				resultados += '<p><strong>Fecha nacimiento: </strong>' + datos.results[i].birth_year + '</p>';
				resultados += '<p><strong>Peso: </strong>' + datos.results[i].mass + ' Kg</p>';
				resultados += '<p><strong>Altura: </strong>' + conversorAltura(datos.results[i].height) + ' m</p>';
			resultados += '</div>';
		}
		console.log(resultados);
		$('#resultado').html(resultados);
	}
}

function conversorAltura(altura){
	return Number(altura) / 100;
}

function muestraPelicula(datos){
	$('#cuadro-busqueda').removeClass('hide');
	$('#load').addClass('hide');

	var resultados = "";

	if (datos.count == 0) {
		$('#resultado').removeClass('hide');
		$('#resultado').html('<strong>No se han encontrado coincidencias,tal vez lo tuyo sea Star Trek ;)</strong>');
	} else {
		$('#resultado').removeClass('hide');
		for (i = 0; i < datos.count; i++){
			//resultados += '<div><img src="img/sw_0'+datos.results[i].+'_poster.jpg"></div>'
			resultados += '<div class="container res">';
				resultados += '<h2>' + datos.results[i].title + '</h2>';
				resultados += '<p><strong>Director: </strong>' + datos.results[i].director + '</p>';
				resultados += '<p><strong>Productor: </strong>' + datos.results[i].producer + '</p>';
				resultados += '<p><strong>Fecha estreno: </strong>' + conversorFecha(datos.results[i].release_date) + '</p>';

			resultados += '</div>';
		}
		$('#resultado').html(resultados);
	}
}

function conversorFecha(fecha){
	var fch = new Date(fecha);
	return (fch.getDate() + '-' + fch.getMonth() + '-' + fch.getFullYear());
}
//HAY QUE TERMINAR ESTE BERENGENAL
function muestraEpisodio(datos) {
	$('#resultado').removeClass('hide');
	$('#load').addClass('hide');
	var resultados = '';

	resultados += '<div class="container res">';
		resultados += '<h2>' + datos.title + '</h2>';
		resultados += '<p><strong>Director: </strong>' + datos.director + '</p>';
		resultados += '<p><strong>Productor: </strong>' + datos.producer + '</p>';
		resultados += '<p><strong>Fecha estreno: </strong>' + conversorFecha(datos.release_date) + '</p>';
		resultados += '<p><strong>Actores participantes: </strong>' + datos.characters.length + '</p>';
	resultados += '</div>';

	$('#resultado').html(resultados);
}