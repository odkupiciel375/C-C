class Environment{
	constructor(){
		this.sprites = {
			ground:d.getElementById("baseGround"),
			grass:d.getElementById("baseGrass")
		};
	}
	getSpriteById(id){
		switch(id){
			case 0:
			return this.sprites.ground;
			
			case 1:
			return this.sprites.grass;
		}
	}
}