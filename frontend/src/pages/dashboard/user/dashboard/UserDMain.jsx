import React from 'react';
import { Bar } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import Loading from '../../../../components/Loading';
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi';
import UserStats from './UserStats';


import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
ChartJS.register(CategoryScale , LinearScale , BarElement , Title , Tooltip , Legend)
    


const UserDMain = () => {
    const {user} = useSelector((state)=> state.auth);
    const {data:UserData , isLoading , error} = useGetUserStatsQuery(user?.email);
    
    if(isLoading) return <Loading/>
    if(error) return <div>Failed to fetch data</div>
    const stats = UserData?.data || {}
    const {totalPayments ,totalPurchasedProducts , totalReviews} = stats ;

    const data = {

        labels:['Total Payment' , 'Total Reviews' , 'Total Purchased Products'],
        datasets: [
            {
                label:'User Stats',
                data:[totalPayments , totalReviews , totalPurchasedProducts] ,
                backgroundColor:[
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',

                ],
                borderColor: [
                    'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
                ],
                borderWidth:1
            }
        ]
    }

    const options = {
        responsive : true,
        plugins:{
            Legend:{
                position: 'top'
            },
            Tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        if (tooltipItem.label === 'Total Payments') {
                            return `Total Payments: $${tooltipItem.raw.toFixed(2)}`;
                        }
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
            }
        }
    }
    }

  return (
    <div className='p-6'>
        <div>
        <h1 className='text-2xl font-semibold mb-4'>User Dashboard</h1>
        <p className='text-gray-500 '>Hi, {user?.username}! Welcome to your user dashboard</p>

        </div>

        <UserStats stats={stats}/>


        <div className='mb-6'>

            <Bar data={data} options={options}/>

        </div>


    </div>
    
  )
}

export default UserDMain