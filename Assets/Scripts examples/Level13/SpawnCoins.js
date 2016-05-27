#pragma strict

public var coin : Rigidbody2D;
public var badCoin : Rigidbody2D;

private var numberCoins : int = 0;

function Start () {
	var gameStats : GameObject = GameObject.Find("GameStats");
	var script : GameStats = gameStats.GetComponent("GameStats");
	switch (script.difficulty){
		case 1:
			numberCoins = 5;
			break;
		case 2:
			numberCoins = 7;
			break;
		case 3:
			numberCoins = 10;
			break;
		default:
			break;
	}
	
	var i : int;
	for (i = 0; i < numberCoins; i++){
		var offsetX : float = Random.Range(-5.0, 5.0);
		var offsetY : float = Random.Range(-2.5, 3.0);
		var position : Vector2 = transform.position +
			Vector2(offsetX, offsetY);
		var instantiatedCoin : Rigidbody2D = 
			Rigidbody2D.Instantiate(coin, position, Quaternion());
	}
	for (i = 0; i < script.difficulty; ++i){
		var offsetX2 : float = Random.Range(-5.0, 5.0);
		var offsetY2 : float = Random.Range(-2.5, 3.0);
		var position2 : Vector2 = transform.position +
			Vector2(offsetX2, offsetY2);
		var instantiatedCoin2 : Rigidbody2D = 
			Rigidbody2D.Instantiate(badCoin, position2, Quaternion());
	}
}

function killCoin(){
	--numberCoins;
	if (numberCoins == 0){
		GameObject.Find("TimerLevelCountdown").SendMessage("finish");
	}
}