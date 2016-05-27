#pragma strict

public var enemy : Rigidbody2D;

private var numberEnemies : int = 0;

function Start () {
	var gameStats : GameObject = GameObject.Find("GameStats");
	var script : GameStats = gameStats.GetComponent("GameStats");
	switch (script.difficulty){
		case 1:
			numberEnemies = 5;
			break;
		case 2:
			numberEnemies = 10;
			break;
		case 3:
			numberEnemies = 15;
			break;
		default:
			break;
	}
	
	var i : int;
	for (i = 0; i < numberEnemies; i++){
		var offsetX : float = Random.Range(-6.0, 6.0);
		var offsetY : float = Random.Range(-1.0, 4.0);
		var position : Vector2 = transform.position +
			Vector2(offsetX, offsetY);
		var instantiatedEnemy : Rigidbody2D = 
			Rigidbody2D.Instantiate(enemy, position, Quaternion());
	}
}

function killEnemy(){
	--numberEnemies;
	if (numberEnemies == 0){
		GameObject.Find("TimerLevelCountdown").SendMessage("finish");
	}
}