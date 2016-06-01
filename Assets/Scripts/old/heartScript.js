#pragma strict

public var speedRotation : int;
public var heartSprite : GameObject;

function OnTriggerEnter (col : Collider){
	if (col.gameObject.tag == "Player"){
		GameObject.Find("LevelController").SendMessage("collectedLive");
		Destroy(gameObject);
		Destroy(heartSprite);
	}
}

function Update () {
	transform.Rotate(0, Time.deltaTime*speedRotation, 0 );
}