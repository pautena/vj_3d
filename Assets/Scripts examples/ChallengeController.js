#pragma strict

public var titleText : Text;
public var highscoreText : Text;
public var beforeScreen : Canvas;
public var pauseScreen : Canvas;
public var gameScreen : Canvas;
public var endScreen : Canvas;
public var scoreText : Text;
public var heart4 : Image;
public var heart3 : Image;
public var heart2 : Image;
public var heart1 : Image;
public var endScoreText : Text;

private var score : int = 0;
private var timeRemaining : float = 4.0f;
private var timeAnimation : float = 1.0f;
private var paused : boolean = false;
private var updatingScreen : boolean = false;
private var gameStarted : boolean = false;
private var time : float = 0.0f;
private var lives : int = 4;
private var difficulty : int = 1;
private var levelName : String;
private var speed : float = 1.0f;
private var gameEnded = false;
private var highScore : int = 0;

function Start() {
	var gameStats : GameObject = GameObject.Find("GameStats");
	var gameScript : GameStats = gameStats.GetComponent("GameStats"); 

	var gameMode : GameObject = GameObject.Find("GameMode");
	var gameModeScript : GameMode = gameMode.GetComponent("GameMode"); 

	levelName = gameModeScript.levelName;

	titleText.text = "Title: " + getTitleLevel();

	if (!PlayerPrefs.HasKey(levelName)){
		PlayerPrefs.SetInt(levelName, 0);
	}
	highScore = PlayerPrefs.GetInt(levelName);
	highscoreText.text = "Current highscore: " + highScore;


	//Called when passed a level
	if (gameScript.playing){
		gameScript.playing = false;
		beforeScreen.enabled = false;
		pauseScreen.enabled = false;
		endScreen.enabled = false;
		updatingScreen = true;
		score = gameScript.score;
		scoreText.text = score.ToString();
		++score;
		gameScript.score = score;
		lives = gameScript.lives;
		if (lives < 4){
			heart4.enabled = false;
		}
		if (lives < 3){
			heart3.enabled = false;
		}
		if (lives < 2){
			heart2.enabled = false;
		}
		if (gameScript.died){
			gameScript.died = false;
			if (lives < 5) {
				heart4.GetComponent.<Animator>().SetBool("animationOn", true);
			}
			if (lives < 4) {
				heart3.GetComponent.<Animator>().SetBool("animationOn", true);
			}
			if (lives < 3) {
				heart3.enabled = false;
				heart2.GetComponent.<Animator>().SetBool("animationOn", true);
			}
			if (lives < 2) {
				heart2.enabled = false;
				heart1.GetComponent.<Animator>().SetBool("animationOn", true);
			}
			--lives;
			gameScript.lives = lives;
			if (lives < 1) {
				if (highScore < --score) PlayerPrefs.SetInt(levelName, score);
				endScoreText.text = "Score: " + score;
				gameScreen.enabled = false;
				endScreen.enabled = true;
				gameEnded = true;
				restartGameStats();
			}
		}
		difficulty = gameScript.difficulty;
		++difficulty;
		if (difficulty > 3) {
			difficulty = 1;
			Time.timeScale += 0.5f;
		}
		gameScript.difficulty = difficulty;
	}
	else {
		pauseScreen.enabled = false;
		gameScreen.enabled = false;
		endScreen.enabled = false;
	}


}

function Update () {
	//Pause
	if (Input.GetKeyDown(KeyCode.P) && paused && !gameEnded){
		Time.timeScale = speed;
		pauseScreen.enabled = false;
		paused = false;
	}
	else if (Input.GetKeyDown(KeyCode.P) && !paused && !gameEnded){
		speed = Time.timeScale;
		Time.timeScale = 0.0f;
		pauseScreen.enabled = true;
		paused = true;
	}

	//Start
	if (Input.GetButtonDown("Jump") && !paused && !gameEnded){
		beforeScreen.enabled = false;
		startGame();
	}

	if (updatingScreen && !paused && !gameEnded){
		time += Time.deltaTime;
		if (time > timeAnimation/2){
			time = 0;
			scoreText.text = score.ToString();
			updatingScreen = false;
			gameStarted = true;
		}
	}

	if (gameStarted && !paused && !gameEnded){
		time += Time.deltaTime;
		if (time > timeAnimation){
			gameScreen.GetComponent.<Animator>().SetBool("animationOn", true);
		}

		if (time > timeRemaining){
			var id : int = getIdLevel();
			Application.LoadLevel(id);
		}
	}
}

function startGame(){
	gameScreen.enabled = true;
	gameStarted = true;
}

function getTitleLevel(){
	var id : String;
	switch (levelName){
		case "level11":
			id = "Balance";
			break;
		case "level12":
			id = "Evade";
			break;
		case "level13":
			id = "Collect";
			break;
		case "level14":
			id = "Survive";
			break;
		case "level21":
			id = "Run";
			break;
		case "level22":
			id = "React";
			break;
		case "level23":
			id = "Pass";
			break;
		case "level24":
			id = "Fly, flappy bird";
			break;
		case "level31":
			id = "Select";
			break;
		case "level32":
			id = "Stay";
			break;
		case "level33":
			id = "Destroy";
			break;
		case "level34":
			id = "Shoot";
			break;
		default:
			break;
	}
	return id;
}

function getIdLevel(){
	var id : int = 0;
	switch (levelName){
		case "level11":
			id = 3;
			break;
		case "level12":
			id = 4;
			break;
		case "level13":
			id = 5;
			break;
		case "level14":
			id = 6;
			break;
		case "level21":
			id = 7;
			break;
		case "level22":
			id = 8;
			break;
		case "level23":
			id = 9;
			break;
		case "level24":
			id = 10;
			break;
		case "level31":
			id = 11;
			break;
		case "level32":
			id = 12;
			break;
		case "level33":
			id = 13;
			break;
		case "level34":
			id = 14;
			break;
		default:
			break;
	}
	return id;
}

function restartGameStats(){
	var gameStats : GameObject = GameObject.Find("GameStats");
	var gameScript : GameStats = gameStats.GetComponent("GameStats"); 
	
	gameScript.difficulty = 1;
	gameScript.playing = false;
	gameScript.died = false;
	gameScript.score = 1;
	gameScript.lives = 4;

	var gameMode : GameObject = GameObject.Find("GameMode");
	Destroy(gameMode);
}

function OnButtonContinue(){
	Time.timeScale = 1.0f;
	pauseScreen.enabled = false;
	paused = false;
}

function OnButtonExit(){
	Time.timeScale = 1.0f;
	restartGameStats();
	Application.LoadLevel(0);
}