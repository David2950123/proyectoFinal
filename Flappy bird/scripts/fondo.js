function Fondo(){
	this.x = 0;
	this.y = 0;
	this.imagenes = [$("#fondo")[0]];
	this.sprite = 0;
	this.imagen = this.imagenes[this.sprite];
	
	this.dibujar = function(ctx){
		if(this.x==-1280)
		  this.x = (this.x) %640;
		else
          this.x -= 10;
		  this.imagen = this.imagenes[this.sprite];
		  ctx.drawImage(this.imagen, this.x, this.y);
    }

}