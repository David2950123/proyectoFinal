function Tubo2(){
	this.x=0;
	this.y=0;
	this.imagenes2 = [$("#tubo2")[0]];
	this.sprite2 =0;
	this.imagen2 = this.imagenes2[this.sprite2];
	

		
	this.dibujar = function(ctx){
          this.x -= 10;
          this.imagen2 = this.imagenes2[this.sprite2]; 
		  ctx.drawImage(this.imagen2, this.x, this.y);
    }   
    
    
}

