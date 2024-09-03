import React from 'react';

import "./Features.css";
import chatIcon from "../../assets/img/icon-chat.webp";
import moneyIcon from "../../assets/img/icon-money.webp";
import securityIcon from "../../assets/img/icon-security.webp";

const Features = () => {

    const featureItems = [
        {
            icon: chatIcon,
            title: "You are our #1 priority",
            text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        },

        {
            icon: moneyIcon,
            title: "More savings means higher rates",
            text: "The more you save with us, the higher your interest rate will be!"
        },

        {
            icon: securityIcon,
            title: "Security you can trust",
            text: "We use top of the line encryption to make sure your data and money is always safe."
        },
    ]

    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {featureItems.map((item, index) => (
                <div className="feature-item" key={`${item.title}-${index}`}>
                    <img src={item.icon} alt="Chat Icon" className="feature-icon" />
                    <h3 className="feature-item-title">{item.title}</h3>
                    <p>{item.text}</p>
                </div>
            ))}
        </section>
    );
};

export default Features;