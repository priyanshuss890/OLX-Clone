import "./FooterStyles.css";
// import owasp from '../../assets/13.jpg';
import { Link } from "react-router-dom";
import "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
      <div>
        <h1>OLX Clone</h1>
        <p>Best place to make profit!</p>
      </div>
      <div>
        <a href="https://github.com/priyanshuss890">
          <i className="fa-brands fa-square-github">

          </i>
        </a>
        <a href="">
        <i class="fa-brands fa-linkedin"></i>https://www.linkedin.com/in/priyanshu-saraswat-64a51b233/
        </a>
        <a href="https://stackoverflow.com/users/20746516/ayush">
        <i class="fa-brands fa-stack-overflow"></i>
        </a>
        <a href="https://twitter.com/AyushGu75343194">
        <i class="fa-brands fa-square-twitter"></i>
        </a>
      </div>
      </div>
      <div className="bottom">
       <div>
        <h4>Information</h4>
        <a href="/">Privacy Policy</a>
        <a href="mailto:ayushgupta3172@gmail.com">Contact Us</a>
       </div>
       <div>
        <h4>Created By</h4>
        <a href="https://ayushgupta03.netlify.app/">Ayush Gupta </a>
       </div>
      </div>
     <div className="copyright" >© 2023 OLX Clone. All rights reserved.</div>
    </div>
  );
};

export default Footer;
