function Tubo(){
	this.x=0;
	this.y=0;
	this.imagenes = [$("#tubo")[0]];
	this.sprite = 0;
	this.imagen = this.imagenes[this.sprite];
	

		
	this.dibujar = function(ctx){
          this.x -= 10;
          this.imagen = this.imagenes[this.sprite]; 
		  ctx.drawImage(this.imagen, this.x, this.y);
    }   
       
    
}

