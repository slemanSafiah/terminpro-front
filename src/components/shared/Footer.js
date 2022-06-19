import { Button } from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Google,
  Apple
} from "@mui/icons-material";

import "./footer.css";

const content = [
  ["About Terminpro", "Careers at Terminpro", "Customer Support", "Blog"],
  ["For business", "For Partners", "Pricing", "Support For Partners"],
  ["Legal", "Booking terms", "Privacy policy", "Website terms"]
];
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-sec1">
          <div item className="footer-sec1-title">
            TerminPro
          </div>
          <div item className="footer-sec1-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis
            feugiat porttitor facilisi.
          </div>
          <div item className="footer-sec1-icons">
            <Facebook className="icon" />
            <Twitter className="icon" />
            <Instagram className="icon" />
            <YouTube className="icon" />
          </div>
        </div>

        <div className="footer-sec2">
          {content.map((type) => {
            return (
              <div className="sentence-group">
                {type.map((item) => {
                  return <Sentence title={item} />;
                })}
              </div>
            );
          })}
        </div>

        <div className="footer-sec3">
          <Button variant="contained" color="secondary" className="btn1-google">
            Download <Google className="icon" />
          </Button>
          <Button variant="outlined" color="secondary" className="btn2-apple">
            Download <Apple className="icon" />
          </Button>
        </div>
      </div>
    </div>
  );
}

const Sentence = ({ title }) => {
  return <div className="sentence-item">{title}</div>;
};
