import React from "react";

export default function Section1() {
  return (
    <div className="home-section1">
      <img
        className="home-section1-background"
        src="assets/home/main.png"
        alt="home page"
      />
      <div className="home-section1-content">
        <div className="home-section1-title">TerminPro</div>
        <div className="home-section1-sub-title">
          let us help you with your appointment
        </div>
        <div className="home-section1-buttons">
          <a href="/#learn-more">
            <div className="home-section1-button-1">Learn more </div>
          </a>
          <a href="/#discover">
            <div className="home-section1-button-2"> Discover </div>
          </a>
        </div>
      </div>
    </div>
  );
}
