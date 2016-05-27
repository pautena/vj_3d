#pragma strict

public var enemy1 : GameObject;
public var enemy2 : GameObject;
public var enemy3 : GameObject;
public var enemy4 : GameObject;
public var enemy5 : GameObject;

function Start () {
	var gameStats : GameObject = GameObject.Find("GameStats");
	var script : GameStats = gameStats.GetComponent("GameStats");
	switch (script.difficulty){
		case 1:
			Destroy(enemy3);
			Destroy(enemy4);
			Destroy(enemy5);
			break;
		case 2:
			Destroy(enemy4);
			Destroy(enemy5);
			break;
		case 3:
			break;
		default:
			break;
	}
}