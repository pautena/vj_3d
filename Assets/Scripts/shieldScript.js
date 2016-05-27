#pragma strict

public var speedRotation : int;
public var shieldSprite : GameObject;

function OnTriggerEnter (col : Collider){
	if (col.gameObject.tag == "Player"){
		GameObject.Find("LevelController").SendMessage("collectedShield");
		Destroy(gameObject);
		Destroy(shieldSprite);
	}
}

function Update () {
	transform.Rotate(0, Time.deltaTime*speedRotation, 0 );
}