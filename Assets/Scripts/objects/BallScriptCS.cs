using UnityEngine;
using System.Collections;

public class BallScriptCS : PlayerCollisionScriptCS {

	public int points =10;
	public GameObject ball;

	public override void OnPlayerCollision(){
		player.GetComponent<PlayerScore>().IncScore (points);
		Destroy (ball);
	}
}
