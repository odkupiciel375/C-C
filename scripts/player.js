class Player{
	constructor(){
		this.side = 0;
		this.cash = 0;
		this.power = 0;
	}
	addCash(value){
		this.cash += value;
	}
	addPower(value){
		this.power += value;
	}
}