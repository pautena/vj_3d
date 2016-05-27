#pragma strict

public var player : GameObject;
public var movingPlatform : GameObject;

function Start () {
	var x1 : float = Random.Range(-3,-0.1);
	var x2 : float = Random.Range(0.1,3);
	var r : int = Random.Range(0,2);
	if (r == 1) {
		player.transform.position.x = x1;
	}
	else player.transform.position.x = x2;

	var gameStats : GameObject = GameObject.Find("GameStats");
	var script : GameStats = gameStats.GetComponent("GameStats");
	switch (script.difficulty){
		case 1:
			movingPlatform.GetComponent.<Rigidbody2D>().mass = 20;
			break;
		case 2:
			movingPlatform.GetComponent.<Rigidbody2D>().mass = 10;
			break;
		case 3:
			movingPlatform.GetComponent.<Rigidbody2D>().mass = 5;
			break;
		default:
			break;
	}
}

function Update () {

}