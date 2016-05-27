#pragma strict

public var speed : float = 10.0f;

//0 = N, 1 = S, 2 = E, 3 = W
private var direction : int = -1;

function Update () {
	if (Input.GetKeyDown(KeyCode.LeftArrow) || Input.GetKeyDown(KeyCode.A)){
			direction = 0;
	}
	if (Input.GetKeyDown(KeyCode.RightArrow) || Input.GetKeyDown(KeyCode.D)){
			direction = 2;
	}
	if (Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.W)){
			direction = 1;
	}
	if (Input.GetKeyDown(KeyCode.DownArrow) || Input.GetKeyDown(KeyCode.S)){
			direction = 3;
	}

	switch (direction)	{
		case 0:
			GetComponent.<Rigidbody>().velocity.x = -speed;
			GetComponent.<Rigidbody>().velocity.z = 0.0f;
			break;
		case 1:
			GetComponent.<Rigidbody>().velocity.z = speed;
			GetComponent.<Rigidbody>().velocity.x = 0.0f;
			break;
		case 2:
			GetComponent.<Rigidbody>().velocity.x = speed;
			GetComponent.<Rigidbody>().velocity.z = 0.0f;
			break;
		case 3:
			GetComponent.<Rigidbody>().velocity.z = -speed;
			GetComponent.<Rigidbody>().velocity.x = 0.0f;
			break;
		default: break;
	}
}