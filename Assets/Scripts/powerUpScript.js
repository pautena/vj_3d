#pragma strict

function OnTriggerEnter (col : Collider){
	if (col.gameObject.tag == "Player"){
		GameObject.Find("LevelController").SendMessage("collectedPowerUp");
		Destroy(gameObject);
	}
}