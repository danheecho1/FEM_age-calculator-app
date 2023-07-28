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
	const [isInvalidDay, setIsInvalidDay] = useState(false);
	const [isInvalidMonth, setIsInvalidMonth] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let form: HTMLFormElement = e.currentTarget;
		let formData: FormData = new FormData(form);
		let birthYear: number = Number(formData.get("birthYear"));
		let birthMonth: number = Number(formData.get("birthMonth"));
		let birthDay: number = Number(formData.get("birthDay"));
		let birthDate: Date = new Date(birthYear, birthMonth - 1, birthDay);
		console.log("my birthday is", birthDate);
		let today: Date = new Date();
		let currentYear: number = today.getFullYear();
		let currentMonth: number = today.getMonth() + 1;
		let currentDay: number = today.getDate();

		// Checking if the numbers put in days and months are invalid
		setIsInvalidMonth(birthMonth > 12 || birthMonth == 0);
		setIsInvalidDay(birthDay > 31 || birthDay == 0);

		// Checking if the input date is in the future
		if (!isInvalidMonth && !isInvalidDay) {
			setIsFuture(
				birthYear > currentYear ||
					(birthYear === currentYear && birthMonth > currentMonth) ||
					(birthYear === currentYear &&
						birthMonth === currentMonth &&
						birthDay > currentDay)
			);
		}

		if (!isFuture) {
			let ageDay =
				currentDay >= birthDay
					? currentDay - birthDay
					: currentDay + 30 - birthDay;
			let ageMonth =
				currentDay >= birthDay
					? currentMonth >= birthMonth
						? currentMonth - birthMonth
						: currentMonth + 12 - birthMonth
					: currentMonth - 1 >= birthMonth
					? currentMonth - birthMonth
					: currentMonth - 1 + 12 - birthMonth;
			let ageYear =
				currentMonth < birthMonth
					? currentYear - birthYear - 1
					: currentYear - birthYear;

			console.log(
				"I'm",
				ageYear,
				"years",
				ageMonth,
				"months, and",
				ageDay,
				"days old."
			);
			if (yearsSpanRef.current)
				yearsSpanRef.current.textContent = ageYear.toString();
			if (monthsSpanRef.current)
				monthsSpanRef.current.textContent = ageMonth.toString();
			if (daysSpanRef.current)
				daysSpanRef.current.textContent = ageDay.toString();
		}
	};

	return (
		<div className={styles.container}>
			<form
				className={styles.birthdayDiv}
				id="birthday"
				onSubmit={handleSubmit}>
				<div className={styles.birthdayDiv__monthDiv}>
					<label
						htmlFor="birthMonth"
						className={
							isFuture
								? `${styles.birthdayDiv__monthDiv__label} ${styles.error__label}`
								: styles.birthdayDiv__monthDiv__label
						}>
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
						className={
							isFuture
								? `${styles.birthdayDiv__dayDiv__label} ${styles.error__label}`
								: styles.birthdayDiv__dayDiv__label
						}>
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
						className={
							isFuture
								? `${styles.birthdayDiv__yearDiv__label} ${styles.error__label}`
								: styles.birthdayDiv__yearDiv__label
						}>
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
