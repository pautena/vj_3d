#pragma strict

import UnityEngine.UI;

private var period : float = 1.0f;
private var time : float = 0.0f;

private var barDisplay : float = 0.0f;
public var pos : Vector2 = new Vector2(20,40);
public var size : Vector2 = new Vector2(60,20);

public var progressBar : Image;

public var secondsRemainingText : Text;
private var secondsRemaining : float;

private var difficulty : int = 1;
private var timeGame : float;
private var totalTime : float = 0.0f;

function Start(){
	var gameStats : GameObject = GameObject.Find("GameStats");
	var script : GameStats = gameStats.GetComponent("GameStats");
	switch (script.difficulty){
		case 1:
			timeGame = 10.0f;
			secondsRemaining = 10.0f;
			secondsRemainingText.text = "10";
			break;
		case 2:
			timeGame = 20.0f;
			secondsRemaining = 20.0f;
			secondsRemainingText.text = "20";
			break;
		case 3:
			timeGame = 30.0f;
			secondsRemaining = 30.0f;
			secondsRemainingText.text = "30";
			break;
		default:
			break;
	}
}

function Update(){
 	time += Time.deltaTime;
 	totalTime += Time.deltaTime;;
 	progressBar.fillAmount = totalTime * 1/timeGame;
 	if (time > period){
 		time = 0;
 		--secondsRemaining;
 		secondsRemainingText.text = secondsRemaining.ToString();
 		if (secondsRemaining == 0){
 			var gameStats : GameObject = GameObject.Find("GameStats");
			var script : GameStats = gameStats.GetComponent("GameStats");
			script.died = true;
			script.playing = true;
 			var gameMode : GameObject = GameObject.Find("GameMode");
			var gameModeScript : GameMode = gameMode.GetComponent("GameMode"); 
			if (gameModeScript.allLevelsMode){
				Application.LoadLevel(1);
			}
			else {
				Application.LoadLevel(2);
			}
		}
 	}
}

function finish(){
	var gameStats : GameObject = GameObject.Find("GameStats");
	var script : GameStats = gameStats.GetComponent("GameStats");
	script.died = false;
	script.playing = true;
	var gameMode : GameObject = GameObject.Find("GameMode");
	var gameModeScript : GameMode = gameMode.GetComponent("GameMode"); 
	if (gameModeScript.allLevelsMode){
		Application.LoadLevel(1);
	}
	else {
		Application.LoadLevel(2);
	}
}