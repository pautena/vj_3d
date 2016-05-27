#pragma strict

public var player : GameObject;
private var generalVision : boolean;

function Start () {
	generalVision = false;
}

function Update () {
	if (!generalVision){
		GetComponent.<Camera>().orthographicSize = 30;
		var playerPos : Vector3 = player.transform.position;
		var camPos : Vector3 = transform.position;
		transform.position = Vector3(playerPos.x, 
									playerPos.y+30,
									playerPos.z);
	}
}

function toggleGeneralVision(N : int) {
	generalVision = !generalVision;
	transform.position = Vector3(10*(N+1)/2,30,10*(N+1)/2);
	GetComponent.<Camera>().orthographicSize = 10*(N+1)/2;
}