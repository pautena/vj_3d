#pragma strict

function OnTriggerEnter (col : Collider){
	if (col.gameObject.tag == "Player"){
		GameObject.FindWithTag("Player").SendMessage("hitEnemy");
		SendMessage("deleteDetector");
		GameObject.Find("LevelGenerator").SendMessage("respawnEnemy");
	}
}