#pragma strict

public var cam : GameObject;
public var speed : float = 0.0f;
public var maxSpeed : float = 0.0f;

private var rb : Rigidbody2D;

function Start(){
	rb = GetComponent.<Rigidbody2D>();
}

function FixedUpdate() {
	if (rb.velocity.x > maxSpeed)
		rb.velocity.x = maxSpeed;
	else 
		rb.AddForce(Vector2.right * speed);
}

function Update () {
	if (transform.position.y < cam.transform.position.y - 20.0f){
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