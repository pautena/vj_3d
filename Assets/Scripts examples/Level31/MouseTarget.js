#pragma strict

var rend : Renderer;

private var enemy : boolean = true;

function Start () {
	rend = GetComponent.<Renderer>();
	rend.material.color = Color.white;
	var r : int = Random.Range(0,4);
	if (r == 0){
		enemy = false;
		GameObject.Find("EnemySpawner").SendMessage("killEnemy");
	}
}

function Update () {
}

function OnMouseEnter(){
	if (enemy) rend.material.color = Color.red;
	else rend.material.color = Color.blue;
}

function OnMouseOver() {
	if (Input.GetMouseButtonDown(0)){
		Destroy(gameObject);
		if (!enemy){
			Die();
		}
		else {
			GameObject.Find("EnemySpawner").SendMessage("killEnemy");
		}
	}
}

function OnMouseExit(){
	rend.material.color = Color.white;
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