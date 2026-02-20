import React from 'react'
import './Home.css'
import {RadialBarChart, RadialBar, Legend, Tooltip} from 'recharts';
import { radialBarChartDATA } from '../../dataSource';
import GirlIcon from '@mui/icons-material/Girl';
import BoyIcon from '@mui/icons-material/Man';

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
                <div className="radial">
                    <div className="cardTop">
                        <h2>Students</h2>
                        <span>. . .</span>
                    </div>
                    <RadialBarChart 
                        width={300}
                        height={300}
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
                <div className="chart2">
                    {/* <Card/> */}
                </div>
            </div>
        </div>
        
        <div className="rightPart">
            right
        </div>
    </div>
  )
}

export default DashboardHome