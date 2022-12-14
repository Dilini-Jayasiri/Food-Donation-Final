import '../assets/about.gif';
import React from 'react'
import '../assets/about.gif';

 const About = () => {
  return (
    <div>
        <section id="about">
            <div className="container my-2 py-2">
                <div className="row">
                    <div className="col-md-6">
                        <img src={require("../assets/donation.jpg")} alt="About" className="w-75 mt-5"/>
                    </div>
                    <div className="col-md-6">
                        <h3 className="fs-5 mb-0">About Us</h3>
                        <h1 className="display-6 mb-2">Who <b> We</b> Are</h1>
                       <hr className="w-50"/>
                    <p className="lead mb-4">We believe everyone should have access to good quality food. We’re here for the everyday Sri Lankans who are going without.Our food and grocery rescue operations last year save million kilograms of CO2 emissions.

This means the impact of Foodbank’s work in the community is worth annually.

Despite our very best efforts, we rely on the food and grocery sector as well as individuals, corporations, community groups and all levels of government to join us in the fight against hunger. Find out how you can support us.</p>

                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default About;