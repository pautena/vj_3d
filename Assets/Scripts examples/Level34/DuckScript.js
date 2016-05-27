#pragma strict

function Update () {
	if (transform.position.y < -6.0f){
		Die();
	}
}

function OnMouseOver() {
	if (Input.GetMouseButtonDown(0)){
		Destroy(gameObject);
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