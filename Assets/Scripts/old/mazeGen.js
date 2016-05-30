#pragma strict

public var part11 : GameObject;
public var part12 : GameObject;
public var part13 : GameObject;
public var part14 : GameObject;
public var part21 : GameObject;
public var part22 : GameObject;
public var part23 : GameObject;
public var part24 : GameObject;
public var part31 : GameObject;
public var part41 : GameObject;
public var part42 : GameObject;
public var part51 : GameObject;
public var part52 : GameObject;
public var N : int;		               // dimension of maze

public var enemy : GameObject;
public var ball : GameObject;
public var key : GameObject;
public var shield : GameObject;
public var heart : GameObject;
public var trapNeedle : GameObject;
public var trapSmoke : GameObject;
public var trapScythe : GameObject;

private var north : boolean[,];     // is there a wall to north of cell i, j
private var east : boolean[,];
private var south : boolean[,];
private var west : boolean[,];
private var visited : boolean[,];

private var directionsToPart : int[,];
private var partsUsed : int [,];

private var rooms : int;
private var visitedRooms : int;

private var instantiatedKey : boolean;
public var nEnemies : int;
public var nShields : int;
public var probabilityToShield : float;
public var nTraps : int;
public var probabilityToTrap : float;

function Start () {
	init();
	initPartTable();
    generate();
    sendMazeToEntities();

	rooms = 0;
    for (var i : int = 1; i <= N; ++i){
		for (var j : int = 1; j <= N; ++j){
			instantiateObject(i, j);
		}
	}

	visitedRooms = 1;
	instantiatedKey = false;
	for (i= 1; i <= N; ++i){
		for (j= 1; j <= N; ++j){
			//Evade the player position
			if (i != 1 || j != 1){
				instantiateEntities(i, j);
			}
		}
	}
}

function init() {
    // initialize border cells as already visited
    visited = new boolean[N+2,N+2];
    for (var x : int = 0; x < N+2; x++) {
        visited[x,0] = true;
        visited[x,N+1] = true;
    }
    for (var y : int = 0; y < N+2; y++) {
        visited[0,y] = true;
        visited[N+1,y] = true;
    }


    // initialze all walls as present
    north = new boolean[N+2,N+2];
    east  = new boolean[N+2,N+2];
    south = new boolean[N+2,N+2];
    west  = new boolean[N+2,N+2];
    for (var x2 : int = 0; x2 < N+2; x2++) {
        for (var y2 : int = 0; y2 < N+2; y2++) {
            north[x2,y2] = true;
            east[x2,y2]  = true;
            south[x2,y2] = true;
            west[x2,y2]  = true;
        }
    }
}

function initPartTable(){
	directionsToPart = new int[16,2];
	partsUsed = new int[N+2,N+2];

	directionsToPart[0,0] = 3;
	directionsToPart[0,1] = 0;

	directionsToPart[1,0] = 4;
	directionsToPart[1,1] = 0;

	directionsToPart[2,0] = 4;
	directionsToPart[2,1] = 180;

	directionsToPart[3,0] = 1;
	directionsToPart[3,1] = 0;

	directionsToPart[4,0] = 4;
	directionsToPart[4,1] = 270;

	directionsToPart[5,0] = 2;
	directionsToPart[5,1] = 0;

	directionsToPart[6,0] = 2;
	directionsToPart[6,1] = 270;

	directionsToPart[7,0] = 5;
	directionsToPart[7,1] = 180;

	directionsToPart[8,0] = 4;
	directionsToPart[8,1] = 90;

	directionsToPart[9,0] = 2;
	directionsToPart[9,1] = 90;

	directionsToPart[10,0] = 2;
	directionsToPart[10,1] = 180;

	directionsToPart[11,0] = 5;
	directionsToPart[11,1] = 0;

	directionsToPart[12,0] = 1;
	directionsToPart[12,1] = 90;

	directionsToPart[13,0] = 5;
	directionsToPart[13,1] = 270;

	directionsToPart[14,0] = 5;
	directionsToPart[14,1] = 90;

	directionsToPart[15,0] = 3;
	directionsToPart[15,1] = 0;
}

// generate the maze
function generate(x : int, y : int) {
    visited[x,y] = true;

    // while there is an unvisited neighbor
    while (!visited[x,y+1] || !visited[x+1,y] || !visited[x,y-1] || !visited[x-1,y]) {

        // pick random neighbor (could use Knuth's trick instead)
        while (true) {
            var r : int = Random.Range(0,4);
            if (r == 0 && !visited[x,y+1]) {
                north[x,y] = false;
                south[x,y+1] = false;
                generate(x, y + 1);
                break;
            }
            else if (r == 1 && !visited[x+1,y]) {
                east[x,y] = false;
                west[x+1,y] = false;
                generate(x+1, y);
                break;
            }
            else if (r == 2 && !visited[x,y-1]) {
                south[x,y] = false;
                north[x,y-1] = false;
                generate(x, y-1);
                break;
            }
            else if (r == 3 && !visited[x-1,y]) {
                west[x,y] = false;
                east[x-1,y] = false;
                generate(x-1, y);
                break;
            }
        }
    }
}

    // generate the maze starting from lower left
function generate() {
	generate(1, 1);


    // delete some random walls
    for (var i : int = 0; i < N; i++) {
        var x : int = 1 + Random.Range(0,N-1);
        var y : int = 1 + Random.Range(0,N-1);
        north[x,y] = south[x,y+1] = false;
    }

    //delete the initial walls
    north[1,1] = east[1,1] = false;
    south[1,2] = west[2,1] = false;

    /*
    // add some random walls
    for (int i = 0; i < 10; i++) {
        int x = N/2 + StdRandom.uniform(N/2);
        int y = N/2 + StdRandom.uniform(N/2);
        east[x][y] = west[x+1][y] = true;
    }
    */

 
}

function instantiateObject(x : int, z : int){
	var offsetX : float = x*10.0;
	var offsetY : float = 0.0;
	var offsetZ : float = z*10.0;
	var position : Vector3 = Vector3(offsetX, offsetY, offsetZ);

	var pos : int = getPosDirectionsToPart(x,z);
	var rotation : float = directionsToPart[pos,1];
	GameObject.Instantiate(getPartFromValue(directionsToPart[pos,0], rotation, x, z),position,Quaternion.Euler(Vector3(0, rotation, 0)));
	if (x != 1 || z != 1) {
		GameObject.Instantiate(ball, position, Quaternion.Euler(Vector3(0, 0, 0)));
		var r : int;
		if (nTraps > 0 && !checkIfPosIsRoom(x,z)) {
			r = Random.Range(0,100);
			if (r < probabilityToTrap){
				r = Random.Range(0,3);
				if (r == 0) GameObject.Instantiate(trapNeedle, position, Quaternion.Euler(Vector3(0, 0, 0)));
				else if (r == 1) GameObject.Instantiate(trapSmoke, position, Quaternion.Euler(Vector3(0, 0, 0)));
				else if (r == 2 && directionsToPart[pos,0] == 1) GameObject.Instantiate(trapScythe, position, Quaternion.Euler(Vector3(0, rotation, 0)));
				nTraps--;
			}
		}
	}

	if (checkIfPosIsRoom(x,z)) {
		++rooms;
	}
}

function instantiateEntities(x : int, z : int){
	var offsetX : float = x*10.0;
	var offsetY : float = 0.0;
	var offsetZ : float = z*10.0;
	var position : Vector3 = Vector3(offsetX, offsetY, offsetZ);

	++visitedRooms;

	if (!checkIfPosIsRoom(x,z)) {
		var r : int;
		if (!instantiatedKey){
			r = Random.Range(0,((N*N)-rooms)-visitedRooms);
			if (r == 0){
				GameObject.Instantiate(key, position, Quaternion.Euler(Vector3(0, 0, 0)));
				instantiatedKey = true;
				return;
			}
		}

		if (nShields > 0){
			r = Random.Range(0,100);
			if (r < probabilityToShield){
				GameObject.Instantiate(shield, position, Quaternion.Euler(Vector3(0, 0, 0)));
				nShields--;
				return;
			}
		}

		if (nEnemies > 0){
			r = Random.Range(0,((N*N)-rooms)-visitedRooms);
			if (r == 0){
				GameObject.Instantiate(enemy, position, Quaternion.Euler(Vector3(0, 0, 0)));
				nEnemies--;
				return;
			}
		}
	}
	else {
		GameObject.Instantiate(heart, position, Quaternion.Euler(Vector3(0, 0, 0)));
	}
}

function respawnEnemy(){
	var spawned : boolean = false;
	var i : int;
	var j : int;
	while (!spawned){
		i = Random.Range(1,N+1);
		j = Random.Range(1,N+1);
		if (i != 1 || j != 1){
			var offsetX : float = i*10.0;
			var offsetY : float = 0.0;
			var offsetZ : float = j*10.0;
			var position : Vector3 = Vector3(offsetX, offsetY, offsetZ);
			if (!checkIfPosIsRoom(i,j)) {
				GameObject.Instantiate(enemy, position, Quaternion.Euler(Vector3(0, 0, 0)));
				spawned = true;
			}
		}
	}
}

function checkIfPosIsRoom(i : int, j : int){
	var count : int = 0;
	if (north[i,j]) ++count;
	if (south[i,j]) ++count;
	if (east[i,j]) ++count;
	if (west[i,j]) ++count;
	return (count>=3);
}

function getPosDirectionsToPart(i : int, j : int){
	var pos : int = 0;

	if (north[i,j]) pos += 8;
	if (south[i,j]) pos += 4;
	if (east[i,j]) pos += 2;
	if (west[i,j]) pos += 1;

	return pos;
}

function getPartFromValue(value : int, rotation : int, x : int, z : int){
	var r : int;
	if (value == 1) {
		r = Random.Range(0,4);
		partsUsed[x,z] = 11+r;
		if (r == 0) return part11;
		else if (r == 1) return part12;
		else if (r == 2) return part13;
		else return part14;
	}
	if (value == 2) {
		r = Random.Range(0,4);
		partsUsed[x,z] = 21+r;
		if (r == 0) return part21;
		else if (r == 1) return part22;
		else if (r == 2) return part23;
		else return part24;
	}
	if (value == 3) {
		partsUsed[x,z] = 31;
		return part31;
	}
	if (value == 4) {
		//Check what room is in his side
		var x1 : int = 0;
		var z1 : int = 0;
		if (rotation == 0) x1 = 1;
		if (rotation == 90) z1 = -1;
		if (rotation == 180) x1 = -1;
		if (rotation == 270) z1 = 1;

		if (partsUsed[x+x1,z+z1] == 51){
			partsUsed[x,z] = 41;
			return part41;
		}
		if (partsUsed[x+x1,z+z1] == 52){
			partsUsed[x,z] = 42;
			return part42;
		}
		if (partsUsed[x+x1,z+z1] == 41){
			partsUsed[x,z] = 41;
			return part41;
		}
		if (partsUsed[x+x1,z+z1] == 42){
			partsUsed[x,z] = 42;
			return part42;
		}

		r = Random.Range(0,2);
		partsUsed[x,z] = 41+r;
		if (r == 0) return part41;
		else return part42;
	}
	if (value == 5) {
		//Check what room is in his side
		var x2 : int = 0;
		var z2 : int = 0;
		if (rotation == 0) z2 = -1;
		if (rotation == 90) x2 = -1;
		if (rotation == 180) z2 = 1;
		if (rotation == 270) x2 = 1;

		if (partsUsed[x+x2,z+z2] == 41){
			partsUsed[x,z] = 51;
			return part51;
		}
		if (partsUsed[x+x2,z+z2] == 42){
			partsUsed[x,z] = 52;
			return part52;
		}

		r = Random.Range(0,2);
		partsUsed[x,z] = 51+r;
		if (r == 0) return part51;
		else return part52;
	}
}

function sendMazeToEntities(){
	enemyMovement.N = N;
	enemyMovement.north = north;
	enemyMovement.south = south;
	enemyMovement.east = east;
	enemyMovement.west = west;

	playerMovement.N = N;
	playerMovement.north = north;
	playerMovement.south = south;
	playerMovement.east = east;
	playerMovement.west = west;

	levelController.N = N;
}