class Mouse{
	constructor(){
		this.coord = new vector2(0, 0);
		this.clickedPosition = new vector2(0, 0);
		this.clicked = false;
		this.placing = false;
		this.draggedObject = null;
		this.selectedObjects = [];
		this.givingOrders = false;
		this.select = false;
	}
}