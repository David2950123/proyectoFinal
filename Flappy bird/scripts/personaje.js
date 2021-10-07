function Personaje(){
	this.x = 50;
	this.y = 220;
	this.imagenes = [$("#up")[0],$("#middle")[0],$("#down")[0]];
	this.sprite = 0;
	this.imagen = this.imagenes[this.sprite];
	
	this.dibujar = function(ctx){
		this.y +=6;
		this.imagen = this.imagenes[this.sprite];
		ctx.drawImage(this.imagen, this.x, this.y);
		this.y = (480 + this.y) % 480;
		setTimeout("dibujar()",1);  

	}
	
	this.actualizar = function(accion){
		if(accion=="arriba")
			this.y -= 50;
		this.x = (640 + this.x) % 640;
		this.y = (480 + this.y) % 480;

	}

	this.colision= function(x,y){
	  var distancia=Math.sqrt(Math.pow((x-this.x),2)+Math.pow((y-this.y),2));
	  if(distancia<this.imagenes[this.sprite].width){
	  	return true;
	  }else if(this.y>400 || this.y<0){
      	return true;
      }else{
     	return false;
      }
    }

    this.dibujarInicio = function(ctx){
		this.x= 50;
		this.y=220;
		this.imagen = this.imagenes[this.sprite];
		ctx.drawImage(this.imagen, this.x, this.y);

	}
}