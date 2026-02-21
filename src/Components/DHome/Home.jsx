import React from 'react'
import './Home.css'
import {RadialBarChart, RadialBar, Legend, Tooltip} from 'recharts';
import { radialBarChartDATA } from '../../dataSource';
import GirlIcon from '@mui/icons-material/Girl';
import BoyIcon from '@mui/icons-material/Man';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { BarChart } from '@mui/x-charts/BarChart';


const Card = ({date = '2026/15', amount='567', type='Student'}) =>
    <>
        <div className="cardContainer">
            <div className="cardTop">
                <span>{date}</span>
                <span>. . .</span>
            </div>
            <h2>{amount}</h2>
            <h3>{type}</h3>
        </div>
    </>
const MyCalendar = ()=>
    <>
        <div className="componentWrapper">
            {/* <div className="cardTop">
                <h2>Students</h2>
                <span>. . .</span>
            </div> */}
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DateCalendar 
                    sx={{ 
                        "& .MuiPickersDay-root": { 
                            color: "#fff", 
                        
                        },  "& .MuiButtonBase-root": {   
                            color:"#fffc", 
                        },
                        "&.MuiDateCalendar-root":{
                            color:"white",
                            width:350,
                            padding:1,
                            margin:0,
                            Height:320,
                            borderColor:"white"
                        }, "& .MuiTypography-root": {   
                            color:"#fff",
                            fontWeight:"bolder"
                        },
                        "& .MuiPickersDay-root.Mui-selected": { 
                            color: "#fff", 
                            backgroundColor: "#04aa12", // filles
                        }, "& .MuiPickersDay-root:hover": { 
                            backgroundColor: "#c2f8bb", 
                            color:"#04aa12"
                        }, 
                         "& .MuiPickersDay-root.Mui-disabled": { 
                            color: "#dddddd",  
                         }, 
                         "& .MuiPickersCalendarHeader-label": { 
                            color: "#ffffff",// garçons 
                            fontWeight: "bold", 
                        }, 
                    }}
                />
            </LocalizationProvider>
        </div>
    </>
const MyBarChart =() =>
<>
    <div className="radial">
        <div className="cardTop">
                <h2>Students</h2>
                <span>. . .</span>
            </div>
            <BarChart
                xAxis={[
                    {
                    id: 'barCategories',
                    data: ['Décembre', 'Janvier', 'Février'],
                    height: 29,
                    },
                ]}
                series={[
                    {
                    data: [67, 50, 83],
                    },
                ]}
                height={300}
            />

    </div>
    
 
</>
const MyRadialChart = () =>
    <>
        <div className="radial">
            <div className="cardTop">
                <h2>Students</h2>
                <span>. . .</span>
            </div>
            <RadialBarChart 
                // width={300}
                // height={300}
                data={radialBarChartDATA}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={120}
                style={{outline:"none"}}
            >
                <RadialBar 
                    minAngle={15} 
                    dataKey="x"
                    label={{position:"insideStart"}}
                    background
                    style={{outline:"none"}}
                />
                <Legend/>
                <Tooltip/>
            </RadialBarChart>
                <div className='iconWrapper'>
                <GirlIcon className="girlIcon"   />
                <BoyIcon className="boyIcon" />
            </div>
        </div>
    </>
const MyEvents = ({title ='Science Fair', description='Traditionnal Festival For All Students', date="2026-01-25"}) =>
    <>
        <div className="event">            
            <div className="titlenDate">
                <h2 className=''>{title}</h2>
                <span>{date}</span>
            </div>
            
            <p>{description}</p>
        </div>
    </>
const DashboardHome = () => {
  return (
    <div className='dHomeContainer'>
        <div className="leftPart">
            <div className="line1">
                <Card />
                <Card date='2026/02' amount='1 034' type= 'Parents'/>
                <Card date='2026/01' amount='30' type= 'Teachers'/>
                <Card date='2026/03' amount='11' type= 'Staff'/>
            </div>
            <div className="line2">
                <MyRadialChart/> 
                <MyBarChart/>
               
            </div>
        </div>
        <div className="rightPart">
            <div>
                <MyCalendar/>
            </div>
            <div className="componentWrapper eventWrapper">
                <div className="cardTop">
                    <h2>events</h2>
                    <span>. . .</span>
                </div>
                <MyEvents/>
                <MyEvents title='Agriculture Fest' description='University Day and Haitian Work Celebration'/>
            </div>
        </div>
    </div>
  )
}

export default DashboardHome