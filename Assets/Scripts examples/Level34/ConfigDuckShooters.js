#pragma strict

public var shooter1 : GameObject;
public var shooter2 : GameObject;
public var shooter3 : GameObject;

private var difficulty : int;

function Start () {
	var gameStats : GameObject = GameObject.Find("GameStats");
	var script : GameStats = gameStats.GetComponent("GameStats");
	difficulty = script.difficulty;
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
	switch (difficulty){
		case 1:
			var script11 : Shoot = shooter1.GetComponent("Shoot");
			script11.bulletSpeed = Random.Range(10,15);
			break;
		case 2:
			var script12 : Shoot = shooter1.GetComponent("Shoot");
			var script22 : Shoot = shooter2.GetComponent("Shoot");
			script12.bulletSpeed = Random.Range(10,15);
			script22.bulletSpeed = Random.Range(10,15);
			break;
		case 3:
			var script13 : Shoot = shooter1.GetComponent("Shoot");
			var script23 : Shoot = shooter2.GetComponent("Shoot");
			var script33 : Shoot = shooter3.GetComponent("Shoot");
			script13.bulletSpeed = Random.Range(10,15);
			script23.bulletSpeed = Random.Range(10,15);
			script33.bulletSpeed = Random.Range(10,15);
			break;
		default:
			break;
	}
}