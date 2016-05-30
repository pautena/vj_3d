using UnityEngine;
using System.Collections;

public class DamageScriptCS : PlayerCollisionScriptCS {

	public int damage=10;

	public override void OnPlayerCollision(){
		player.GetComponent<PlayerHealth>().TakeDamage (damage);
	}
}
