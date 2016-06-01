using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class KeyScriptCS : MonoBehaviour {

	public GameObject keySprite;
	public float speedRotation = 200f;

	private AudioSource audioSource;

	// Use this for initialization
	void Start () {
		audioSource = GetComponent<AudioSource> ();
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate(0, 0, Time.deltaTime*speedRotation );
	}

	void OnTriggerEnter(Collider col){
		if (col.tag == "Player") {
			Debug.Log ("player");
			audioSource.Play ();

			Renderer[] childs = GetComponentsInChildren<Renderer> ();
			for (int i = 0; i < childs.Length; ++i) {
				childs [i].enabled = false;
			}

			Destroy(gameObject,audioSource.clip.length);
			Destroy(keySprite);

			GameObject[] doors = GameObject.FindGameObjectsWithTag ("Door");
			for(int i=0; i<doors.Length;++i){
				Destroy (doors [i]);
			}

			GameObject.Find ("KeyImage").GetComponent<Image> ().color = Color.white;
		}
	}
}
