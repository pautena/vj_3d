#pragma strict

static var N : int;

public var pointsCanvas : Text;
public var livesCanvas : Text;
public var keyCanvas : Image;
public var shieldCanvas : Image;
public var smokeCanvas : Image;
public var mapCanvas : RawImage;
public var points : int;
public var lives : int;

public var timePowerUp : int;
public var cameraPlayer : Camera;
public var cameraMap : Camera;

public var timeSmoke : float;
private var smokeCounter : float;
private var smoked : boolean;

private var keyCollected : boolean;

private var paused : boolean;

function Start () {
	pointsCanvas.text = points.ToString();
	livesCanvas.text = lives.ToString();

	smokeCounter = 0;

	keyCollected = false;
	paused = false;
}

function Update () {
	if (smoked) {
		smokeCounter += Time.deltaTime;
		var transparency : float = (timeSmoke-smokeCounter)/timeSmoke;
		smokeCanvas.color = Color(0,1,0,transparency);
		if (smokeCounter > timeSmoke) {
			smokeCounter = 0;
			smoked = false;
		}
	}

	if (keyCollected) {
		Destroy(GameObject.Find("Door_B"));
		Destroy(GameObject.Find("Door_C"));
	}

	//Pause the game and set the map
	if (Input.GetKeyDown("tab")){
		if (!paused) {
			Time.timeScale = 0;
			mapCanvas.color = Color(1,1,1,1);
			GameObject.Find("PanelMap").GetComponent.<Image>().color = Color(0,0,0,1);
		}
		else {
			mapCanvas.color = Color(1,1,1,0);
			GameObject.Find("PanelMap").GetComponent.<Image>().color = Color(0,0,0,0);
			Time.timeScale = 1;
		}
		paused = !paused;
		cameraMap.SendMessage("toggleGeneralVision",N);
	}
}

function collectedBall(){
	points += 1;
	pointsCanvas.text = points.ToString();
}

function collectedKey(){
	keyCollected = true;
	playerMovement.doorsOpen = keyCollected;
	keyCanvas.color = Color.white;
}

function collectedShield(){
	shieldCanvas.color = Color.white;
	GameObject.Find("Player_Old").SendMessage("collectedShield");
}

function losedShield(){
	shieldCanvas.color = Color(0,0,0,0);
}

function collectedLive(){
	lives += 1;
	livesCanvas.text = lives.ToString();
}

function decreaseLives(){
	lives -= 1;
	livesCanvas.text = lives.ToString();
}

function killedEnemy (){
	Debug.Log("Killed Enemy");
}

function setCameraFOV(fov : int){
	cameraPlayer.fieldOfView = fov;
}

function smokeHit(){
	smokeCounter = 0;
	smoked = true;
	smokeCanvas.color = Color(0,1,0,1);
}