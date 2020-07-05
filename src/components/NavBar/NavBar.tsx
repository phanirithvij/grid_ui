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
						<li data-nav-id="/console" title="Console" className="dd-item">
							<Link to="/console">Console</Link>
						</li>
						<li data-nav-id="/hub/" title="Hub" className="dd-item parent">
							<Link to="/hub">
								Hub
								<i className="fas fa-check read-icon"></i>
							</Link>

							<ul>
								<li
									data-nav-id="/grid/purposes_and_main_functionalities/"
									title="Purposes and main functionalities"
									className="dd-item "
								>
									<a href="https://www.selenium.dev/documentation/en/grid/purposes_and_main_functionalities/">
										Purposes and functionalities
										<i className="fas fa-check read-icon"></i>
									</a>
								</li>

								<li
									data-nav-id="/grid/when_to_use_grid/"
									title="When to use Grid"
									className="dd-item "
								>
									<a href="https://www.selenium.dev/documentation/en/grid/when_to_use_grid/">
										When to use Grid
										<i className="fas fa-check read-icon"></i>
									</a>
								</li>

								<li
									data-nav-id="/grid/grid_4/"
									title="Grid 4"
									className="dd-item"
								>
									<a href="https://www.selenium.dev/documentation/en/grid/grid_4/">
										Grid 4<i className="fas fa-check read-icon"></i>
									</a>

									<ul>
										<li
											data-nav-id="/grid/grid_4/components_of_a_grid/"
											title="Components"
											className="dd-item "
										>
											<a href="https://www.selenium.dev/documentation/en/grid/grid_4/components_of_a_grid/">
												Components
												<i className="fas fa-check read-icon"></i>
											</a>
										</li>

										<li
											data-nav-id="/grid/grid_4/setting_up_your_own_grid/"
											title="Setting up your own"
											className="dd-item "
										>
											<a href="https://www.selenium.dev/documentation/en/grid/grid_4/setting_up_your_own_grid/">
												Setting up your own
												<i className="fas fa-check read-icon"></i>
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>{" "}
					</ul>
				</div>
			</nav>
		</React.Fragment>
	);
}
