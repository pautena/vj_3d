#pragma strict

private var mouseOver : boolean = true;

public var scalingX : boolean = false;
public var scalingXPositive : boolean = false;
public var scalingY : boolean = false;
public var scalingYPositive : boolean = false;
public var movingX : boolean = false;
public var movingXPositive : boolean = false;
public var movingY : boolean = false;
public var movingYPositive : boolean = false;

private var period : float = 1.0f;
private var time : float = 0.0f;

public var movementSpeed : float = 5.0f;
public var scalingSpeed : float = 5.0f;

function Update () {
	if (!mouseOver) Die();

	time += Time.deltaTime;
	if (time > period){
		time = 0.0f;
		scalingX = false;
		scalingY = false;
		scalingXPositive = false;
		scalingYPositive = false;
		movingX = false;
		movingY = false;
		movingXPositive = false;
		movingYPositive = false;

		var r : int = Random.Range(0,2);
		var r2 : int = Random.Range(0,2);
		if (r == 0) {
			scalingX = true;
			if (r2 == 0) scalingXPositive = true;
		}
		r = Random.Range(0,2);
		r2 = Random.Range(0,2);
		if (r == 0) {
			scalingY = true;
			if (r2 == 0) scalingYPositive = true;
		}
		r = Random.Range(0,2);
		r2 = Random.Range(0,2);
		if (r == 0) {
			movingX = true;
			if (r2 == 0) movingXPositive = true;
		}
		r = Random.Range(0,2);
		r2 = Random.Range(0,2);
		if (r == 0) {
			movingY = true;
			if (r2 == 0) movingYPositive = true;
		}
	}

	var movement : float = movementSpeed * Time.deltaTime;
	var scale : float = scalingSpeed * Time.deltaTime;

	if (movingX) {
		if (movingXPositive) {
			if (transform.position.x + movement < 8.0)
				transform.position.x += movement;
			else {
				transform.position.x -= movement;
				movingXPositive = false;
			}
		}
		else {
			if (transform.position.x - movement > -8.0)
				transform.position.x -= movement;
			else {
				transform.position.x += movement;
				movingXPositive = true;
			}
		}
	}

	if (movingY) {
		if (movingYPositive) {
			if (transform.position.y + movement < 3.0)
				transform.position.y += movement;
			else {
				transform.position.y -= movement;
				movingYPositive = false;
			}
		}
		else {
			if (transform.position.y - movement > -3.0)
				transform.position.y -= movement;
			else {
				transform.position.y += movement;
				movingYPositive = true;
			}
		}
	}

	if (scalingX) {
		if (scalingXPositive) {
			if (transform.localScale.x + scale < 18.5)
				transform.localScale.x += scale;
			else {
				transform.localScale.x -= scale;
				scalingXPositive = false;
			}
		}
		else {
			if (transform.localScale.x - scale > 2.0)
				transform.localScale.x -= scale;
			else {
				transform.localScale.x += scale;
				scalingXPositive = true;
			}
		}
	}

	if (scalingY) {
		if (scalingYPositive) {
			if (transform.localScale.y + scale < 10.5)
				transform.localScale.y += scale;
			else {
				transform.localScale.y -= scale;
				scalingYPositive = false;
			}
		}
		else {
			if (transform.localScale.y - scale > 2.0)
				transform.localScale.y -= scale;
			else {
				transform.localScale.y += scale;
				scalingYPositive = true;
			}
		}
	}
}

function OnMouseExit() {
	mouseOver = false;
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