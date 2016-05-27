#pragma strict

function Start () {
	var speed : float = 0.0f;
	var gameStats : GameObject = GameObject.Find("GameStats");
	var script : GameStats = gameStats.GetComponent("GameStats");
	switch (script.difficulty){
		case 1:
			speed = 10;
			break;
		case 2:
			speed = 13;
			break;
		case 3:
			speed = 15;
			break;
		default:
			break;
	}

	this.GetComponent.<Rigidbody2D>().velocity = Vector2(-speed, 0.0f);
}

function Update () {
	if (transform.position.x < -9.0)
		Destroy(gameObject);
}

function OnTriggerEnter2D (col : Collider2D){
	if (col.gameObject.tag == "Player"){
		Die();
	}
}

function Die(){
	var gameStats : GameObject = GameObject.Find("GameStats");
	var script : GameStats = gameStats.GetComponent("GameStats");
	script.died = true;
	script.playing = true;

	var gameMode : GameObject = GameObject.Find("GameMode");
	var gameModeScript : GameMode = gameMode.GetComponent("GameMode"); 
	if (gameModeScript.allLevelsMode){
		Application.LoadLevel(1);
	}
	else {
		Application.LoadLevel(2);
	}
}