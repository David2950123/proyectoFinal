var jugando=true;
var alturas=[];
var x=0;
var tubos=[];
var tubos2=[];
var puntaje1 = 0;
var puntaje2 = 0;
var puntaje3 = 0;
var puntaje4 = 0;
var puntaje5= 0;
var nombre1 = 'Sin puntaje';
var nombre2 = 'Sin puntaje';
var nombre3 = 'Sin puntaje';
var nombre4 = 'Sin puntaje';
var nombre5 = 'Sin puntaje';
$(document).ready(inicio);
$(document).keydown(captura);

function comienzo(){
		for(altura=0;altura<1000;altura++){
          	alturas[altura]=Math.floor((Math.random() * 260) + 160);
        }
        puntaje1=localStorage.getItem('puntaje1');
        puntaje2=localStorage.getItem('puntaje2');
        puntaje3=localStorage.getItem('puntaje3');
        puntaje4=localStorage.getItem('puntaje4');
        puntaje5=localStorage.getItem('puntaje5');
        nombre1=localStorage.getItem('nombre1');
        nombre2=localStorage.getItem('nombre2');
        nombre3=localStorage.getItem('nombre3');
        nombre4=localStorage.getItem('nombre4');
        nombre5=localStorage.getItem('nombre5');
}

function asignarAlturas(){
	for(x;x<1000;x++){
		tubos[x]=new Tubo();
		tubos[x].x=(x+(1.5))*250;
		tubos[x].y=alturas[x];
		tubos2[x]=new Tubo2();
		tubos2[x].x=tubos[x].x;
		tubos2[x].y=alturas[x]-600;
	}
}




function inicio(){
	comienzo();
	lienzo = $("#lienzo")[0];
	audio = $('#fondoA')[0];
	continuarAudio=true;
	contexto = lienzo.getContext("2d");
	buffer = document.createElement("canvas");
	bufferContexto = buffer.getContext("2d");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	personaje = new Personaje();
	fondo = new Fondo();
	asignarAlturas();
	npuntaje=0;
	cinicio=0;
	contador=0;
	puntaje=0;
	colision=false;
	colision2=false;
    bufferContexto.clearRect(0, 0, buffer.width, buffer.height);
	bufferContexto.font = "bold 50px sans-serif";
	bufferContexto.fillStyle = "#ffffff"; 
	bufferContexto.fillText("BIENVENIDO", 170, 200);
	bufferContexto.font = "bold 30px sans-serif";
	bufferContexto.fillText("a flappy bird", 230, 240);
	contexto.clearRect(0,0,buffer.width,buffer.height);
	contexto.drawImage(buffer, 0, 0);
	audio.play();
	$("#iniciar").click(function(){
		asignarAlturas();
		jugando=true;
		x=0;
		juego();
		if (audio.paused) {
            audio.play();
        }else{
            audio.currentTime = 0
        }
		$("#iniciar").css("display","none");
	});

	$("#guardar").click(function(){
		$("#nombre").css("display","none");
		$("#guardar").css("display","none");
		$("#iniciar").css("display","inline");
		guardare();
		mostrar();
	});

	
	
}

function juego(){
	if(jugando){
		  cinicio+=50;
		  if(cinicio!=500){
		  	contador++;
		    if(contador==25){
		  	  puntaje++;
		  	  contador=0;
		    }	 
		  }
		   
		  bufferContexto.clearRect(0, 0, buffer.width, buffer.height);
	      fondo.dibujar(bufferContexto);
	      for(recorrido=0;recorrido<1000;recorrido++){
	      	tubos[recorrido].dibujar(bufferContexto);
	      	tubos2[recorrido].dibujar(bufferContexto);
	      }
          personaje.dibujar(bufferContexto);
          bufferContexto.font = "bold 30px sans-serif";
  	      bufferContexto.fillText("Puntaje: "+puntaje, 230, 40);
	      contexto.clearRect(0,0,buffer.width,buffer.height);
	      personaje.sprite += 1;
	      personaje.sprite = personaje.sprite % 3;	
	      contexto.clearRect(0, 0, lienzo.width, lienzo.height);
	      contexto.drawImage(buffer, 0, 0);

          if (audio.currentTime!=8) {
             audio.play();
          }
          for(recorrido=0;recorrido<1000;recorrido++){
          	colision=personaje.colision(tubos[recorrido].x,tubos[recorrido].y);
          	colision2=personaje.colision(tubos[recorrido].x,tubos[recorrido].y+50);
          	colision3=personaje.colision(tubos[recorrido].x,tubos[recorrido].y+100);
          	colision4=personaje.colision(tubos[recorrido].x,tubos[recorrido].y+150);
          	colision5=personaje.colision(tubos[recorrido].x,tubos[recorrido].y+200);
          	colision6=personaje.colision(tubos[recorrido].x,tubos[recorrido].y+250);
          	colision7=personaje.colision(tubos2[recorrido].x,tubos2[recorrido].y+250);
          	colision8=personaje.colision(tubos2[recorrido].x,tubos2[recorrido].y+300);
          	colision9=personaje.colision(tubos2[recorrido].x,tubos2[recorrido].y+350);
          	colision10=personaje.colision(tubos2[recorrido].x,tubos2[recorrido].y+415);
	        if(colision || colision2 || colision3 || colision4 || colision5 || colision6 || colision7 || colision8 || colision9 || colision10){
	    	  jugando=false;
	        }
          }
          
	      
	    setTimeout("juego()",55);  
        
    	 
	    
	}else{
		$("#nombre").css("display","inline");
		$("#guardar").css("display","inline");
		audio.pause();
        $('#golpe')[0].play();
        bufferContexto.clearRect(0, 0, buffer.width, buffer.height);
		bufferContexto.font = "bold 40px sans-serif";
	    bufferContexto.fillStyle = "#ffffff"; 
	    bufferContexto.fillText("JUEGO TERMINADO", 140, 200);
        bufferContexto.font = "bold 30px sans-serif";
	    bufferContexto.fillText("Puntaje: "+puntaje, 230, 240);
	    bufferContexto.fillText("Digita tu nombre", 190, 280);
	    contexto.clearRect(0, 0, buffer.width, buffer.height);
	    contexto.drawImage(buffer, 0, 0);
	    contador=0;  
		cinicio=0;
	    personaje.x=50;
	    personaje.y=220;
	    fondo.x=0;
	    comienzo();
	    x=0;
	}

		
	
}


function captura(event){
	if(event.which == 38)
		personaje.actualizar("arriba");
		$('#aleteo')[0].play();
}

function generar(){
	for(x=0;x<10;x++){
		contexto.drawImage(buffer,50*(x+1),255);
	}
	
}

function guardare(){
		if(puntaje>Number(localStorage.getItem('puntaje1')) || puntaje==puntaje>Number(localStorage.getItem('puntaje1'))){
			localStorage.setItem('nombre1',document.formulario.nombre.value);
			localStorage.setItem('puntaje1',puntaje);
			localStorage.setItem('nombre2',nombre1);
			localStorage.setItem('puntaje2',puntaje1);
			localStorage.setItem('nombre3',nombre2);
			localStorage.setItem('puntaje3',puntaje2);
			localStorage.setItem('nombre4',nombre3);
			localStorage.setItem('puntaje4',puntaje3);
			localStorage.setItem('nombre5',nombre4);
			localStorage.setItem('puntaje5',puntaje4);
		}else{
			if(puntaje>Number(localStorage.getItem('puntaje2')) || puntaje==Number(localStorage.getItem('puntaje2'))){
				localStorage.setItem('nombre2',document.formulario.nombre.value);
			    localStorage.setItem('puntaje2',puntaje);
			    localStorage.setItem('nombre3',nombre2);
			    localStorage.setItem('puntaje3',puntaje2);
			    localStorage.setItem('nombre4',nombre3);
			    localStorage.setItem('puntaje4',puntaje3);
			    localStorage.setItem('nombre5',nombre4);
			    localStorage.setItem('puntaje5',puntaje4);
			}else{
				if(puntaje>Number(localStorage.getItem('puntaje3')) || puntaje==Number(localStorage.getItem('puntaje3'))){
					localStorage.setItem('nombre3',document.formulario.nombre.value);
			        localStorage.setItem('puntaje3',puntaje);
			        localStorage.setItem('nombre4',nombre3);
			        localStorage.setItem('puntaje4',puntaje3);
			        localStorage.setItem('nombre5',nombre4);
			        localStorage.setItem('puntaje5',puntaje4);
				}else{
					if(puntaje>Number(localStorage.getItem('puntaje4')) || puntaje==Number(localStorage.getItem('puntaje4'))){
						localStorage.setItem('nombre4',document.formulario.nombre.value);
			            localStorage.setItem('puntaje4',puntaje);
			            localStorage.setItem('nombre5',nombre4);
			            localStorage.setItem('puntaje5',puntaje4);
					}else{
						if(puntaje>Number(localStorage.getItem('puntaje5'))|| puntaje==Number(localStorage.getItem('puntaje5'))){
							localStorage.setItem('nombre5',document.formulario.nombre.value);
			                localStorage.setItem('puntaje5',puntaje);
						}
					}
				}
			}
		}
		puntaje=0;
		comienzo();
}



function mostrar(){
        bufferContexto.clearRect(0, 0, buffer.width, buffer.height);
		bufferContexto.font = "bold 40px sans-serif";
	    bufferContexto.fillStyle = "#ffffff"; 
	    bufferContexto.fillText("RANKING PUNTAJES", 140, 100);
        bufferContexto.font = "bold 30px sans-serif";
	    bufferContexto.fillText("1-"+nombre1+": "+puntaje1, 230, 140);
	    bufferContexto.fillText("2-"+nombre2+": "+puntaje2, 230, 180);
	    bufferContexto.fillText("3-"+nombre3+": "+puntaje3, 230, 220);
	    bufferContexto.fillText("4-"+nombre4+": "+puntaje4, 230, 260);
	    bufferContexto.fillText("5-"+nombre5+": "+puntaje5, 230, 300);
	    contexto.clearRect(0, 0, buffer.width, buffer.height);
	    contexto.drawImage(buffer, 0, 0);
}






