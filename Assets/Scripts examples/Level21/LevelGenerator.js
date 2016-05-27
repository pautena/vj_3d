#pragma strict

public var xMinDifference : float = 10.0f;
public var xMaxDifference : float = 15.0f;
public var yMaxDifference : float = 10.0f;

public var player : GameObject;
public var cam : GameObject;
public var platformPrefab : GameObject;
public var platformPrefab2 : GameObject;
public var platformPrefab3 : GameObject;

private var longPlatformLast : boolean = false;

private var lastPlatform : GameObject;

function Start () {
	lastPlatform = GameObject.Find("Platform");
}

function Update () {
	if (lastPlatform.transform.position.x <
		cam.transform.position.x - 5.0f){
		SpawnPlatform();
	}
}

function SpawnPlatform(){

	var randomY : float = cam.transform.position.y;
	randomY += Random.Range(-yMaxDifference, yMaxDifference);

	var rand : int = Random.Range(1,4);
	if (rand == 1){
		var randomX : float = lastPlatform.transform.position.x;
		if (longPlatformLast){
			randomX += Random.Range(xMinDifference+5.0f, xMaxDifference+5.0f);
		}
		else randomX += Random.Range(xMinDifference, xMaxDifference);
		var newPosition : Vector2 = Vector2(randomX, randomY);
		longPlatformLast = false;
		lastPlatform = Instantiate(platformPrefab, newPosition, Quaternion());
	}
	else if (rand == 2){
		var randomX2 : float = lastPlatform.transform.position.x;
		if (longPlatformLast){
			randomX2 += Random.Range(xMinDifference+5.0f, xMaxDifference+5.0f);
		}
		else randomX2 += Random.Range(xMinDifference, xMaxDifference);
		var newPosition2 : Vector2 = Vector2(randomX2, randomY);
		longPlatformLast = true;
		lastPlatform = Instantiate(platformPrefab2, newPosition2, Quaternion());
	}
	else if (rand == 3) {
		var randomX3 : float = lastPlatform.transform.position.x;
		if (longPlatformLast){
			randomX3 += Random.Range(xMinDifference+5.0f, xMaxDifference+5.0f);
		}
		else randomX3 += Random.Range(xMinDifference, xMaxDifference);
		var newPosition3 : Vector2 = Vector2(randomX3, randomY);
		longPlatformLast = true;
		lastPlatform = Instantiate(platformPrefab3, newPosition3, Quaternion());
	}
}