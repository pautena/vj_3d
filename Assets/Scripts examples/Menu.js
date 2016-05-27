#pragma strict

public var menu1 : Canvas;
public var menu2 : Canvas;
public var menu4 : Canvas;

private var gameMode : GameObject;
private var gameScript : GameMode;

function Start(){
	menu2.enabled = false;
	menu4.enabled = false;

	gameMode = GameObject.Find("GameMode");
	gameScript = gameMode.GetComponent("GameMode"); 
}

function Update(){
	if (Input.GetKey("escape")){
		Application.Quit();
	}
}

function OnButtonStart(){
	menu1.enabled = false;
	menu2.enabled = true;
}

function OnButtonExit(){
	Application.Quit();
}

function OnButtonAllLevels(){
	gameScript.allLevelsMode = true;
	Application.LoadLevel(1);
}

function OnButtonChallenge(){
	gameScript.allLevelsMode = false;
	menu2.enabled = false;
	menu4.enabled = true;
}

function OnButtonBack(){
	menu1.enabled = true;
	menu2.enabled = false;
}

function OnButtonBackChallenges(){
	menu2.enabled = true;
	menu4.enabled = false;
}

function OnButton11(){
	gameScript.levelName = "level11";
	Application.LoadLevel(2);
}

function OnButton12(){
	gameScript.levelName = "level12";
	Application.LoadLevel(2);
}

function OnButton13(){
	gameScript.levelName = "level13";
	Application.LoadLevel(2);
}

function OnButton14(){
	gameScript.levelName = "level14";
	Application.LoadLevel(2);
}

function OnButton21(){
	gameScript.levelName = "level21";
	Application.LoadLevel(2);
}

function OnButton22(){
	gameScript.levelName = "level22";
	Application.LoadLevel(2);
}

function OnButton23(){
	gameScript.levelName = "level23";
	Application.LoadLevel(2);
}

function OnButton24(){
	gameScript.levelName = "level24";
	Application.LoadLevel(2);
}

function OnButton31(){
	gameScript.levelName = "level31";
	Application.LoadLevel(2);
}

function OnButton32(){
	gameScript.levelName = "level32";
	Application.LoadLevel(2);
}

function OnButton33(){
	gameScript.levelName = "level33";
	Application.LoadLevel(2);
}

function OnButton34(){
	gameScript.levelName = "level34";
	Application.LoadLevel(2);
}