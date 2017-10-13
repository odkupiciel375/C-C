var d = document;
var mouse, player, screen, canvas, c, starterButtonCopy, testMode = false;
var existingobjects = [];
var objects, environment;
function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 1)];
	}
	return color;
}
var color = getRandomColor();

/*
*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*-=-=-=-=-=- Wywolywana tylko raz po "uruchomieniu programu" -=-=-=-
*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/
function start(){
	mouse = new Mouse();
	player = new Player();
	screen 	= new Screen();
	objects = new GDI();
	environment = new Environment();
	map = new Map(1);
	starterButtonCopy = d.getElementById("starter");
	d.body.removeChild(starterButtonCopy);
	document.getElementById("canvas").setAttribute("width",screen['width']);
	document.getElementById("canvas").setAttribute("height",screen['height']);
	player.cash = 10000;
	flashes = setInterval(function(){update();},1);
	blinks = setInterval(function(){fixedUpdate();},32);
}

/*
*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*-=-=-=-=-=-=-=-=- Wywolywana w kazdej mozliwej klatce -=-=-=-=-=-=-
*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/
function update(){
	canvas = document.getElementById('canvas');
	canvas.focus();
	if (canvas.getContext) {
		c = canvas.getContext('2d');
		c.clearRect(0, 0, screen.width, screen.height);
		drawMap();
		drawObjects();
		if(mouse.draggedObject!=null){
			drawDraggedObject();
		}
		if(mouse.select){
			c.strokeStyle = "#ffffff";
			c.strokeRect(mouse.clickedPosition.x, mouse.clickedPosition.y, mouse.coord.x - mouse.clickedPosition.x, mouse.coord.y - mouse.clickedPosition.y);
		}
		drawSelectedUnitsHealth();
		drawUi();
		//...
		debug();
	}
}

/*
*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*-=-=-=-=-=-=-=-=- Wywolywana 30 razy na 1 sekunde -=-=-=-=-=-=-=-=-
*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/
function fixedUpdate(){
	if(mouse.clicked && mouse.placing){
		if(mouse.draggedObject.structure){
			var object = new Object(mouse.draggedObject, mouse.clickedPosition.x, mouse.clickedPosition.y);
		}else{
			var object = new Unit(mouse.draggedObject, mouse.clickedPosition.x, mouse.clickedPosition.y);
		}
		mouse.clicked = false;
		mouse.placing = false;
		mouse.draggedObject = null;
		existingobjects.push(object);
	}
	if(existingobjects.length>0){
		repositionUnits();
	}
}

function debug(){
	if(testMode){
		c.fillStyle = "#aaaaaa";
		c.fillText("mouse.coord.x = "+mouse.coord.x+" mouse.coord.y = "+mouse.coord.y+" mouse.clickedPosition.x = "+mouse.clickedPosition.x+" mouse.clickedPosition.y = "+mouse.clickedPosition.y,100,screen.height-100);
	}
}

function drawMap(){
	for(x = 0; x < screen.ratio.horizontal*2; x++){
		for(y = 0; y < screen.ratio.vertical*2; y++){
			if(map.surface[x] == "undefined" || map.surface[x] == null){
				c.drawImage(environment.getSpriteById(0),x * 32, y * 32, 32, 32);
			}else{
				if(map.surface[x][y] == "undefined" || map.surface[x][y] == null){
					c.drawImage(environment.getSpriteById(0),x * 32, y * 32, 32, 32);
				}else{
					c.drawImage(environment.getSpriteById(map.surface[x][y]),x * 32, y * 32, 32, 32);
				}
			}
		}
	}
}

function selectselectedObjects(){
	var pos = {startX:0,startY:0,endX:0,endY:0}
	if(mouse.coord.x > mouse.clickedPosition.x){
		pos.startX = mouse.clickedPosition.x;
		pos.endX = mouse.coord.x;
	}else{
		pos.startX = mouse.coord.x;
		pos.endX = mouse.clickedPosition.x;
	}
	if(mouse.coord.y > mouse.clickedPosition.y){
		pos.startY = mouse.clickedPosition.y;
		pos.endY = mouse.coord.y;
	}else{
		pos.startY = mouse.coord.y;
		pos.endY = mouse.clickedPosition.y;
	}
	existingobjects.forEach(function(item, index){
		if((item.position.x > pos.startX && item.position.x < pos.endX) && (item.position.y > pos.startY && item.position.y < pos.endY)){
			mouse.selectedObjects.push(index);
		}
	});
}

function repositionUnits(){
	existingobjects.forEach(function(item, index){
		dir = 0;
		if(!item.structure){
			if(item.position.x != item.to.x || item.position.x != item.to.y){
				if(item.position.x < item.to.x){
					dir += 2;
				}else if(item.position.x > item.to.x){
					dir -= 2;
				}
				if(item.position.y < item.to.y){
					dir += 3;
				}else if(item.position.y > item.to.y){
					dir -= 3;
				}
				item.direction = dir;
				item.position.x += Math.floor((item.to.x - item.position.x).clamp(item.speed*(-1), item.speed));
				item.position.y += Math.floor((item.to.y - item.position.y).clamp(item.speed*(-1), item.speed));
			}
		}
	});
}

function removeSelectedItems(){
	for(i=mouse.selectedObjects.length-1;i>=0;i--){
		existingobjects.splice(mouse.selectedObjects[i],1);
		mouse.selectedObjects.splice(0,mouse.selectedObjects.length);
	}
}

function drawDraggedObject(){
	if(mouse.draggedObject.structure){
		c.drawImage(mouse.draggedObject.sprite,mouse.coord.x,mouse.coord.y);
	}else{
		c.drawImage(mouse.draggedObject.sprite.up,mouse.coord.x,mouse.coord.y);
	}
}

function drawObjects(){
	if(existingobjects.length>0){
		existingobjects.forEach(function(item, index){
			if(item.structure){
				c.drawImage(item.graphic,item.position.x,item.position.y);
			}else{
				console.log(item.direction);
				c.drawImage(item.getUnit(item.direction),item.position.x,item.position.y);
			}
		});
	}
}

function giveOrders(){
	mouse.givingOrders = false;
	if(mouse.selectedObjects.length<1){
		existingobjects[item].to.x = mouse.clickedPosition.x;
		existingobjects[item].to.y = mouse.clickedPosition.y;
	}else{
		row = mouse.clickedPosition.x;
		col = mouse.clickedPosition.y;
		size = Math.floor(Math.sqrt(mouse.selectedObjects.length));
		rowX = row;
		mouse.selectedObjects.forEach(function(item, index){
			if(index%size){
				existingobjects[item].to.x = rowX;
				existingobjects[item].to.y = col;
				rowX += 20;
			}else{
				col += 20;
				rowX = row;
				existingobjects[item].to.x = rowX;
				existingobjects[item].to.y = col;
				rowX += 20;
			}
		});
	}
}

function drawSelectedUnitsHealth(){
	if(mouse.selectedObjects.length>0){
		mouse.selectedObjects.forEach(function(selected,number){
			if(existingobjects[selected].health < objects.getObjectById(existingobjects[selected].id).health){
				c.fillStyle="#ff0000";
				c.fillRect(existingobjects[selected].position.x, existingobjects[selected].position.y, objects.getObjectById(existingobjects[selected].id).health, 2);
				c.fillStyle="#00ff00";
				c.fillRect(existingobjects[selected].position.x, existingobjects[selected].position.y, existingobjects[selected].health, 2);
			}else{
				c.fillStyle="#00ff00";
				c.fillRect(existingobjects[selected].position.x, existingobjects[selected].position.y, existingobjects[selected].health, 2);
			}
		});
	}
}

function drawUi(){
	c.font = "20px Arial";
	c.fillStyle = "#666666";
	c.fillRect(screen.width-200,0,200,screen.height);
	c.fillStyle = "#222222";
	c.fillRect(screen.width-200,0,200,200);
	c.fillRect(screen.width-200,200,200,50);
	c.fillStyle = "#aaaaaa";
	c.fillText(player.cash,screen.width-150,230);
	c.fillText(player.power,screen.width-50,230);
	c.drawImage(objects.getObjectByName("gdiLogo").sprite,screen.width-200,0);
	i = 250;
	for(k = 0; k < 10; k++){
		c.drawImage(objects.getObjectById(k).sprite,screen.width-200,i,100,100);
		c.drawImage(objects.getObjectById(++k).sprite,screen.width-100,i,100,100);
		i += 150;
	}
}