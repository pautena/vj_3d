#pragma strict

public var speedRotation : int;
public var keySprite : GameObject;

function OnTriggerEnter (col : Collider){
	if (col.gameObject.tag == "Player"){
		GameObject.Find("LevelController").SendMessage("collectedKey");
		Destroy(gameObject);
		Destroy(keySprite);
	}
}

function Update () {
	transform.Rotate(0, 0, Time.deltaTime*speedRotation );
}