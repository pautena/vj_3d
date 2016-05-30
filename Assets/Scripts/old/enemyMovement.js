#pragma strict
import System.Collections.Generic;

public var speed : float;
private var enemyDetector : Image;
private var interfacePlayer : Canvas;

static var north : boolean[,];     // is there a wall to north of cell i, j
static var east : boolean[,];
static var south : boolean[,];
static var west : boolean[,];
static var N : int;

//0: Left, 1: Right, 2: Up, 3: Down
private var direction : int;
private var makeDirection : boolean;
private var startPosition : Vector3;
private var endPosition : Vector3;
//Time when the movement started
private var startTime : float;
//Total distance between the positions
private var journeyLenght : float;

private var target : Transform;
private var imageRectTransform : RectTransform;
private var ownEnemyDetector : Image;
public var nearDistance : int;
public var runDistance : int;
public var attackDistance : int;

//States
private var running : boolean;
private var walking : boolean;
private var attacking : boolean;
private var anim : Animator;

private var delete : boolean;

function Start () {
	var player : GameObject = GameObject.FindGameObjectWithTag("Player");
	target = player.transform;

	enemyDetector =  GameObject.Find("EnemyNearImage").GetComponent.<Image>();
	interfacePlayer =  GameObject.Find("InterfacePlayer").GetComponent.<Canvas>();

	ownEnemyDetector = GameObject.Instantiate(enemyDetector, Vector3(0,0,0), Quaternion.Euler(Vector3(0, 0, 0) ));
	ownEnemyDetector.transform.SetParent(interfacePlayer.transform);
	ownEnemyDetector.transform.localPosition = Vector3(0,0,0);
	ownEnemyDetector.transform.localScale = Vector3(1,1,1);
	ownEnemyDetector.transform.localRotation = Quaternion.Euler(Vector3(0, 0, 0));

	imageRectTransform = ownEnemyDetector.GetComponent.<RectTransform>();

	direction = -1;
	makeDirection = true;

	anim = GetComponentInChildren.<Animator>();
	running = false;
	walking = true;
	attacking = false;
	this.SendMessage("Walk");
}

function Update () {

	//Set the rotation to follow the enemy
	setImageDetector();

	//Set animation depending on distance
	setAnimation();

	if (makeDirection) {
		makeDirection = false;
		startTime = Time.time;
		calculeNewDirection();
		startPosition = transform.position;
		var x : int = transform.position.x;
		var z : int = transform.position.z;
		x = x/10;
		z = z/10;
		switch (direction)	{
			case 0:
				endPosition = Vector3(10*(x-1),0,10*z);
				transform.eulerAngles.y = 90.0;
				break;
			case 1:
				endPosition = Vector3(10*(x+1),0,10*z);
				transform.eulerAngles.y = 270.0;
				break;
			case 2:
				endPosition = Vector3(10*x,0,10*(z+1));
				transform.eulerAngles.y = 180.0;
				break;
			case 3:
				endPosition = Vector3(10*x,0,10*(z-1));
				transform.eulerAngles.y = 0.0;
				break;
			default: break;
		}
		journeyLenght = Vector3.Distance(startPosition, endPosition);
	}

	//Distance moved
	var distCovered : float = (Time.time - startTime) * speed;
	//Fraction of journey covered
	var fracJourney = distCovered / journeyLenght;

	transform.position = Vector3.Lerp(startPosition, endPosition, fracJourney);
	if (transform.position == endPosition) makeDirection = true;
}

function setImageDetector(){
	var xRot = imageRectTransform.eulerAngles.x;
	var yRot = imageRectTransform.eulerAngles.y;
	imageRectTransform.LookAt(transform);
	imageRectTransform.eulerAngles.z = -imageRectTransform.localEulerAngles.y;
	imageRectTransform.eulerAngles.x = xRot;
	imageRectTransform.eulerAngles.y = yRot;

	if (Vector3.Distance(target.position, transform.position) < nearDistance){
		ownEnemyDetector.color = Color(1.0,0.0,0.0,1-Vector3.Distance(target.position, transform.position)/nearDistance);
	}
	else {
		ownEnemyDetector.color = Color(1.0,0.0,0.0,0.0);
	}
}

function setAnimation(){
	if (Vector3.Distance(target.position, transform.position) < attackDistance){
		if (!anim.GetBool("LowKick") && !anim.GetBool("HitStrike")){
			attacking = false;
		}
		if (!attacking) {
			running = false;
			walking = false;
			attacking = true;
			var r : int = Random.Range(0,2);
			if (r == 1) this.SendMessage("LowKick");
			else this.SendMessage("Strike");
		}
	}
	else if (Vector3.Distance(target.position, transform.position) < runDistance){
		if (!anim.GetBool("isRun")){
			running = false;
		}
		if (!running) {
			running = true;
			walking = false;
			attacking = false;
			this.SendMessage("Run");
		}
	}
	else {
		if (!anim.GetBool("isWalk")){
			walking = false;
		}
		if (!walking) {
			running = false;
			walking = true;
			attacking = false;
			this.SendMessage("Walk");
		}
	}
}

function calculeNewDirection() {
	var x : int = transform.position.x;
	var z : int = transform.position.z;
	x = x/10;
	z = z/10;

	var posibilities : List.<int>;
	posibilities = new List.<int>();
	if (!west[x,z]) {
		//Check if there isn't a room on the other side
		if (!(north[x-1,z] && south[x-1,z] && west[x-1,z]))
			posibilities.Add(0);
	}
	if (!east[x,z]) {
		if (!(north[x+1,z] && south[x+1,z] && east[x+1,z]))
			posibilities.Add(1);
	}
	if (!north[x,z]) {
		if (!(north[x,z+1] && east[x,z+1] && west[x,z+1]))
			posibilities.Add(2);
	}
	if (!south[x,z]) {
		if (!(south[x,z-1] && east[x,z-1] && west[x,z-1]))
			posibilities.Add(3);
	}

	//set the direction if only 1 posibility
	if (posibilities.Count == 1) {
		direction = posibilities[0];
		return;
	}

	//set the direction towards the player
	if (running) {
		var x2 : int = target.position.x;
		var z2 : int = target.position.z;
		x2 = x2/10;
		z2 = z2/10;

		//Debug.Log("X "+x.ToString() + " X2 "+x2.ToString() + " Z "+z.ToString() + " Z2 "+z2.ToString());
		if (x < x2 && posibilities.Contains(1)) {
			direction = 1;
			return;
		}
		else if (x > x2 && posibilities.Contains(0)) {
			direction = 0;
			return;
		}
		else if (z < z2 && posibilities.Contains(2)) {
			direction = 2;
			return;
		}
		else if (z > z2 && posibilities.Contains(3)) {
			direction = 3;
			return;
		}
	}

	//unset moving back direction
	if (direction == 0 && posibilities.Contains(1)) posibilities.Remove(1);
	if (direction == 1 && posibilities.Contains(0)) posibilities.Remove(0);
	if (direction == 2 && posibilities.Contains(3)) posibilities.Remove(3);
	if (direction == 3 && posibilities.Contains(2)) posibilities.Remove(2);

	var index : int = Random.Range(0,posibilities.Count);
	var newDirection : int = posibilities[index];

	direction = newDirection;
}

function deleteDetector(){
	Destroy(ownEnemyDetector);
	Destroy(gameObject);
}