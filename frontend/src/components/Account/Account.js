import React from 'react';

import "./Account.css";

const Account = () => {
    const detailsAccount = [
        {
            title: "Argent Bank Checking (x8349)",
            amount: "$2,082.79",
            description: "Available Balance",
        },
        {
            title: "Argent Bank Savings (x6712)",
            amount: "$10,928.42",
            description: "Available Balance",
        },
        {
            title: "Argent Bank Credit Card (x8349)",
            amount: "$184.30",
            description: "Current Balance",
        }
    ]

    return (
        <>
            <h2 className="sr-only">Accounts</h2>
            {detailsAccount.map((item, index) => (
                <section className="account" key={`${item.title}-${index}`}>
                    <div className="account-content-wrapper">
                        <h3 className="account-title">{item.title}</h3>
                        <p className="account-amount">{item.amount}</p>
                        <p className="account-amount-description">{item.description}</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            ))}
        </>
    );
};

export default Account;