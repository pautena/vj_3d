#pragma strict

private var killable : boolean = false;

function Update(){
	killable = true;
}

function OnCollisionEnter2D (col : Collision2D){
	if (!killable && col.gameObject.tag == "Player") Destroy(gameObject);
	else if (col.gameObject.tag == "Player"){
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