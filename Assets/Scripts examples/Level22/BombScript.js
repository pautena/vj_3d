#pragma strict

public var bombParticles : ParticleSystem;

private var reactTime : float = 1.0f;
private var time : float = 0.0f;

private var disarmed : boolean = false;
private var exploding : boolean = false;
private var won : boolean = false;
private var lost : boolean = false;

function Start () {
	GetComponent.<Renderer>().material.color = Color.red;
	bombParticles.Stop();
	var gameStats : GameObject = GameObject.Find("GameStats");
	var script : GameStats = gameStats.GetComponent("GameStats");

	var timeScale = Time.timeScale;
	switch (script.difficulty){
		case 1:
			reactTime = 1.0f * timeScale;
			break;
		case 2:
			reactTime = 0.7f * timeScale;
			break;
		case 3:
			reactTime = 0.5f * timeScale;
			break;
		default:
			break;
	}
}

function Update () {
	if (won) Win();
	if (lost && time > 1.0f) Die();

	if (Input.GetButtonDown("Jump") && !exploding){
		disarmed = true;
		GetComponent.<Renderer>().material.color = Color.green;
		wait();
	}
	time += Time.deltaTime;
 	if (time > reactTime && !disarmed && !exploding){
 		time = 0.0f;
 		exploding  = true;
 		explode();
 	}
}

function wait(){
	yield WaitForSeconds(1);
	won = true;
}

function explode(){
	bombParticles.Play();
	lost = true;
}

function Win(){
	var gameStats : GameObject = GameObject.Find("GameStats");
	var script : GameStats = gameStats.GetComponent("GameStats");
	script.died = false;
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