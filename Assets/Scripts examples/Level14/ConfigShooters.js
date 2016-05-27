#pragma strict

public var shooter1 : GameObject;
public var shooter2 : GameObject;
public var shooter3 : GameObject;

function Start () {
	var gameStats : GameObject = GameObject.Find("GameStats");
	var script : GameStats = gameStats.GetComponent("GameStats");
	switch (script.difficulty){
		case 1:
			Destroy(shooter2);
			Destroy(shooter3);
			break;
		case 2:
			Destroy(shooter3);
			break;
		case 3:
			break;
		default:
			break;
	}
}

function Update () {

}