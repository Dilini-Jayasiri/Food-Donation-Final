import React from 'react';
import About from './About';
import '../assets/partials/home.scss'
import Services from './Services';
import Contact from './Contact';




const Home = () =>{
    return(
        <div>
           <section id="home">
               <div className="container">
                   <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <h2 className="display-6 fw-bolder mb-4 text-center text-white">Donate Love With Poor Heart</h2>
                            <p className="lead text-center fs-4 mb-5 text-white">Our work makes a positive difference in the lives of Sri Lanka, with recipients of food and grocery relief reporting they feel less hungry, are able to focus and concentrate, are less stressed and more hopeful.

Foodbank not only plays a lead role in fighting hunger, but also a vitally important role in tackling Sri Lanka's billion food waste problem and helping the environment. </p>
                           
                        </div>
                   </div>
               </div>
               
           </section>
        <About/>
        <Services/>
        <Contact/>
       
        </div>
    );
}

export default Home;
