#pragma strict

var otherTag : String = "Player";

function OnTriggerEnter2D (col : Collider2D){
	if (col.gameObject.tag == otherTag){
		col.gameObject.SendMessage("Die");
	}
}