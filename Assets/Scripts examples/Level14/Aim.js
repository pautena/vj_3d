#pragma strict

public var player : GameObject;

function Start(){
	GetComponent.<Shoot>().enabled = true;
}

function Update() {
	var hit : RaycastHit2D;
	var direction : Vector2 =
		player.transform.position - transform.position;

	hit = Physics2D.Raycast(transform.position, direction);
	if (hit.collider != null){
		if (hit.collider.gameObject == player){
			transform.LookAt(player.transform);
			transform.Rotate(0,-90,0);
			GetComponent.<Shoot>().enabled = true;
		}
		else {
			//GetComponent.<Renderer>().material.color = myColor;
			GetComponent.<Shoot>().enabled = false;
		}
	}
}