import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <h1>Bistro</h1>
                <p>Thank you for dining with us — whether in person or online, it’s always our pleasure to serve you. Great food, warm hospitality, and memorable moments await you every time. See you soon!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Contact Us</h2>
                <ul>
                    <li>+91 8723456776</li>
                    <li>bistrorestaurant@gmail.com</li>
                </ul>
            </div>
           
        </div>
    </div>
  )
}

export default Footer