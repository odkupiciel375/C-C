class Screen{
	constructor(){
		this.width = parseInt(window.innerWidth);
		this.height = parseInt(window.innerHeight);
		this.ratio = {
			vertical:Math.floor(this.height / 64 + 1),
			horizontal:Math.floor((this.width - 200) / 64 + 1)
		};
		console.log(this.ratio.vertical+" "+this.ratio.horizontal);
	}
}