using UnityEngine;
using System.Collections;

public class OnClicInstructionArrow : OnClick {

	public enum Seq {prev,next};

	public InstructionsManager instructionsManager;
	public Seq seq;

	public override void OnClickFunc(){
		if (seq == Seq.prev) {
			instructionsManager.PrevTab ();
		} else {
			instructionsManager.NextTab ();
		}
			
			
	}
}
