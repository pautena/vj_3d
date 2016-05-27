#pragma strict

public var explosion : GameObject;

function OnTriggerEnter2D (col : Collider2D){
	if (col.gameObject.tag == "Player"){
		Instantiate(explosion, transform.position, transform.rotation);
		Destroy(gameObject);
		Die();
	}
	if (col.gameObject.tag == "Floor"){
		Instantiate(explosion, transform.position, transform.rotation);
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