using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class ClickAction : OnClick {

	public GameObject hide;
	public GameObject show;
	public bool inputAnim=true;
	private Animator showAnimator;

	// Use this for initialization
	public void Start () {
		base.Start ();
		if (inputAnim)
			showAnimator = show.GetComponent<Animator> ();
		else
			showAnimator = hide.GetComponent<Animator> ();
	
	}
	
	public override void OnClickFunc(){
		show.SetActive (true);
		if (inputAnim) {
			showAnimator.SetTrigger ("show");
			hide.SetActive (false);
		} else {
			showAnimator.SetTrigger ("hide");
		}
	}
}
