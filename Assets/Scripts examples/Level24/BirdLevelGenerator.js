#pragma strict

public var xMinDifference : float = 10.0f;
public var xMaxDifference : float = 15.0f;
public var yMaxDifference : float = 8.0f;

public var player : GameObject;
public var cam : GameObject;
public var platformPrefab : GameObject;

private var lastPlatform : GameObject;
//public var ringPrefab : GameObject;

function Start () {
	lastPlatform = GameObject.Find("Tubes");
}

function Update () {
	if (lastPlatform.transform.position.x <
		cam.transform.position.x - 5.0f){
		SpawnPlatform();
	}
}

function SpawnPlatform(){
	var randomX : float = lastPlatform.transform.position.x;
	randomX += Random.Range(xMinDifference, xMaxDifference);

	var randomY : float = cam.transform.position.y;
	randomY += Random.Range(-yMaxDifference, yMaxDifference);

	var newPosition : Vector2 = Vector2(randomX, randomY);
	lastPlatform = Instantiate(platformPrefab, newPosition, Quaternion());

	if (Random.Range(1,3) == 1){
		newPosition.y += Random.Range(1.0f, 3.0f);
		newPosition.x += Random.Range(-1.0f, 1.0f);

		//Instantiate(ringPrefab, newPosition, Quaternion());
	}
}