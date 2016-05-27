#pragma strict

public var speed : float = 20.0f;
public var jump : float = 15.0f;
public var maxVelAir : float = 10.0f;
public var accAir : float = 35.0f;
public var cam : GameObject;

private var colliding : boolean = false;
private var collidingDirection : Vector3;

function Start () {
	//GetComponent.<Rigidbody2D>().angularVelocity = speed;
	//Time.timeScale = 2.0;
}

function Update () {
	if (colliding){
		if (Input.GetKey(KeyCode.LeftArrow) || Input.GetKey(KeyCode.A)){
			GetComponent.<Rigidbody2D>().angularVelocity = -speed;
		}
		else if (Input.GetKey(KeyCode.RightArrow) || Input.GetKey(KeyCode.D)){
			GetComponent.<Rigidbody2D>().angularVelocity = speed;
		}
		else {
			GetComponent.<Rigidbody2D>().angularVelocity = 0;
		}
	}
	else {
		GetComponent.<Rigidbody2D>().angularVelocity = 0;
		if ((Input.GetKey(KeyCode.LeftArrow) || Input.GetKey(KeyCode.A)) && 
			GetComponent.<Rigidbody2D>().velocity.x < maxVelAir){
			GetComponent.<Rigidbody2D>().velocity.x -= accAir*Time.deltaTime;
		}
		else if ((Input.GetKey(KeyCode.RightArrow) || Input.GetKey(KeyCode.D)) &&
			GetComponent.<Rigidbody2D>().velocity.x > -maxVelAir){
			GetComponent.<Rigidbody2D>().velocity.x += accAir*Time.deltaTime;
		}
	}

	if (transform.position.y < cam.transform.position.y - 10.0f){
		Die();
	}
	//if (colliding)
		//Debug.DrawRay(transform.position,collidingDirection, Color.white);
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