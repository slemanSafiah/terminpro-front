import React from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Grid from "@mui/material/Grid";

let Institutions = [
  {
    name: "salon 1",
    image: "assets/home/salons/salon1.jpg",
    desc: "some info about salon",
  },
  {
    name: "salon 2",
    image: "assets/home/salons/salon2.jpg",
    desc: "some info about salon",
  },
  {
    name: "salon 3",
    image: "assets/home/salons/salon3.jpg",
    desc: "some info about salon",
  },
  {
    name: "salon 4",
    image: "assets/home/salons/salon4.jpg",
    desc: "some info about salon",
  },
  {
    name: "salon 5",
    image: "assets/home/salons/salon5.jpg",
    desc: "some info about salon",
  },
];

export default function Section3() {
  return (
    <div className="home-section3" id="learn-more">
      <div className="home-section3-title">Some Of Our Institutions</div>
      <div className="home-section3-grid">
        <Grid container spacing={4}>
          {Institutions.map((inst) => {
            return (
              <Grid item xs={6}>
                <InstitutionCard
                  image={inst.image}
                  name={inst.name}
                  desc={inst.desc}
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
      <img className="institution-image-card" src={image} alt={name} />
      <div className="institution-footer-card">
        <div className="institution-footer-card-title">{name}</div>
        <div className="institution-footer-card-sub-title">{desc}</div>
      </div>
    </div>
  );
}
