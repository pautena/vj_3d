#pragma strict

function OnTriggerEnter (col : Collider){
	if (col.gameObject.tag == "Player"){
		GameObject.Find("Player_Old").SendMessage("hitTrap");
	}
}