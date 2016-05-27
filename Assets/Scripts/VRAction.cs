using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class VRAction : OnClick {

	public bool vrEnabled=true;

	void Start () {
		base.Start ();
		Text child = GetComponentsInChildren<Text> () [0];
		if (vrEnabled) {
			child.text = "Treure VR";
		} else {
			child.text = "VR";
		}

	}
	
	public override void OnClickFunc(){
		vrEnabled =! vrEnabled;

		Text child = GetComponentsInChildren<Text> () [0];
		if (vrEnabled) {
			child.text = "Treure VR";
		} else {
			child.text = "VR";
		}
	}
}
