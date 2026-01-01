import React from "react";
import { supportTeam } from "./SupportTeamConstant";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SupportTeam = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 10000,
    fade: true,
    autoplay: true,
    autoplayspeed: 3000,
  };
  return (
    <section className="team-section mb-5" id="support">
      <h2 className="team-title">Meet Our Support Team</h2>
      <Slider {...settings}>
        {supportTeam.map((member) => {
          <div key={member.name} className="team-member">
            <img src={member.img} alt={member.name} />
            <div>
              <span className="member-name">{member.name}</span>
              <br />
              <span className="member-role">{member.role}</span>
            </div>
          </div>;
        })}
      </Slider>
    </section>
  );
};

export default SupportTeam;
