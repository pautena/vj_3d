using UnityEngine;
using System.Collections;

public class ClickLevel : OnClick {

	public int level;

	// Use this for initialization
	void Start () {
		base.Start ();
	}


	public override void OnClickFunc(){
		Debug.Log ("Load Level: "+level);
	}
}
