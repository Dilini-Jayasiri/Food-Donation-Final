import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useAuthContext } from '../../../../components/hoooks/useAuthContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieDonationType () {
  const [districts, setDistricts] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchResDonation = async () => {
      try {
        const response = await fetch('/donations-by-mealType', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDistricts(data);
        } else {
          console.log("Failed to fetch donations by district");
        }
      } catch (error) {
        console.log("Error fetching donations by district", error);
      }
    };

    if (user) {
      fetchResDonation();
    }
  }, [user]);

  const data = districts.map(district => ({
    name: district._id,
    value: district.count
  }));

  return (
    <Box 
      sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-evenly',
        flexWrap:'wrap'
      }}
    >
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Stack gap={2}>
        <Typography variant='h6'>Meal Type Summary</Typography>
        <Box sx={{ display:'flex', gap:3, flexWrap:'wrap' }}>
          {COLORS.map((color, i) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Box sx={{ width: 20, height: 20, background: color }} />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {data[i]?.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
