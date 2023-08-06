import React from "react";
import styles from "./Attribution.module.css"

const Attribution = () => {
	return (
		<div className={styles.attribution}>
			Challenge by{" "}
			<a
				href="https://www.frontendmentor.io?ref=challenge"
				target="_blank">
				Frontend Mentor
			</a>
			. Coded by{" "}
			<a href="https://github.com/danheecho1" target="_blank">
				Danny Cho
			</a>
			.
		</div>
	);
};

export default Attribution;
