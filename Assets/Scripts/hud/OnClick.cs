using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public abstract class OnClick : MonoBehaviour {

	public void Start(){
		GetComponent<Button> ().onClick.AddListener (() => OnClickFunc ());
	}
	public abstract void OnClickFunc ();
}
