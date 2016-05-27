#pragma strict

function OnTriggerEnter (col : Collider){
	if (col.gameObject.tag == "Player"){
		GameObject.Find("LevelController").SendMessage("collectedBall");
		Destroy(gameObject);
	}
}