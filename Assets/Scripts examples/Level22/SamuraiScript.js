#pragma strict

import UnityEngine.UI;

public var bomb : GameObject;

private var period : float = 1.0f;
private var time : float = 0.0f;

private var reacting : boolean = false;
private var difficulty : int = 1;
private var reactTime : float = 0.0f;

function Start(){
	period = Random.Range(1.0f,10.0f);
}

function Update(){
 	time += Time.deltaTime;
 	if (time > period && !reacting){
 		time = 0;
 		reacting = true;
 		var offsetX : float = Random.Range(-8.0, 8.0);
		var offsetY : float = Random.Range(-4.0, 4.0);
		var position : Vector2 = transform.position +
			Vector2(offsetX, offsetY);
 		Instantiate(bomb, position, transform.rotation);
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