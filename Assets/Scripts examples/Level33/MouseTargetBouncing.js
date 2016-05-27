#pragma strict

function Start () {
	this.GetComponent.<Rigidbody2D>().gravityScale = Random.Range(1,3);
}

function Update () {

}

function OnMouseOver() {
	if (Input.GetMouseButtonDown(0)){
		Destroy(gameObject);
		GameObject.Find("BouncingEnemySpawner").SendMessage("killEnemy");
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