#pragma strict

public var shieldTime : int;

private var hasShield : boolean;
private var shieldActivated : boolean;
private var shieldActivatedCounter : float;

function Start () {
	hasShield = false;
	shieldActivated = false;
}

function Update () {
	if (hasShield) {
		if (Input.GetKeyDown('space')){
			hasShield = false;
			shieldActivatedCounter = 0;
			shieldActivated = true;
		}
	}

	if (shieldActivated) {
		var percent : float = 100-100*shieldActivatedCounter/shieldTime;
		GameObject.Find("ProgressShield").SendMessage("SetFillerSize",percent/100);
		if (shieldTime < shieldActivatedCounter) {
			shieldActivated = false;
			if (!hasShield) GameObject.Find("LevelController").SendMessage("losedShield");
		}
		shieldActivatedCounter += Time.deltaTime;
	}
}

function OnParticleCollision(){
	if (!shieldActivated) GameObject.Find("LevelController").SendMessage("smokeHit");
}

function collectedShield (){
	hasShield = true;
}

function hitEnemy (){
	if (shieldActivated){
		GameObject.Find("LevelController").SendMessage("killedEnemy");
	}
	else {
		GameObject.Find("LevelController").SendMessage("decreaseLives");
	}
}

function hitTrap() {
	if (!shieldActivated) GameObject.Find("LevelController").SendMessage("decreaseLives");
}