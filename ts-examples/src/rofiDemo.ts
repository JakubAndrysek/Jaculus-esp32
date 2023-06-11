import {Joint, Connector} from "rofi";

let joint = new Joint();
let connector = new Connector();

setInterval(() => {
	joint.setVelocity(Math.random() * 100);
	console.log("Velocity: " + joint.getVelocity());

	connector.connect();
}, 1000);