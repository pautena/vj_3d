#pragma strict

private var speed : float = 15.0f;

function Start () {

}

function Update () {
	if (Input.GetKey(KeyCode.LeftArrow) || Input.GetKey(KeyCode.A)){
		GetComponent.<Rigidbody2D>().velocity.x = -speed;
	}
	else if (Input.GetKey(KeyCode.RightArrow) || Input.GetKey(KeyCode.D)){
		GetComponent.<Rigidbody2D>().velocity.x = speed;
	}
	else GetComponent.<Rigidbody2D>().velocity.x = 0.0f;
}