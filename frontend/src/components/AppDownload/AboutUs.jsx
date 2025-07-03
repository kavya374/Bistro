import React from 'react';
import './AboutUs.css';


const AboutUs = () => {
  return (
    <div className="about-us" id='about'>
      <h1>About Bistro</h1>

      <section className="about-section">
        <div className="about-text">
          <p>
            At <strong>Bistro</strong>, we believe food is more than just nourishment — it's an experience meant to
            be shared, savored, and remembered. Nestled in the heart of the city, our restaurant was born from a
            simple idea: to create a cozy, welcoming space where great food brings people together.
          </p>
        </div>
        <img src='https://plus.unsplash.com/premium_photo-1670984940156-c7f833fe8397?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fHww' alt="Bistro interior" className="about-img" />
      </section>

      <section className="about-section reverse">
        <div className="about-text">
          <h2>Meet Our Chef</h2>
          <p>
            At the heart of Bistro’s kitchen is <strong>Chef Arjun Mehta</strong>, whose passion for cooking began in
            his grandmother’s kitchen. With over 15 years of experience in fine dining, Chef Arjun brings both
            expertise and heart to every dish. His philosophy is simple: cook with soul, season with love, and
            always respect the ingredients.
          </p>
        </div>
            <img src='https://img.freepik.com/free-photo/chef-cooking-kitchen-while-wearing-professional-attire_23-2151208326.jpg' alt="Chef Arjun Mehta" className="about-img" />
      </section>

      <section className="about-section">
        <div className="about-text">
          <h2>What Makes Us Special</h2>
          <ul>
            <li>Locally sourced, seasonal ingredients</li>
            <li>A menu that changes with the mood of the season</li>
            <li>Cozy ambience with a touch of elegance</li>
            <li>A team that treats every guest like family</li>
          </ul>
        </div>
        <img src='https://www.shutterstock.com/image-photo/top-view-diverse-group-dining-600nw-2529886947.jpg' alt="Dining experience" className="about-img" />
      </section>
    </div>
  );
};

export default AboutUs;
