import Image from "next/image";
import styles from "./page.module.css";
import arrow from "../public/assets/images/icon-arrow.svg";

export default function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.birthdayDiv}>
				<div className={styles.birthdayDiv__monthDiv}>
					<label htmlFor="month" className={styles.birthdayDiv__monthDiv__label}>MONTH</label>
					<input type="text" name="month" id="month" className={styles.birthdayDiv__monthDiv__input}/>
					<p className={styles.birthdayDiv__monthDiv__errorMessage}>Must be a valid month</p>
				</div>
				<div className={styles.birthdayDiv__dayDiv}>
					<label htmlFor="" className={styles.birthdayDiv__dayDiv__label}>DAY</label>
					<input type="text" className={styles.birthdayDiv__dayDiv__input}/>
					<p className={styles.birthdayDiv__dayDiv__errorMessage}>Must be a valid day</p>
				</div>
				<div className={styles.birthdayDiv__yearDiv}>
					<label htmlFor="" className={styles.birthdayDiv__yearDiv__label}>YEAR</label>
					<input type="text" className={styles.birthdayDiv__yearDiv__input}/>
					<p className={styles.birthdayDiv__yearDiv__errorMessage}>Must be a valid year</p>
				</div>
			</div>
			<div className={styles.buttonDiv}>
				<Image src={arrow} alt="Calculate button" className={styles.buttonDiv__image} />
			</div>
			<div className={styles.resultDiv}>
				<p className={styles.resultDiv__years}>
					<span className={styles.resultDiv__years__number}>38</span> years
				</p>
				<p className={styles.resultDiv__months}>
					<span className={styles.resultDiv__months__number}>3</span> months
				</p>
				<p className={styles.resultDiv__days}>
					<span className={styles.resultDiv__days__number}>26</span> days
				</p>
			</div>
		</div>
	);
}
