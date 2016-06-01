using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class KeyScriptCS : MonoBehaviour {

	public GameObject keySprite;
	public float speedRotation = 200f;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate(0, 0, Time.deltaTime*speedRotation );
	}

	void OnTriggerEnter(Collider col){
		if (col.tag == "Player") {
			Debug.Log ("player");
			Destroy(gameObject);
			Destroy(keySprite);

			GameObject[] doors = GameObject.FindGameObjectsWithTag ("Door");
			for(int i=0; i<doors.Length;++i){
				Destroy (doors [i]);
			}

			GameObject.Find ("KeyImage").GetComponent<Image> ().color = Color.white;
		}
	}
}
