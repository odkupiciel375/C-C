class Object{
	constructor(ob, posX, posY){
		this.id = ob.id;
		this.position = new vector2(posX, posY);
		this.side = 0;
		this.health = ob.health;
		this.graphic = ob.sprite;
		this.structure = ob.structure;
	}
}

class Unit extends Object{
	constructor(ob, posX, posY){
		super(ob, posX, posY);
		this.direction = 1;
		this.to = new vector2(posX, posY);
		this.speed = ob.speed;
	}
	getUnit(dir){
		switch(dir){
			case -3:
			return this.graphic.up;//dol
			case 5:
			return this.graphic.up;//prawo-gora
			case 2:
			return this.graphic.right;//prawo
			case -1:
			return this.graphic.right;//prawo-dol
			case 3:
			return this.graphic.down;//gora
			case -5:
			return this.graphic.down;//lewo-dol
			case -2:
			return this.graphic.left;//lewo
			case 1:
			return this.graphic.left;//lewo-gora
			case 0:
			return this.graphic.up;//domyslny
		}
	}
	setDirection(dir){
		this.direction = dir;
	}
	getDirection(){
		return this.direction;
	}
}

class GDI{
	constructor(){
		this.objects = {
			base:				{id:0,	sprite:d.getElementById("gdiBase"),				buildTime:5, health:100,	cost:3000,	structure:true,	powerConsumption:0},
			barracs:			{id:1,	sprite:d.getElementById("gdiBarracs"),			buildTime:5, health:50,		cost:800,	structure:true,	powerConsumption:20},
			factory:			{id:2,	sprite:d.getElementById("gdiFactory"),			buildTime:5, health:80,		cost:2000,	structure:true,	powerConsumption:30},
			powerPlant:			{id:3,	sprite:d.getElementById("gdiPowerPlant"),		buildTime:5, health:50,		cost:300,	structure:true,	powerConsumption:-60},
			radar:				{id:4,	sprite:d.getElementById("gdiRadar"),			buildTime:5, health:65,		cost:1000,	structure:true,	powerConsumption:40},
			repairPad:			{id:5,	sprite:d.getElementById("gdiRepairPad"),		buildTime:5, health:65,		cost:1200,	structure:true,	powerConsumption:30},
			techCenter:			{id:6,	sprite:d.getElementById("gdiTechCenter"),		buildTime:5, health:65,		cost:1500,	structure:true,	powerConsumption:200},
			tiberiumRefinery:	{id:7,	sprite:d.getElementById("gdiTiberiumRefinery"),	buildTime:5, health:65,		cost:2000,	structure:true,	powerConsumption:30},
			upgradeCenter:		{id:8,	sprite:d.getElementById("gdiUpgradeCenter"),	buildTime:5, health:65,		cost:1000,	structure:true,	powerConsumption:150},
			ionCanon:			{id:9,	sprite:d.getElementById("gdiIonCanon"), 		buildTime:5, health:100,	cost:2000,	structure:true,	powerConsumption:200},
			lightInfantry:		{id:10,	buildTime:5, 		health:10,		cost:120,	structure:false,	speed:5,	sprite:{up:d.getElementById("gdiLightInfantryUp"),right:d.getElementById("gdiLightInfantryRight"),left:d.getElementById("gdiLightInfantryLeft"),down:d.getElementById("gdiLightInfantryDown")}},
			logo:	{sprite:d.getElementById("gdiLogo")},
		};
	}
	getObjectByName(objectName){
		switch(objectName){
			case "gdiBase":
			return this.objects.base;
			
			case "gdiBarracs":
			return this.objects.barracs;
			
			case "gdiFactory":
			return this.objects.factory;
			
			case "gdiPowerPlant":
			return this.objects.powerPlant;
			
			case "gdiRadar":
			return this.objects.radar;
			
			case "gdiRepairPad":
			return this.objects.repairPad;
			
			case "gdiTechCenter":
			return this.objects.techCenter;
			
			case "gdiUpgradeCenter":
			return this.objects.upgradeCenter;
			
			case "gdiIonCanon":
			return this.objects.ionCanon;
			
			case "gdiLightInfantry":
			return this.objects.lightInfantry;
			
			case "gdiLogo":
			return this.objects.logo;
		}
	}
	getObjectById(objectId){
		switch(objectId){
			case 0:
			return this.objects.base;
			
			case 1:
			return this.objects.barracs;
			
			case 2:
			return this.objects.factory;
			
			case 3:
			return this.objects.powerPlant;
			
			case 4:
			return this.objects.radar;
			
			case 5:
			return this.objects.repairPad;
			
			case 6:
			return this.objects.techCenter;
			
			case 7:
			return this.objects.tiberiumRefinery;
			
			case 8:
			return this.objects.upgradeCenter;
			
			case 9:
			return this.objects.ionCanon;
			
			case 10:
			return this.objects.lightInfantry;
		}
	}
}