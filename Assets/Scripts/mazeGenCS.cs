using UnityEngine;
using System.Collections;

public class mazeGenCS : MonoBehaviour {

	public GameObject part11;
	public GameObject part12;
	public GameObject part13;
	public GameObject part14;
	public GameObject part21;
	public GameObject part22;
	public GameObject part23;
	public GameObject part24;
	public GameObject part31;
	public GameObject part41;
	public GameObject part42;
	public GameObject part51;
	public GameObject part52;
	public int N;		               // dimension of maze

	public GameObject enemy;
	public GameObject ball;
	public GameObject key;
	public GameObject shield;
	public GameObject heart;
	public GameObject trapNeedle;
	public GameObject trapSmoke;
	public GameObject trapScythe;

	private bool[,] north;
	private bool[,] east;
	private bool[,] south;
	private bool[,] west;
	private bool[,] visited;


	private int[,] directionsToPart;
	private int[,] partsUsed;

	private int rooms;
	private int visitedRooms;

	private bool instantiatedKey;
	public int nEnemies;
	public int nShields;
	public float probabilityToShield;
	public int nTraps;
	public float probabilityToTrap;

	// Use this for initialization
	void Start () {
		init();
		initPartTable();
		generate();
		sendMazeToEntities();

		rooms = 0;
		for (int i = 1; i <= N; ++i){
			for (int j = 1; j <= N; ++j){
				instantiateObject(i, j);
			}
		}

		visitedRooms = 1;
		instantiatedKey = false;
		for (int i= 1; i <= N; ++i){
			for (int j= 1; j <= N; ++j){
				//Evade the player position
				if (i != 1 || j != 1){
					instantiateEntities(i, j);
				}
			}
		}
	}

	void init() {
		// initialize border cells as already visited
		visited = new bool[N+2,N+2];
		for (int x = 0; x < N+2; x++) {
			visited[x,0] = true;
			visited[x,N+1] = true;
		}
		for (int y = 0; y < N+2; y++) {
			visited[0,y] = true;
			visited[N+1,y] = true;
		}


		// initialze all walls as present
		north = new bool[N+2,N+2];
		east  = new bool[N+2,N+2];
		south = new bool[N+2,N+2];
		west  = new bool[N+2,N+2];
		for (int x = 0; x < N+2; x++) {
			for (int y= 0; y < N+2; y++) {
				north[x,y] = true;
				east[x,y]  = true;
				south[x,y] = true;
				west[x,y]  = true;
			}
		}
	}

	void initPartTable(){
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
	void generate(int x, int y) {
		visited[x,y] = true;

		// while there is an unvisited neighbor
		while (!visited[x,y+1] || !visited[x+1,y] || !visited[x,y-1] || !visited[x-1,y]) {

			// pick random neighbor (could use Knuth's trick instead)
			while (true) {
				int r = Random.Range(0,4);
				if (r == 0 && !visited[x,y+1]) {
					north[x,y] = false;
					south[x,y+1] = false;
					generate(x , y + 1);
					break;
				}
				else if (r == 1 && !visited[x+1,y]) {
					east[x,y] = false;
					west[x+1,y] = false;
					generate(x+1 , y);
					break;
				}
				else if (r == 2 && !visited[x,y-1]) {
					south[x,y] = false;
					north[x,y-1] = false;
					generate(x , y-1);
					break;
				}
				else if (r == 3 && !visited[x-1,y]) {
					west[x,y] = false;
					east[x-1,y] = false;
					generate(x-1,y);
					break;
				}
			}
		}
	}

	// generate the maze starting from lower left
	void generate() {
		generate(1, 1);

		// delete some random walls
		for (int i = 0; i < N; i++) {
			int x = 1 + Random.Range(0,N-1);
			int y = 1 + Random.Range(0,N-1);
			north[x,y] = south[x,y+1] = false;
		}

		//delete the initial walls
		north[1,1] = east[1,1] = false;
		south[1,2] = west[2,1] = false;
	}

	void instantiateObject(int x , int z){
		float offsetX = x*10.0f;
		float offsetY = 0.0f;
		float offsetZ = z*10.0f;
		Vector3 position = new Vector3(offsetX, offsetY, offsetZ);

		int pos = getPosDirectionsToPart(x,z);
		int rotation = directionsToPart[pos,1];
		GameObject cloneObject = getPartFromValue (directionsToPart [pos, 0], rotation, x, z);
		GameObject.Instantiate(cloneObject,position,Quaternion.Euler(0, rotation, 0));
		if (x != 1 || z != 1) {
			GameObject.Instantiate(ball, position, Quaternion.Euler(0, 0, 0));
			int r;
			if (nTraps > 0 && !checkIfPosIsRoom(x,z)) {
				r = Random.Range(0,100);
				if (r < probabilityToTrap){
					r = Random.Range(0,3);
					if (r == 0) GameObject.Instantiate(trapNeedle, position, Quaternion.Euler(0, 0, 0));
					else if (r == 1) GameObject.Instantiate(trapSmoke, position, Quaternion.Euler(0, 0, 0));
					else if (r == 2 && directionsToPart[pos,0] == 1) GameObject.Instantiate(trapScythe, position, Quaternion.Euler(0, rotation, 0));
					nTraps--;
				}
			}
		}

		if (checkIfPosIsRoom(x,z)) {
			++rooms;
		}
	}

	void instantiateEntities(int x , int z){
		float offsetX = x*10.0f;
		float offsetY = 0.0f;
		float offsetZ = z*10.0f;
		Vector3 position = new Vector3(offsetX, offsetY, offsetZ);

		++visitedRooms;

		if (!checkIfPosIsRoom(x,z)) {
			int r;
			if (!instantiatedKey){
				r = Random.Range(0,((N*N)-rooms)-visitedRooms);
				if (r == 0){
					GameObject.Instantiate(key, position, Quaternion.Euler(0, 0, 0));
					instantiatedKey = true;
					return;
				}
			}

			if (nShields > 0){
				r = Random.Range(0,100);
				if (r < probabilityToShield){
					GameObject.Instantiate(shield, position, Quaternion.Euler(0, 0, 0));
					nShields--;
					return;
				}
			}

			if (nEnemies > 0){
				r = Random.Range(0,((N*N)-rooms)-visitedRooms);
				if (r == 0){
					GameObject.Instantiate(enemy, position, Quaternion.Euler(0, 0, 0));
					nEnemies--;
					return;
				}
			}
		}
		else {
			GameObject.Instantiate(heart, position, Quaternion.Euler(0, 0, 0));
		}
	}

	void respawnEnemy(){
		bool spawned = false;
		int i;
		int j;
		while (!spawned){
			i = Random.Range(1,N+1);
			j = Random.Range(1,N+1);
			if (i != 1 || j != 1){
				float offsetX = i*10.0f;
				float offsetY = 0.0f;
				float offsetZ = j*10.0f;
				Vector3 position = new Vector3(offsetX, offsetY, offsetZ);
				if (!checkIfPosIsRoom(i,j)) {
					GameObject.Instantiate(enemy, position, Quaternion.Euler(0, 0, 0));
					spawned = true;
				}
			}
		}
	}

	bool checkIfPosIsRoom(int i, int j){
		int count = 0;
		if (north[i,j]) ++count;
		if (south[i,j]) ++count;
		if (east[i,j]) ++count;
		if (west[i,j]) ++count;
		return (count>=3);
	}

	int getPosDirectionsToPart(int i, int j){
		int pos = 0;

		if (north[i,j]) pos += 8;
		if (south[i,j]) pos += 4;
		if (east[i,j]) pos += 2;
		if (west[i,j]) pos += 1;

		return pos;
	}

	GameObject getPartFromValue(int value, int rotation, int x, int z){
		int r;
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
			int x1 = 0;
			int z1 = 0;
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
			int x2 = 0;
			int z2 = 0;
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
		return null;
	}

	void sendMazeToEntities(){
		EnemyMovementCS.N = N;
		EnemyMovementCS.north = north;
		EnemyMovementCS.south = south;
		EnemyMovementCS.east = east;
		EnemyMovementCS.west = west;

		PlayerMovementCS.N = N;
		PlayerMovementCS.north = north;
		PlayerMovementCS.south = south;
		PlayerMovementCS.east = east;
		PlayerMovementCS.west = west;

		LevelControllerCS.N = N;
	}
}
