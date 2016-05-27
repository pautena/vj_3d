#pragma strict

public var movement : float = 2.0f;

function Start () {
}

function Update () {
	if (Input.GetButtonDown("Jump")){
		this.transform.position.x += movement;
	}
}