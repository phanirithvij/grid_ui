/**\ @\jsx jsx */
// import { css, jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import logo from "../assets/selenium.png";
import "../css/common.css";
import styles from "./Home.module.css";
import React from "react";

export default function Home() {
	return (
		<section id="body">
			<div className="padding highlightable">
				<header className={styles.header}>
					<Link to="/home">
						<img src={logo} className={styles.inline} alt="icon"></img>&nbsp;
						Selenium Grid Hub v.3.141.59
					</Link>
				</header>
			</div>
			<div className="container">
				<p>Whoops! The URL specified routes to this help page.</p>
				<p>
					For more information about Selenium Grid Hub please see the{" "}
					<a href="http://docs.seleniumhq.org/docs/07_selenium_grid.jsp">
						docs
					</a>{" "}
					and/or visit the{" "}
					<a href="https://github.com/SeleniumHQ/selenium/wiki/Grid2">wiki</a>.
				</p>
				<p>
					Or perhaps you are looking for the Selenium Grid Hub{" "}
					<Link to="/nodes">console</Link>.
				</p>
				<p>Happy Testing!</p>
				<hr />
				<div>
					<footer>
						<small>
							Selenium is made possible through the efforts of our open source
							community, contributions from these{" "}
							<a href="https://github.com/SeleniumHQ/selenium/blob/master/AUTHORS">
								people
							</a>
							, and our{" "}
							<a href="http://www.seleniumhq.org/sponsors/">sponsors</a>.
						</small>
					</footer>
				</div>
			</div>
		</section>
	);
}
