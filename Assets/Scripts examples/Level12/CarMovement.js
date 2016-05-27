#pragma strict

public var movement : float = 2.0f;

function Start () {

}

function Update () {
	if (Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.W)){
		if (this.transform.position.y == 2.0){
			this.transform.position.y = 2.0;
		}
		else this.transform.position.y += movement;
	}
	if (Input.GetKeyDown(KeyCode.DownArrow) || Input.GetKeyDown(KeyCode.S)){
		if (this.transform.position.y == -2.0){
			this.transform.position.y = -2.0;
		}
		else this.transform.position.y -= movement;
	}
}