// https://github.com/vercel/next.js/issues/11230#issuecomment-643595034
/** @jsx jsx */

import { jsx } from "@emotion/core";
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as TimesIcon } from "../../assets/icons/times.svg";
import selenium from "../../assets/selenium.svg";
import "../../css/icons.css";
import styles from "./NavBar.module.css";

export default function NavBar() {
	return (
		<React.Fragment>
			<nav id="sidebar">
				<div id="header-wrapper">
					<div id="header">
						<Link id="logo" to="/home">
							<img src={selenium} alt="logo" className={styles.iconDetails} />
							<div
								style={{
									marginLeft: "60px",
									marginTop: "5px",
								}}
							>
								<h4 className={styles.h4}>Selenium Grid</h4>
							</div>
						</Link>
					</div>

					<div className="searchbox">
						<label htmlFor="search-by">
							<SearchIcon className="icon-green" />
						</label>
						<input
							data-search-input=""
							id="search-by"
							type="search"
							placeholder="Search..."
							autoComplete="off"
						/>
						<span data-search-clear="">
							<TimesIcon className="icon-green" />
						</span>
					</div>
				</div>
				<div className="highlightable ps-container ps-theme-default ps-active-y">
					<ul className="topics">
						<li
							data-nav-id="/console"
							title="Getting started"
							className="dd-item"
						></li>
					</ul>
				</div>
			</nav>
		</React.Fragment>
	);
}
