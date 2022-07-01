import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Empty } from "antd";

export default function Section3() {
  const [institutions, settInstitution] = React.useState([]);
  const mediaQuery = window.matchMedia("(max-width: 600px)");

  useEffect(() => {
    axios({
      url: "https://terminpro2022.herokuapp.com/api/user/institutions",
      method: "GET",
    }).then((res) => {
      settInstitution(res.data);
    });
  }, []);

  return (
    <div className="home-section3" id="learn-more">
      <div className="home-section3-title">Some Of Our Institutions</div>
      <div className="home-section3-grid">
        <Grid container spacing={4}>
          {institutions.map((inst) => {
            return (
              <Grid item xs={mediaQuery.matches ? 12 : 6}>
                <InstitutionCard
                  image={inst.img}
                  name={inst.institutionName}
                  desc={inst.description}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

function InstitutionCard({ name, image, desc }) {
  return (
    <div className="institution-card">
      {image ? (
        <img className="institution-image-card" src={image} alt={name} />
      ) : (
        <div
          style={{
            width: "100%",
            height: "350px",
          }}
        >
          <Empty
            style={{
              fontFamily: "Poppins",
              marginTop: "20%",
            }}
            description=""
          />
        </div>
      )}
      <div className="institution-footer-card">
        <div className="institution-footer-card-title">{name}</div>
        <div className="institution-footer-card-sub-title">{desc}</div>
      </div>
    </div>
  );
}
