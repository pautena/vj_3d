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
private var timeAnimation : float = 1.5f;
private var paused : boolean = false;
private var updatingScreen : boolean = false;
private var gameStarted : boolean = false;
private var time : float = 0.0f;
private var lives : int = 4;
private var difficulty : int = 1;
private var level : int = 3;
private var speed : float = 1.0f;
private var gameEnded = false;
private var highScore : int = 0;
private var allLevelsMode : boolean = false;

function Start() {
	var gameStats : GameObject = GameObject.Find("GameStats");
	var gameScript : GameStats = gameStats.GetComponent("GameStats"); 

	var gameMode : GameObject = GameObject.Find("GameMode");
	var gameModeScript : GameMode = gameMode.GetComponent("GameMode"); 

	allLevelsMode = gameModeScript.allLevelsMode;

	if (!gameScript.playing) {
		level = Random.Range(3,15);
		gameModeScript.previousLevel = level;
	}

	if (allLevelsMode){
		if (!PlayerPrefs.HasKey("allLevels")){
			PlayerPrefs.SetInt("allLevels", 0);
		}
	}

	highScore = PlayerPrefs.GetInt("allLevels");
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

		level = Random.Range(3,15);
		while (gameModeScript.previousLevel == level){
			level = Random.Range(3,15);
		}
		gameModeScript.previousLevel = level;

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
				if (highScore < --score) PlayerPrefs.SetInt("allLevels", score);
				endScoreText.text = "Score: " + score;
				gameScreen.enabled = false;
				endScreen.enabled = true;
				gameEnded = true;
				restartGameStats();
			}
		}
		if (score % 10 == 0){
			difficulty = gameScript.difficulty;
			if (difficulty < 3) {
				++difficulty;
			}
			gameScript.difficulty = difficulty;
		}
		if (score % 5 == 0){
			Time.timeScale += 0.3f;
		}
	}
	else {
		pauseScreen.enabled = false;
		gameScreen.enabled = false;
		endScreen.enabled = false;
	}

	titleText.text = getTitleLevel();
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

function getIdLevel(){
	return level;
}

function getTitleLevel(){
	var id : String;
	switch (level){
		case 3:
			id = "Balance";
			break;
		case 4:
			id = "Evade";
			break;
		case 5:
			id = "Collect";
			break;
		case 6:
			id = "Survive";
			break;
		case 7:
			id = "Run";
			break;
		case 8:
			id = "React";
			break;
		case 9:
			id = "Pass";
			break;
		case 10:
			id = "Fly, flappy bird";
			break;
		case 11:
			id = "Select";
			break;
		case 12:
			id = "Stay";
			break;
		case 13:
			id = "Destroy";
			break;
		case 14:
			id = "Shoot";
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