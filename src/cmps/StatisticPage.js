import React, {Component} from 'react';
import { Sparklines,SparklinesBars, SparklinesLine, SparklinesSpots  } from 'react-sparklines';
import BitcoinService from '../services/BitcoinService'
import { Line } from 'react-chartjs-2';
export default class StatisticPage extends Component {
    state = {
         marketPrice : [],
         transectionsPrice : []
    }
    async componentDidMount(){
        try{
            let marketPrice = await BitcoinService.getMarketPrice()
            this.setState({marketPrice})
        } catch (err) {console.log(err)}
        try{
            let transectionsPrice = await BitcoinService.getConfirmedTransactions()
            this.setState({transectionsPrice})
        } catch (err) {console.log(err)}
    }
    render(){
    const data = {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12],
        datasets: [
            {
            label: 'Price',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 5,
            data: this.state.transectionsPrice
            }
        ]
        };
        const {marketPrice} = this.state
        return ( 
        <section className="statistic-page container">
            <h1>Market Trends 2020</h1>
            {(marketPrice)?<Sparklines data={marketPrice}>
                <SparklinesLine style={{ fill: "none" }} />
                <SparklinesSpots />
                <SparklinesBars style={{ fill: 'slategray', fillOpacity: ".5" }} />
            </Sparklines>: <h2>N/A</h2>}
            <hr className="user-name-line"/>
            <h2>Confirmed Transections/ Month</h2>
            <Line ref="chart" data={data} />
        </section>)
    }
}