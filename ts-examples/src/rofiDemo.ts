import {getLocalRofi} from "rofi";



setInterval(() => {
	console.log("My ID is: " + getLocalRofi().getId());

	getLocalRofi().getJoint(0).setVelocity(Math.random() * 100);
	console.log("My first joint's velocity is: " + getLocalRofi().getJoint(0).getVelocity());
}, 1000);