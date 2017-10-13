maps = {
	0:{
		0:{5:1},
		12:{4:1}
	}
}

class Map{
	constructor(id = 0){
		this.surface = {
		0:{0:1},
		12:{4:1}
	}//maps[id];
		console.log(this.surface[0]);
		console.log(this.surface[0][0]);
	}
}