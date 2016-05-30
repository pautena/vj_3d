#pragma strict

public var ballSprite : GameObject;

function OnTriggerEnter (col : Collider){
	if (col.gameObject.tag == "Player"){
		GameObject.Find("LevelController").SendMessage("collectedBall");
		Destroy(gameObject);
		Destroy(ballSprite);
	}
}