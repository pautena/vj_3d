using UnityEngine;
using System.Collections;
using UnityEngine.UI;

[RequireComponent(typeof(Button))]
public class ClickSound : MonoBehaviour {


	private AudioSource source;

	// Use this for initialization
	void Start () {
		source = GetComponent<AudioSource> ();

		GetComponent<Button> ().onClick.AddListener (() => PlaySound());
	}

	void PlaySound(){
		source.Play();
		Debug.Log ("play sound: "+source);
	}
}
