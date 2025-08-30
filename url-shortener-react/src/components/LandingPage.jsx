import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";

let desc =
  "Generate short, memorable links with ease using Linklytics’s intuitive interface. Share URLs effortlessly across platforms. Optimize your sharing strategy with Linklytics. Track clicks and manage your links seamlessly to enhance your online presence. Generate short, memorable links with ease using Linklytics’s intuitive interface. Share URLs effortlessly across platforms.";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  console.log("TOKEN FROM LANDING PAGE: " + token);

  const dashBoardNavigateHandler = () => {
  };
  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        <div className="landing-page-text">
          <motion.h1
            initial={{ opacity: 0, y: -80 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="main-heading"
          >
            Linklytics Simplifies URL Shortening For Efficient Sharing.
          </motion.h1>
          <p className="sub-text">
            Linklytics streamlines the process of URL shortening, making sharing
            links effortless and efficient. With its user-friendly interface,
            Linklytics allows you to generate concise, easy-to-share URLs in
            seconds. Simplify your sharing experience with Linklytics today.
          </p>
          <div className="button-group">
            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={dashBoardNavigateHandler}
              className="manage-links-button"
            >
              Manage Links
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={dashBoardNavigateHandler}
              className="create-link-button"
            >
              Create Short Link
            </motion.button>
          </div>
        </div>
        <div className="image-container">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="landing-image"
            src="/images/img2.png"
            alt=""
          />
        </div>
      </div>
      <div className="trust-section">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="trust-text"
        >
          Trusted by individuals and teams at the world best companies{" "}
        </motion.p>
        <div className="card-grid">
          <Card
            title="Simple URL Shortening"
            desc="Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle."
          />
          <Card
            title="Powerful Analytics"
            desc="Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies."
          />
          <Card
            title="Enhanced Security"
            desc="Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure."
          />
          <Card
            title="Fast and Reliable"
            desc="Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users."
          />
        </div>
      </div>
      <style>
        {`
        .landing-page-container {
          min-height: calc(100vh - 64px);
          padding: 1.5rem 1rem;
          background-color: #f8fafc;
        }
        .landing-page-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-top: 4rem;
          align-items: center;
        }
        .landing-page-text {
          flex: 1;
        }
        .main-heading {
          font-weight: bold;
          font-family: 'Roboto', sans-serif;
          color: #1e293b;
          font-size: 2rem;
          line-height: 2.5rem;
          max-width: 100%;
        }
        .sub-text {
          color: #475569;
          font-size: 0.875rem;
          margin: 1.25rem 0;
        }
        .button-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .manage-links-button {
          background: linear-gradient(to right, #3b82f6, #9333ea);
          width: 10rem;
          color: white;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          border: none;
          font-weight: 500;
        }
        .create-link-button {
          border: 1px solid #3364F7;
          width: 10rem;
          color: #3364F7;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          background: none;
          font-weight: 500;
        }
        .image-container {
          flex: 1;
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .landing-image {
          max-width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 0.375rem;
        }
        .trust-section {
          padding-top: 3rem;
        }
        .trust-text {
          color: #1e293b;
          font-family: 'Roboto', sans-serif;
          font-weight: bold;
          font-size: 1.5rem;
          text-align: center;
          max-width: 800px;
          margin: auto;
        }
        .card-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(1, 1fr);
          margin-top: 2rem;
        }
        @media (min-width: 640px) {
          .landing-page-container {
            padding: 1.5rem 2rem;
          }
          .landing-page-content {
            flex-direction: row;
            padding-top: 1.25rem;
            gap: 2.5rem;
          }
          .main-heading {
            font-size: 3rem;
            line-height: 3.5rem;
          }
          .card-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .landing-page-container {
            padding: 1.5rem 3rem;
          }
          .card-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1280px) {
          .card-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
