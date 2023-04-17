import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper } from '@material-ui/core';

function DonationsByDistrict() {
  const [donations, setDonations] = useState([]);
  const [donationsIns, setDonationsIns] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const response = await axios.get('/donations-by-district-res');
      setDonations(response.data);
    };
    fetchDonations();
  }, []);

  useEffect(() => {
    const fetchDonations = async () => {
      const response = await axios.get('/donations-by-district-ins');
      setDonationsIns(response.data);
    };
    fetchDonations();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
    <div style={{ marginRight: '60px' }}>
     
      <h2>Reserved Donations By District</h2>
      <ol>
        {donations.map((donation) => (
          <li key={donation._id}>
            {donation._id}: {donation.count}
          </li>
        ))}
      </ol>
     </div>
     <div>
      <h2>Instant Donations By District</h2>
      <ol>
        {donationsIns.map((donation) => (
          <li key={donation._id}>
            {donation._id}: {donation.count}
          </li>
        ))}
      </ol>
   
    </div>
    </div>
  );
}

export default DonationsByDistrict;
