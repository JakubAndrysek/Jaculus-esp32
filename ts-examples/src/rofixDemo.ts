import * as rofix from "rofix";

setInterval(() => {
	rofix.setVelocity(Math.random() * 100);
	console.log("Velocity: " + rofix.getVelocity());
}, 1000);