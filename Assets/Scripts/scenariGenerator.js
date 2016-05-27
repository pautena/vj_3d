#pragma strict

public var part1 : GameObject;
public var part2 : GameObject;
public var part3 : GameObject;
public var part4 : GameObject;

public var width : int;
public var height : int;

private var matrix : int[,];
private var rotations : float[,];

function Start () {
	matrix = new int[width,height];
	rotations = new float[width,height];

	initMatrix();

	for (var i : int = 0; i < width; ++i){
		for (var j : int = 0; j < height; ++j){
			instantiateObject(i, j, matrix[i,j], rotations[i,j]);
		}
	}
}

function Update () {

}

function initMatrix(){

	//Initialize invariants
	matrix[0,0] = 2;
	rotations[0,0] = 0.0f;
	matrix[0,height-1] = 2;
	rotations[0,height-1] = 90.0f;
	matrix[width-1,0] = 2;
	rotations[width-1,0] = -90.0f;
	matrix[width-1,height-1] = 2;
	rotations[width-1,height-1] = 180.0f;

	for (var i : int = 0; i < width; ++i){
		for (var j : int = 0; j < height; ++j){

			/***** CORNERS ******/
			if (i == 0 && j == 0) {
				matrix[i,j] = 2;
				rotations[i,j] = 0.0f;
			}
			else if (i == 0 && j == height-1) {
				matrix[i,j] = 2;
				rotations[i,j] = 90.0f;
			}
			else if (i == width-1 && j == 0) {
				matrix[i,j] = 2;
				rotations[i,j] = -90.0f;
			}
			else if (i == width-1 && j == height-1) {
				matrix[i,j] = 2;
				rotations[i,j] = 180.0f;
			}
			/*******************/
			/***** BORDERS *****/
			//left border
			else if (i == 0){
				getLeftBorder(i,j);
			}
			//Right border
			else if (i == width-1){
				getRightBorder(i,j);
			}
			//Lower Border
			else if (j == 0){
				getLowerBorder(i,j);
			}
			//Upper Border
			else if (j == height-1){
				getUpperBorder(i,j);
			}
			/*******************/
			else {
				matrix[i,j] = 3;
				rotations[i,j] = 0.0f;
			}
		}
	}
}

function instantiateObject(x : int, z : int, value : int, rotation : float){
	var offsetX : float = x*10.0;
	var offsetY : float = 0.0;
	var offsetZ : float = z*10.0;
	var position : Vector3 = Vector3(offsetX, offsetY, offsetZ);

	GameObject.Instantiate(getPartFromValue(value) ,position,Quaternion.Euler(Vector3(0, rotation, 0)));
}

function getPartFromValue(value : int){
	if (value == 1) return part1;
	if (value == 2) return part2;
	if (value == 3) return part3;
	if (value == 4) return part4;
}

function getLeftBorder(i : int, j : int){
	/** Values are part1, part2 **/
	var values = new Array(10);
	for (var ii : int = 0; ii < 2; i++){
		values.Add(ii);
	}
	var randomValues = new int[10];
	for (var ii2 : int = 0; ii2 < randomValues.Length; ii2++){
		var thisNumber = Random.Range(0,values.Count);
		randomValues[ii2] = values[thisNumber];
		values.RemoveAt(thisNumber);
	}

	Debug.Log(randomValues);
	/*
	var v : int = Random.Range(0,2);

	if (v == 0) {
		matrix[i,j] = 1;
		// Rotations are 0.0
		rotations[i,j] = 0.0;
		if (checkPartCondition) return;
		++v;
	}
	if (v == 1){
		matrix[i,j] = 2;
		// Rotations are 0.0, 90.0
		var r : int = Random.Range(0,2);
		if (r == 0) rotations[i,j] = 0.0;
		else rotations[i,j] = 90.0;
	}
	*/
}

function getRightBorder(i : int, j : int){
	/** Values are part1, part2 **/
	var v : int = Random.Range(0,2);
	switch(v){
		case 0 :
			matrix[i,j] = 1;
			/** Rotations are 0.0 **/
			rotations[i,j] = 0.0;
			break;
		case 1 : 
			matrix[i,j] = 2;
			/** Rotations are -90.0, 180.0 **/
			var r : int = Random.Range(0,2);
			if (r == 0) rotations[i,j] = -90.0;
			else rotations[i,j] = 180.0;
			break;
	}
}

function getLowerBorder(i : int, j : int){
	/** Values are part1, part2 **/
	var v : int = Random.Range(0,2);
	switch(v){
		case 0 :
			matrix[i,j] = 1;
			/** Rotations are 90.0 **/
			rotations[i,j] = 90.0;
			break;
		case 1 : 
			matrix[i,j] = 2;
			/** Rotations are 0.0, -90.0 **/
			var r : int = Random.Range(0,2);
			if (r == 0) rotations[i,j] = 0.0;
			else rotations[i,j] = -90.0;
			break;
	}
}

function getUpperBorder(i : int, j : int){
	/** Values are part1, part2 **/
	var v : int = Random.Range(0,2);
	switch(v){
		case 0 :
			matrix[i,j] = 1;
			/** Rotations are 90.0 **/
			rotations[i,j] = 90.0;
			break;
		case 1 : 
			matrix[i,j] = 2;
			/** Rotations are 90.0, 180.0 **/
			var r : int = Random.Range(0,2);
			if (r == 0) rotations[i,j] = 90.0;
			else rotations[i,j] = 180.0;
			break;
	}
}

function checkPartCondition(v: int, i : int, j : int){
	switch(v){
		case 1: 
			break;
	}
}