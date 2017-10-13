var can = document.getElementById("canvas");
can.addEventListener("mousemove",function(){
	mouse.coord.x = event.clientX;
	mouse.coord.y = event.clientY;
});
can.addEventListener("click",function(){
	if(mouse.coord.x>screen.width-200){
		var x=9;
		for(var i=850;i>=250;i-=150){
			if(mouse.coord.y>i){
				if(mouse.coord.x>screen.width-100){
					//prawy
					addToTray(x);
				}else{
					//lewy
					addToTray(x-1);
				}
				break; 
			}
			x-=2;
		}
	}else{
		mouse.clickedPosition.x = event.clientX;
		mouse.clickedPosition.y = event.clientY;
		if(mouse.placing){
			mouse.clicked = true;
		}else if(mouse.givingOrders){
			giveOrders();
			can.style.cursor = "default";
		}
	}
});
can.addEventListener("mousedown",function(){
	if(!mouse.select && !mouse.placing && !mouse.givingOrders){
		if(mouse.selectedObjects.length > 0 && !mouse.givingOrders){
			mouse.selectedObjects.splice(0,mouse.selectedObjects.length);
		}
		mouse.select = true;
		mouse.clickedPosition.x = event.clientX;
		mouse.clickedPosition.y = event.clientY;
		can.style.cursor = "none";
	}
});
can.addEventListener("mouseup",function(){
	if(mouse.select){
		mouse.select = false;
		selectselectedObjects();
		can.style.cursor = "default";
	}
});
document.body.addEventListener("keyup", function(e){
    e = e || window.event;//48-57
	switch(e.keyCode){
		case 46:
			if(mouse.selectedObjects.length>0){
				removeSelectedItems();
			}
			break;
		case 48:
			if(!mouse.placing){
				addToTray(0);
			}
			break;
		case 49:
			if(!mouse.placing){
				addToTray(1);
			}
			break;
		case 50:
			if(!mouse.placing){
				addToTray(2);
			}
			break;
		case 51:
			if(!mouse.placing){
				addToTray(3);
			}
			break;
		case 52:
			if(!mouse.placing){
				addToTray(4);
			}
			break;
		case 53:
			if(!mouse.placing){
				addToTray(5);
			}
			break;
		case 54:
			if(!mouse.placing){
				addToTray(6);
			}
			break;
		case 55:
			if(!mouse.placing){
				addToTray(7);
			}
			break;
		case 56:
			if(!mouse.placing){
				addToTray(8);
			}
			break;
		case 57:
			if(!mouse.placing){
				addToTray(9);
			}
			break;
		case 77:
			if(mouse.selectedObjects.length>0){
				mouse.givingOrders = true;
				can.style.cursor = "crosshair";
			}
			break;
		case 81:
			if(!mouse.placing){
				addToTray(10);
			}
			break;
		case 192:
			testMode = !testMode;
			break;
	}
});
document.body.addEventListener("contextmenu",function(){
	return false;
});
/*
function getMouseXCoords(event) {
	mouse.coord.x = event.clientX;
	mouse.coord.y = event.clientY;
}
function getClickedPosition(event){
	mouse.clicked = true;
	mouse.clickedPosition.x = event.clientX;
	mouse.clickedPosition.y = event.clientY;
}
function keyDetection(e){
	aler("test");
	if(e.keyCode == 49 || e.charCode == 49){
		alert("detected");
		mouse.placing = true;
		mouse.draggedObject = objects.base;
	}
}
*/
function addToTray(nr){
	if(player.cash >= objects.getObjectById(nr).cost){
		mouse.placing = true;
		player.cash -= objects.getObjectById(nr).cost;
		if(objects.getObjectById(nr).structure){
			player.power -= objects.getObjectById(nr).powerConsumption;
		}
		mouse.draggedObject = objects.getObjectById(nr);
	}
}