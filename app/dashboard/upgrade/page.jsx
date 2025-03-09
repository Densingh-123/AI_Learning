import React from "react";

const Pricing = () => {
  return (
    <div className="pricing-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source
          src="https://cdn.pixabay.com/video/2021/01/29/63328-506377472_large.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Main Content */}
      <header className="pricing-header">
        <h1>Choose Your Learning Plan</h1>
        <p>Unlock premium features to accelerate your learning journey.</p>
      </header>

      <section className="pricing-tiers">
        {/* Free Plan */}
        <div className="tier-card">
          <h2>Free Plan</h2>
          <p className="price">Free</p>
          <ul>
            <li>Access to basic courses</li>
            <li>Limited practice exercises</li>
            <li>Community support</li>
          </ul>
          <button className="cta-button">Start Learning</button>
        </div>

        {/* Basic Plan */}
        <div className="tier-card">
          <h2>Basic Plan</h2>
          <p className="price">$9.99/month</p>
          <ul>
            <li>Access to all courses</li>
            <li>Unlimited practice exercises</li>
            <li>Downloadable resources</li>
            <li>Email support</li>
          </ul>
          <button className="cta-button">Subscribe</button>
        </div>

        {/* Pro Plan */}
        <div className="tier-card">
          <h2>Pro Plan</h2>
          <p className="price">$19.99/month</p>
          <ul>
            <li>All Basic Plan features</li>
            <li>Personalized learning paths</li>
            <li>Access to live workshops</li>
            <li>Certificates of completion</li>
          </ul>
          <button className="cta-button">Subscribe</button>
        </div>

        {/* Elite Plan */}
        <div className="tier-card">
          <h2>Elite Plan</h2>
          <p className="price">$29.99/month</p>
          <ul>
            <li>All Pro Plan features</li>
            <li>One-on-one mentorship</li>
            <li>Exclusive content</li>
            <li>Priority support</li>
          </ul>
          <button className="cta-button">Subscribe</button>
        </div>
      </section>

      {/* Pricing Policies */}
      {/* <section className="pricing-policies">
        <h2>Pricing Policies</h2>
        <div className="policy">
          <h3>Free Trials</h3>
          <p>Start with a 7-day free trial on our premium plans to explore all features.</p>
        </div>
        <div className="policy">
          <h3>Discounts & Promotions</h3>
          <p>Enjoy seasonal discounts and special offers for students and educators.</p>
        </div>
        <div className="policy">
          <h3>Refund Policy</h3>
          <p>If you're not satisfied, request a full refund within 14 days of purchase.</p>
        </div>
        <div className="policy">
          <h3>Tax Compliance</h3>
          <p>All prices include applicable taxes. No hidden fees.</p>
        </div>
      </section> */}

      {/* Inline CSS */}
      <style>
        {`
          /* Set full-screen background video */
          .background-video {
            position: fixed;
            top: 0;
            right: 0;
            width: 85vw;
            height: 100vh;
            object-fit: cover;
            z-index: -1;
          }

          /* Pricing container */
          .pricing-container {
            padding: 20px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: transparent;
            position: relative;
            z-index: 1;
          }

          /* Header */
          .pricing-header {
            font-size: 2.5rem;
            margin-bottom: 30px;
            color: #ffffff;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 1;
          }

          .pricing-header p {
            font-size: 1.2rem;
            color: #080808FF;
            margin-top: 10px;
          }

          /* Grid layout for pricing tiers */
          .pricing-tiers {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Responsive grid */
            gap: 20px;
            justify-items: center;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
          }

          /* Pricing tier cards */
          .tier-card {
            width: 100%;
            max-width: 300px;
            background: rgba(0, 0, 0, 0.5); /* Lighter glassmorphism */
            backdrop-filter: blur(10px);
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }

          .tier-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 40px rgba(31, 38, 135, 0.5);
          }

          .tier-card h2 {
            font-size: 1.8rem;
            color: #ffffff;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            margin-bottom: 10px;
          }

          .tier-card .price {
            font-size: 2rem;
            color: #ff9800;
            margin: 10px 0;
            font-weight: bold;
          }

          .tier-card ul {
            list-style: none;
            padding: 0;
            margin: 20px 0;
            text-align: left;
            width: 100%;
          }

          .tier-card ul li {
            color: #ffffff;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            margin: 10px 0;
            font-size: 1rem;
          }

          .cta-button {
            background-color: #ff9800;
            color: #ffffff;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s ease;
            margin-top: auto;
          }

          .cta-button:hover {
            background-color: #e68900;
          }

          /* Pricing policies */
          .pricing-policies {
            margin-top: 40px;
            padding: 20px;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            color: #ffffff;
            width: 100%;
            max-width: 800px;
          }

          .pricing-policies h2 {
            font-size: 2rem;
            margin-bottom: 20px;
            color: #ff9800;
          }

          .policy {
            margin-bottom: 20px;
          }

          .policy h3 {
            font-size: 1.5rem;
            color: #ff9800;
            margin-bottom: 10px;
          }

          .policy p {
            font-size: 1rem;
            color: #e0e0e0;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .pricing-header {
              font-size: 2rem;
            }

            .pricing-header p {
              font-size: 1rem;
            }

            .tier-card {
              max-width: 100%;
            }

            .pricing-policies {
              padding: 15px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Pricing;