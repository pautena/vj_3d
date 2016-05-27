#pragma strict

public var jumpSpeed : float = 10.0f;

private var rb : Rigidbody2D;
private var currentJumpSpeed : float = 0.0f;

function Start(){
	rb = GetComponent.<Rigidbody2D>();
}

/*function FixedUpdate () {
	currentJumpSpeed -= 5.0f;
	if (currentJumpSpeed > 0.0f){
		rb.AddForce(Vector2.up * currentJumpSpeed);
	}
}*/

function Update(){
	if (Input.GetButtonDown("Jump")){
		//rb.AddForce(Vector2.up * jumpSpeed);
		var v : Vector2 = rb.velocity;
		if (v.y > 0) v.y += jumpSpeed;
		else v.y = jumpSpeed;
		rb.velocity = v;
	}
}

function OnCollisionEnter2D(col : Collision2D){
	if (col.gameObject.GetComponent.<Rigidbody2D>().isKinematic){
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