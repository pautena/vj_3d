#pragma strict

function OnTriggerEnter2D(col : Collider2D){
	if (col.gameObject.tag == "Player"){
		GameObject.Find("TimerLevelCountdown").SendMessage("finish");
	}
}