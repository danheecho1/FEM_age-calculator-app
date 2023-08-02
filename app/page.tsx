"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import arrow from "../public/assets/images/icon-arrow.svg";

export default function Home() {
	const yearsSpanRef = useRef<HTMLSpanElement>(null);
	const monthsSpanRef = useRef<HTMLSpanElement>(null);
	const daysSpanRef = useRef<HTMLSpanElement>(null);

	const monthLabelRef = useRef<HTMLLabelElement>(null);
	const monthInputRef = useRef<HTMLInputElement>(null);
	const monthMessageRef = useRef<HTMLParagraphElement>(null);

	const dayLabelRef = useRef<HTMLLabelElement>(null);
	const dayInputRef = useRef<HTMLInputElement>(null);
	const dayMessageRef = useRef<HTMLParagraphElement>(null);

	const yearLabelRef = useRef<HTMLLabelElement>(null);
	const yearInputRef = useRef<HTMLInputElement>(null);
	const yearMessageRef = useRef<HTMLParagraphElement>(null);

	type DateOrNull = Date | null;
	const [birthday, setBirthday] = useState<DateOrNull>(null);

	const today: Date = new Date();
	const currentYear: number = today.getFullYear();
	const currentMonth: number = today.getMonth() + 1;
	const currentDay: number = today.getDate();

	const validateMonth = (month: number): boolean => {
		return month < 13 && month > 0;
	};

	const validateDay = (day: number): boolean => {
		return day < 32 && day > 0;
	};

	const validateYear = (year: number): boolean => {
		return year >= 0;
	};

	const validateTense = (
		month: number,
		day: number,
		year: number
	): boolean => {
		return (
			year < currentYear ||
			(year === currentYear && month < currentMonth) ||
			(year === currentYear &&
				month === currentMonth &&
				day <= currentDay)
		);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetError();
		let form: HTMLFormElement = e.currentTarget;
		let formData: FormData = new FormData(form);
		let birthYear: number = Number(formData.get("birthYear"));
		let birthMonth: number = Number(formData.get("birthMonth"));
		let birthDay: number = Number(formData.get("birthDay"));
		handleError(
			validateDay(birthDay),
			validateMonth(birthMonth),
			validateYear(birthYear),
			validateTense(birthMonth, birthDay, birthYear)
		);
		if (
			validateMonth(birthMonth) &&
			validateDay(birthDay) &&
			validateYear(birthYear) &&
			validateTense(birthMonth, birthDay, birthYear)
		) {
			console.log("pass");
			setBirthday(new Date(birthYear, birthMonth - 1, birthDay));
		} else {
			console.log("no pass");
		}
	};

	useEffect(() => {
		if (birthday) {
			let ageDay =
				currentDay >= birthday.getDate()
					? currentDay - birthday.getDate()
					: currentDay + 30 - birthday.getDate();
			let ageMonth =
				currentDay >= birthday.getDate()
					? currentMonth >= birthday.getMonth() + 1
						? currentMonth - (birthday.getMonth() + 1)
						: currentMonth + 12 - (birthday.getMonth() + 1)
					: currentMonth - 1 >= birthday.getMonth() + 1
					? currentMonth - (birthday.getMonth() + 1)
					: currentMonth - 1 + 12 - (birthday.getMonth() + 1);
			let ageYear =
				currentMonth < birthday.getMonth() + 1
					? currentYear - birthday.getFullYear() - 1
					: currentYear - birthday.getFullYear();
			if (yearsSpanRef.current)
				yearsSpanRef.current.textContent = ageYear.toString();
			if (monthsSpanRef.current)
				monthsSpanRef.current.textContent = ageMonth.toString();
			if (daysSpanRef.current)
				daysSpanRef.current.textContent = ageDay.toString();
		}
	});

	const resetAge = () => {
		monthsSpanRef.current!.innerHTML = "--";
		daysSpanRef.current!.innerHTML = "--";
		yearsSpanRef.current!.innerHTML = "--";
	};

	const handleError = (
		day: boolean,
		month: boolean,
		year: boolean,
		tense: boolean
	) => {
		if (!month) {
			monthLabelRef.current?.classList.add(styles["error__label"]);
			monthInputRef.current?.classList.add(styles["error__input"]);
			monthMessageRef.current?.classList.add(styles["display"]);
			resetAge();
		}
		if (!day) {
			dayLabelRef.current?.classList.add(styles["error__label"]);
			dayInputRef.current?.classList.add(styles["error__input"]);
			dayMessageRef.current?.classList.add(styles["display"]);
			resetAge();

		}
		if (!year) {
			yearLabelRef.current?.classList.add(styles["error__label"]);
			yearInputRef.current?.classList.add(styles["error__input"]);
			yearMessageRef.current?.classList.add(styles["display"]);
			yearMessageRef.current!.innerHTML = "Must be a valid year";
			resetAge();

		}
		if (!tense) {
			monthLabelRef.current?.classList.add(styles["error__label"]);
			monthInputRef.current?.classList.add(styles["error__input"]);
			dayLabelRef.current?.classList.add(styles["error__label"]);
			dayInputRef.current?.classList.add(styles["error__input"]);
			yearLabelRef.current?.classList.add(styles["error__label"]);
			yearInputRef.current?.classList.add(styles["error__input"]);
			yearMessageRef.current!.innerHTML = "Must not be in the future";
			resetAge();
		}
	};

	const resetError = () => {
		monthLabelRef.current?.classList.remove(styles["error__label"]);
		monthInputRef.current?.classList.remove(styles["error__input"]);
		monthMessageRef.current?.classList.remove(styles["display"]);
		dayLabelRef.current?.classList.remove(styles["error__label"]);
		dayInputRef.current?.classList.remove(styles["error__input"]);
		dayMessageRef.current?.classList.remove(styles["display"]);
		yearLabelRef.current?.classList.remove(styles["error__label"]);
		yearInputRef.current?.classList.remove(styles["error__input"]);
		yearMessageRef.current!.innerHTML = "";
	};

	return (
		<div className={styles.container}>
			<form
				className={styles.birthdayDiv}
				id="birthday"
				onSubmit={handleSubmit}>
				<div className={styles.birthdayDiv__monthDiv}>
					<label
						ref={monthLabelRef}
						htmlFor="birthMonth"
						className={styles.birthdayDiv__monthDiv__label}>
						MONTH
					</label>
					<input
						ref={monthInputRef}
						required
						type="number"
						name="birthMonth"
						id="birthMonth"
						className={styles.birthdayDiv__monthDiv__input}
					/>
					<p
						ref={monthMessageRef}
						className={styles.birthdayDiv__monthDiv__errorMessage}>
						Must be a valid month
					</p>
				</div>
				<div className={styles.birthdayDiv__dayDiv}>
					<label
						ref={dayLabelRef}
						htmlFor="birthDay"
						className={styles.birthdayDiv__dayDiv__label}>
						DAY
					</label>
					<input
						ref={dayInputRef}
						required
						type="number"
						name="birthDay"
						id="birthDay"
						className={styles.birthdayDiv__dayDiv__input}
					/>
					<p
						ref={dayMessageRef}
						className={styles.birthdayDiv__dayDiv__errorMessage}>
						Must be a valid day
					</p>
				</div>
				<div className={styles.birthdayDiv__yearDiv}>
					<label
						ref={yearLabelRef}
						htmlFor="birthYear"
						className={styles.birthdayDiv__yearDiv__label}>
						YEAR
					</label>
					<input
						ref={yearInputRef}
						required
						type="number"
						name="birthYear"
						id="birthYear"
						className={styles.birthdayDiv__yearDiv__input}
					/>
					<p
						ref={yearMessageRef}
						className={
							styles.birthdayDiv__yearDiv__errorMessage
						}></p>
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
