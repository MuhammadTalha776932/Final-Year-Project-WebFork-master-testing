import React from "react";
import "../styles/Team.css";
import Fasih from "../images/fasih.png";
import Ahmad from "../images/ahmad.PNG";
import Talha from "../images/talha.PNG";

const Team = () => {
  return (
    <>
      <section class="section-team">
        <div class="container">
          {/* Start Header Section */}
          <div class="row justify-content-center text-center">
            <div class="col-md-8 col-lg-6">
              <div class="header-section">
                <h3 class="small-title">WebFork Experts</h3>
                <h2 class="title">Let's meet with our team members</h2>
              </div>
            </div>
          </div>
          {/* / End Header Section */}
          <div class="row">
            {/* Start Single Person */}
            <div class="col-sm-6 col-lg-4 col-xl-4">
              <div class="single-person">
                <div class="person-image">
                  <img src={Fasih} alt="" className="team-image" />
                  <span class="icon">
                    <i class="fab fa-react"></i>
                  </span>
                </div>
                <div class="person-info">
                  <h3 class="full-name">Fasih ul Hassan</h3>
                  <span class="speciality">Front-End Developer</span>
                </div>
              </div>
            </div>
            {/* / End Single Person
           Start Single Person */}
            <div class="col-sm-6 col-lg-4 col-xl-4">
              <div class="single-person">
                <div class="person-image">
                  <img src={Ahmad} alt="" className="team-image" />
                  <span class="icon">
                    <i class="fab fa-adobe"></i>
                  </span>
                </div>
                <div class="person-info">
                  <h3 class="full-name">Ahmad Raza</h3>
                  <span class="speciality">Graphic Designer</span>
                </div>
              </div>
            </div>
            {/* / End Single Person
           Start Single Person */}
            <div class="col-sm-6 col-lg-4 col-xl-4">
              <div class="single-person">
                <div class="person-image">
                  <img src={Talha} alt="" className="team-image" />
                  <span class="icon">
                    <i class="fab fa-node"></i>
                  </span>
                </div>
                <div class="person-info">
                  <h3 class="full-name">Muhammad Talha</h3>
                  <span class="speciality">Back-End Developer</span>
                </div>
              </div>
            </div>
            {/* End Single Person */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
