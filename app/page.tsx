"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import arrow from "../public/assets/images/icon-arrow.svg";

export default function Home() {
	const yearsSpanRef = useRef<HTMLSpanElement>(null);
	const monthsSpanRef = useRef<HTMLSpanElement>(null);
	const daysSpanRef = useRef<HTMLSpanElement>(null);

	const [isFuture, setIsFuture] = useState(false);

	const [birthday, setBirthday] = useState(new Date());

	const today: Date = new Date();
	const currentYear: number = today.getFullYear();
	const currentMonth: number = today.getMonth() + 1;
	const currentDay: number = today.getDate();

	const validateMonth = (month: number) => {
		return month < 13 && month > 0;
	};

	const validateDay = (day: number) => {
		return day < 32 && day > 0;
	};

	const validateYear = (year: number) => {
		return year >= 0;
	};

	const validateTense = (month: number, day: number, year: number) => {
		return year < currentYear ||
			(year === currentYear && month < currentMonth) ||
			(year === currentYear &&
				month === currentMonth &&
				day <= currentDay);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let form: HTMLFormElement = e.currentTarget;
		let formData: FormData = new FormData(form);
		let birthYear: number = Number(formData.get("birthYear"));
		let birthMonth: number = Number(formData.get("birthMonth"));
		let birthDay: number = Number(formData.get("birthDay"));
		if (validateMonth(birthMonth) && validateDay(birthDay) && validateYear(birthYear) && validateTense(birthMonth, birthDay, birthYear)) {
			console.log("pass");
			setBirthday(new Date(birthYear, birthMonth - 1, birthDay));
		} else {
			console.log("no pass")
		}
	};

	const handleError = () => {
		const labels = document.querySelectorAll("label");
		const inputs = document.querySelectorAll("input");
		const yearLabel = document.querySelector(
			".birthdayDiv__yearDiv__label"
		);
		const monthLabel = document.querySelector(
			".birthdayDiv__monthDiv__label"
		);
		const dayLabel = document.querySelector(".birthdayDiv__dayDiv__label");
		const yearInput = document.querySelector(
			".birthdayDiv__yearDiv__input"
		);
		const monthInput = document.querySelector(
			".birthdayDiv__monthDiv__input"
		);
		const dayInput = document.querySelector(".birthdayDiv__dayDiv__input");
		const yearMessage = document.querySelector(
			".birthdayDiv__yearDiv__errorMessage"
		);
		const monthMessage = document.querySelector(
			".birthdayDiv__monthDiv__errorMessage"
		);
		const dayMessage = document.querySelector(
			".birthdayDiv__dayDiv__errorMessage"
		);
		const futureMessage = document.querySelector;

		if (isFuture) {
			inputs.forEach((input) => {
				input.classList.add(styles["error"]);
			});
			labels.forEach((label) => {
				label.classList.add(styles["error__label"]);
			});
		}
	};

	useEffect(() => {
		const labels = document.querySelectorAll("label");
		const inputs = document.querySelectorAll("input");
		if (isFuture) {
			inputs.forEach((input) => {
				input.classList.add(styles["error__input"]);
			});
			labels.forEach((label) => {
				label.classList.add(styles["error__label"]);
			});
		}
	}, [birthday]);

	// const handleUpdatedStatus = () => {
	// const errorMessages = document.querySelectorAll(
	// 	"[class*=errorMessage]"
	// );
	// 	errorMessages.forEach((message) => {
	// 		message.classList.add(styles["display"]);
	// 	});
	// };

	// const calculateAge = () => {
	// 	if (!isFuture) {
	// 		let ageDay =
	// 			currentDay >= birthDay
	// 				? currentDay - birthDay
	// 				: currentDay + 30 - birthDay;
	// 		let ageMonth =
	// 			currentDay >= birthDay
	// 				? currentMonth >= birthMonth
	// 					? currentMonth - birthMonth
	// 					: currentMonth + 12 - birthMonth
	// 				: currentMonth - 1 >= birthMonth
	// 				? currentMonth - birthMonth
	// 				: currentMonth - 1 + 12 - birthMonth;
	// 		let ageYear =
	// 			currentMonth < birthMonth
	// 				? currentYear - birthYear - 1
	// 				: currentYear - birthYear;

	// 		console.log(
	// 			"I'm",
	// 			ageYear,
	// 			"years",
	// 			ageMonth,
	// 			"months, and",
	// 			ageDay,
	// 			"days old."
	// 		);
	// 		if (yearsSpanRef.current)
	// 			yearsSpanRef.current.textContent = ageYear.toString();
	// 		if (monthsSpanRef.current)
	// 			monthsSpanRef.current.textContent = ageMonth.toString();
	// 		if (daysSpanRef.current)
	// 			daysSpanRef.current.textContent = ageDay.toString();
	// 	}
	// };

	// // Indicate invalid inputs
	// useEffect(() => {
	// 	if (isFuture || isInvalidDay || isInvalidMonth) {
	// 		handleUpdatedStatus();
	// 	}
	// }, [isFuture, isInvalidDay, isInvalidMonth]);

	// // Calculate and display age
	// useEffect(() => {
	// 	if (!isFuture) {
	// 	}
	// });

	return (
		<div className={styles.container}>
			<form
				className={styles.birthdayDiv}
				id="birthday"
				onSubmit={handleSubmit}>
				<div className={styles.birthdayDiv__monthDiv}>
					<label
						htmlFor="birthMonth"
						className={styles.birthdayDiv__monthDiv__label}>
						MONTH
					</label>
					<input
						required
						type="number"
						name="birthMonth"
						id="birthMonth"
						className={styles.birthdayDiv__monthDiv__input}
					/>
					<p className={styles.birthdayDiv__monthDiv__errorMessage}>
						Must be a valid month
					</p>
				</div>
				<div className={styles.birthdayDiv__dayDiv}>
					<label
						htmlFor="birthDay"
						className={styles.birthdayDiv__dayDiv__label}>
						DAY
					</label>
					<input
						required
						type="number"
						name="birthDay"
						id="birthDay"
						className={styles.birthdayDiv__dayDiv__input}
					/>
					<p className={styles.birthdayDiv__dayDiv__errorMessage}>
						Must be a valid day
					</p>
				</div>
				<div className={styles.birthdayDiv__yearDiv}>
					<label
						htmlFor="birthYear"
						className={styles.birthdayDiv__yearDiv__label}>
						YEAR
					</label>
					<input
						required
						type="number"
						name="birthYear"
						id="birthYear"
						className={styles.birthdayDiv__yearDiv__input}
					/>
					<p className={styles.birthdayDiv__yearDiv__errorMessage}>
						Must be a valid year
					</p>
				</div>
			</form>
			<button className={styles.button} form="birthday">
				<Image
					src={arrow}
					alt="Calculate button"
					className={styles.button__image}
				/>
			</button>
			<div className={styles.resultDiv}>
				<p className={styles.resultDiv__years}>
					<span
						ref={yearsSpanRef}
						className={styles.resultDiv__years__number}>
						--
					</span>{" "}
					years
				</p>
				<p className={styles.resultDiv__months}>
					<span
						ref={monthsSpanRef}
						className={styles.resultDiv__months__number}>
						--
					</span>{" "}
					months
				</p>
				<p className={styles.resultDiv__days}>
					<span
						ref={daysSpanRef}
						className={styles.resultDiv__days__number}>
						--
					</span>{" "}
					days
				</p>
			</div>
		</div>
	);
}
