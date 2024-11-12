import 'chart.js/auto';
import React from 'react';
import { Line, Pie } from "react-chartjs-2";

const AdminStatsChart = ({stats}) => {


    const pieData = {
        labels: ['Total Orders', 'Total Products', 'Total Reviews', 'All Users'],
        datasets: [
            {
                label: "Admin Stats",
                data: [
                    stats?.totalOrders,
                    stats?.totalProducts,
                    stats?.totalReviews,
                    stats?.totalUsers,
                ],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                ],
                borderColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                ],
                borderWidth: 1,
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                ]
            }
        ]

    }

    // line chart stats

    const data = new Array(12).fill(0);

    stats?.monthlyEarnings.forEach(entry => {
        data[entry.month - 1 ] = entry.earnings;
    })
    //console.log(data)

    const lineData = {
        labels: ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"],
        datasets: [
            {
                label: 'Monthly Earnings',
                data,
                fill: false,
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                tension: 0.1
            }
        ] 
    }

    const options = {
        responsive: true ,
        maintainAspectRatio: false
    }

  return (
    <div className='mt-12 space-y-8'>
        <h2 className='text-xl font-semibold mb-4'> Admin Stats Overview</h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

            {/* Pie chart */}

            <div className='max-h-96 md:h-96 w-full'>
                <Pie data={pieData} options={options}/>
            </div>

            {/* Line Chart */}

            <div className='max-h-96 md:h-96 w-full'>
            <Line data={lineData} options={options}/>
            
            </div>

        </div>

    </div>
  )
}

export default AdminStatsChart