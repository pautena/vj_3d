#pragma strict

public var enemy : Rigidbody2D;

private var numberEnemies : int = 0;
private var spawned : int = 0;
private var period : float = 1.0f;
private var time : float = 0.0f;

function Update(){
	time += Time.deltaTime;
	if (time > period){

		time = 0;
		var offsetX : float = 7.0f;
		var r : int = Random.Range(0,3);
		var offsetY : float;
		if (r == 0){
			offsetY = -2.0f;
		}
		if (r == 1){
			offsetY = 0.0f;
		}
		if (r == 2){
			offsetY = 2.0f;
		}
		var position : Vector2 =
			Vector2(offsetX, offsetY);
		var instantiatedEnemy : Rigidbody2D = 
			Rigidbody2D.Instantiate(enemy, position, Quaternion());

		var r2 : int = Random.Range(0,2);
		if (r2 == 0){
			var offsetY2 : float;
			if (r == 0){
				offsetY2 = 0.0f;
			}
			if (r == 1){
				offsetY2 = 2.0f;
			}
			if (r == 2){
				offsetY2 = -2.0f;
			}
			var position2 : Vector2 =
				Vector2(offsetX, offsetY2);
			var instantiatedEnemy2 : Rigidbody2D = 
				Rigidbody2D.Instantiate(enemy, position2, Quaternion());
		}
	}
}