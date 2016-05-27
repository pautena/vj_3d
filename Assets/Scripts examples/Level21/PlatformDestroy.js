#pragma strict

private var cam : GameObject;

function Start () {
	cam = GameObject.Find("Main Camera");
}

function Update () {
	if (transform.position.x <
		cam.transform.position.x - 30.0f){
		Destroy(gameObject);
	}
}