#pragma strict

private var time : float = 0.0f;
private var time1 : float = 0.2f;

private var expanding : boolean = true;

function Update () {
	time += Time.deltaTime;
	if (time > time1){
		expanding = false;
		Destroy(gameObject);
	}

	if (expanding){
		transform.localScale.x += 1.0f * Time.deltaTime;
		transform.localScale.y += 1.0f * Time.deltaTime;
	}
}

function OnTriggerEnter2D (col : Collider2D){
	if (col.gameObject.tag == "Player"){
		Destroy(gameObject);
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