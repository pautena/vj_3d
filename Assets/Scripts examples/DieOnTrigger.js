#pragma strict

function OnTriggerEnter2D (col : Collider2D){
	if (col.gameObject.tag == "Player"){
		GetComponent.<AudioSource>().Play();
		GameObject.FindWithTag("Config").SendMessage("increasePoints");
		GetComponent.<CircleCollider2D>().enabled = false; //no colider
		GetComponent.<Renderer>().enabled = false; //invisible
		Destroy(gameObject, 2);
	}
}