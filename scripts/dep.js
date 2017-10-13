class vector2{
	constructor(varX, varY){
		this.x = varX;
		this.y = varY;
	}
}

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};