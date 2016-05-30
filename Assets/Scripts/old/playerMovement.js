#pragma strict

static var north : boolean[,];     // is there a wall to north of cell i, j
static var east : boolean[,];
static var south : boolean[,];
static var west : boolean[,];
static var N : int;
static var doorsOpen : boolean;

public var normalSpeed : float;
public var fastSpeed : float;

//0: Left, 1: Right, 2: Up, 3: Down
private var direction : int;
private var makeMovement : boolean;
private var startPosition : Vector3;
private var endPosition : Vector3;
private var dontMove : boolean;
//Time when the movement started
private var startTime : float;
//Total distance between the positions
private var journeyLenght : float;
private var auxEnd : Vector3;
private var auxStart : Vector3;
private var changedDirection : boolean;

private var speed : float;

public var runTime : int;
private var runCounter : float;


function Start () {
	dontMove = false;
	changedDirection = false;
	direction = -1;
	makeMovement = true;
	doorsOpen = false;

	speed = normalSpeed;

	runCounter = runTime;
}

function Update () {

	var percent : float = 450*(runCounter)/runTime;
	GameObject.Find("ProgressRun").SendMessage("SetFillerSize",percent);

	//Right button
	if (Input.GetMouseButton(1)){
		startPosition = transform.position;
		startTime = Time.time;
		journeyLenght = Vector3.Distance(startPosition, endPosition);
		if (runCounter < runTime) runCounter += Time.deltaTime;
		return;
	}

	//Left button
	if (Input.GetMouseButton(0)){
		if (runCounter > 0) {
			runCounter -= Time.deltaTime * 4;
			if (speed != fastSpeed) {
				speed = fastSpeed;
				startPosition = transform.position;
				startTime = Time.time;
				journeyLenght = Vector3.Distance(startPosition, endPosition);
			}
		}
		else {
			if (speed != normalSpeed) {
				speed = normalSpeed;
				startPosition = transform.position;
				startTime = Time.time;
				journeyLenght = Vector3.Distance(startPosition, endPosition);
			}
		}
	}
	else {
		if (speed != normalSpeed) {
			speed = normalSpeed;
			startPosition = transform.position;
			startTime = Time.time;
			journeyLenght = Vector3.Distance(startPosition, endPosition);
		}

		if (runCounter < runTime) runCounter += Time.deltaTime;
	}

	switch(getOnlyDirection()){
		case 0:
			if (direction == 1) {
				direction = 0;
				if (!changedDirection) endPosition = auxStart;
				else endPosition = auxEnd;
				changedDirection = !changedDirection;
				startPosition = transform.position;
				startTime = Time.time;
				journeyLenght = Vector3.Distance(startPosition, endPosition);
			}
			break;
		case 1:
			if (direction == 0){
				direction = 1;
				if (!changedDirection) endPosition = auxStart;
				else endPosition = auxEnd;
				changedDirection = !changedDirection;
				startPosition = transform.position;
				startTime = Time.time;
				journeyLenght = Vector3.Distance(startPosition, endPosition);
			}
			break;
		case 2:
			if (direction == 3){
				direction = 2;
				if (!changedDirection) endPosition = auxStart;
				else endPosition = auxEnd;
				changedDirection = !changedDirection;
				startPosition = transform.position;
				startTime = Time.time;
				journeyLenght = Vector3.Distance(startPosition, endPosition);
			}
			break;
		case 3:
			if (direction == 2){
				direction = 3;
				if (!changedDirection) endPosition = auxStart;
				else endPosition = auxEnd;
				changedDirection = !changedDirection;
				startPosition = transform.position;
				startTime = Time.time;
				journeyLenght = Vector3.Distance(startPosition, endPosition);
			}
			break;
		default: break;
	}
	if (makeMovement) {
		makeMovement = false;
		changedDirection = false;
		direction = getDirection();
		startTime = Time.time;
		startPosition = transform.position;
		dontMove = false;
		var x : int = transform.position.x;
		var z : int = transform.position.z;
		x = x/10;
		z = z/10;
		switch (direction)	{
			case 0:
				endPosition = Vector3(10*(x-1),1,10*z);
				break;
			case 1:
				endPosition = Vector3(10*(x+1),1,10*z);
				break;
			case 2:
				endPosition = Vector3(10*x,1,10*(z+1));
				break;
			case 3:
				endPosition = Vector3(10*x,1,10*(z-1));
				break;
			default: 
				dontMove = true;
			break;
		}
		auxStart = startPosition;
		auxEnd = endPosition;
		journeyLenght = Vector3.Distance(startPosition, endPosition);
	}

	//Distance moved
	var distCovered : float = (Time.time - startTime) * (speed);
	//Fraction of journey covered
	var fracJourney = distCovered / journeyLenght;
	if (!dontMove) transform.position = Vector3.Lerp(startPosition, endPosition, fracJourney);
	else {
		if (direction != getOnlyDirection()) makeMovement = true;
	}

	if (transform.position == endPosition) makeMovement = true;

}

function getDirection(){
	var direction : int;

	var angle : float = Quaternion.Angle(Quaternion.Euler(new Vector3(0,0,0)),transform.rotation);

	 
	if (0.0 <= angle && angle < 45.0) {
		direction = 2;
	}
	else if (45.0 <= angle && angle < 135.0) {
		if (transform.eulerAngles.y < 180) direction = 1;
		else direction = 0;
	}
	else if (135.0 <= angle && angle < 225.0) {
		direction = 3;
	}

	if (checkIfValid(direction))
		return direction;
	else return -1;
}

function getOnlyDirection(){
	var direction : int;
	var angle : float = Quaternion.Angle(Quaternion.Euler(new Vector3(0,0,0)),transform.rotation);
	if (0.0 <= angle && angle < 45.0) {
		direction = 2;
	}
	else if (45.0 <= angle && angle < 135.0) {
		if (transform.eulerAngles.y < 180) direction = 1;
		else direction = 0;
	}
	else if (135.0 <= angle && angle < 225.0) {
		direction = 3;
	}
	return direction;
}

function checkIfValid(direction : int){
	var x : int = transform.position.x;
	var z : int = transform.position.z;
	x = x/10;
	z = z/10;

	switch (direction) {
		case 0:
			if (!west[x,z]) {
				//Check if there isn't a room on the other side
				if (doorsOpen) return true;

				if (!(north[x-1,z] && south[x-1,z] && west[x-1,z]))
					return true;
				else return false;
			}
			break;
		case 1:
			if (!east[x,z]) {
				if (doorsOpen) return true;
				if (!(north[x+1,z] && south[x+1,z] && east[x+1,z]))
					return true;
				else return false;
			}
			break;
		case 2:
			if (!north[x,z]) {
				//Check if there isn't a room on the other side
				if (doorsOpen) return true;

				if (!(north[x,z+1] && east[x,z+1] && west[x,z+1]))
					return true;
				else return false;
			}
			break;
		case 3:
			if (!south[x,z]) {
				//Check if there isn't a room on the other side
				if (doorsOpen) return true;

				if (!(south[x,z-1] && east[x,z-1] && west[x,z-1]))
					return true;
				else return false;
			}
			break;
	}
}