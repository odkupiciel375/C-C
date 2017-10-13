<html>
	<head>
		<title>CNC</title>
		<meta charset="UTF-8">
		<meta name="description" content="JavaScript based RTS game within a web browser">
		<meta name="keywords" content="HTML,,XML,JavaScript">
		<meta name="author" content="Rafał Bernat">
		<link rel="stylesheet" href="styles/styles.css">
	</head>
	<body>
		<div id="starter">
			<button onClick="start()">Start</button>
		</div>
		<div id="assets">
			<div id="gdi">
				<div class="structures">
					<img id="gdiBase" src="sprites\GDI\Structures\GDI.Base.png" />
					<img id="gdiBarracs" src="sprites\GDI\Structures\GDI.Barracs.png" />
					<img id="gdiFactory" src="sprites\GDI\Structures\GDI.Factory.png" />
					<img id="gdiPowerPlant" src="sprites\GDI\Structures\GDI.PowerPlant.png" />
					<img id="gdiRadar" src="sprites\GDI\Structures\GDI.Radar.png" />
					<img id="gdiRepairPad" src="sprites\GDI\Structures\GDI.RepairPad.png" />
					<img id="gdiTechCenter" src="sprites\GDI\Structures\GDI.TechCenter.png" />
					<img id="gdiTiberiumRefinery" src="sprites\GDI\Structures\GDI.TiberiumRefinery.png" />
					<img id="gdiUpgradeCenter" src="sprites\GDI\Structures\GDI.UpgradeCenter.png" />
					<img id="gdiIonCanon" src="sprites\GDI\Structures\GDI.IonCanon.png" />
				</div>
				<div class="units">
					<img id="gdiLightInfantry" src="sprites\GDI\Units\GDI.LightInfantry.png" />
					<img id="gdiLightInfantryUp" src="sprites\GDI\Units\GDI.LightInfantry.Up.png" />
					<img id="gdiLightInfantryLeft" src="sprites\GDI\Units\GDI.LightInfantry.Left.png" />
					<img id="gdiLightInfantryDown" src="sprites\GDI\Units\GDI.LightInfantry.Down.png" />
					<img id="gdiLightInfantryRight" src="sprites\GDI\Units\GDI.LightInfantry.Right.png" />
				</div>
				<div class="specjal">
					<img id="gdiLogo" src="sprites\GDI\Specjal\GDI.Logo.png" />
				</div>
			</div>
			<div id="nod">
				<div class="structures">
					
				</div>
				<div class="units">
					
				</div>
				<div class="specjal">
					
				</div>
			</div>
			<div id="environment">
				<div class="structures">
					
				</div>
				<div class="units">
					
				</div>
				<div class="specjal">
					<img id="baseGround" src="sprites\Environment\specjal\ground.base.png" />
					<img id="baseGrass" src="sprites\Environment\specjal\grass.base.png" />
					<!--<img id="baseGround" src="sprites\cursors\SCCSell.ani" />-->
				</div>
			</div>
			<div id="map">
				<?php
					require_once("loadmap.php");
				?>
			</div>
		</div>
		<canvas width="100" height="100" id="canvas">
		</canvas>
		<script src="scripts/eventListiners.js"></script>	<!--listinery-->
		<script src="scripts/dep.js"></script>				<!--niezbedne "biblioteki"-->
		<script src="scripts/player.js"></script>			<!--klasa gracza-->
		<script src="scripts/environment.js"></script>		<!--klasa srodowiska-->
		<script src="scripts/map.js"></script>				<!--klasa mapy-->
		<script src="scripts/object.js"></script>			<!--klasa obiektow-->
		<script src="scripts/mouse.js"></script>			<!--klasa myszki-->
		<script src="scripts/screen.js"></script>			<!--klasa ekranu-->
		<script src="scripts/main.js"></script>				<!--główna logika gry-->
	</body>
</html>