import axios from 'axios'

export default {
    getMarketPrice,
    btcToUsd,
    formatNumber,
    getConfirmedTransactions
}

async function btcToUsd(){
    var rate = JSON.parse(localStorage.getItem('btcToUsd'))   
    if(!rate){
        try{
            rate = await axios.get(`https://blockchain.info/ticker`)
            localStorage.setItem('btcToUsd', JSON.stringify(rate.data.USD.last))
            return rate.data.USD.last;
    } catch(err){
            console.log('Err: bitcoinService.js'+err);
            throw (err)
        }
    }
    return rate;    
}
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

async function getConfirmedTransactions(){
var transections = JSON.parse(localStorage.getItem('transections'))   
if(!transections){
    try{
        transections = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=12months&format=json&cors=true`)
        const transectionsY = transections.data.values.map(price=>price.y)
        localStorage.setItem('transections', JSON.stringify(transectionsY))
        return transectionsY;  
    } catch(err) {
            console.log('Err: bitcoinService.js '+err);
            throw (err)
        }  
    }
    return transections;    
}


async function getMarketPrice(){
    var marketPrice = JSON.parse(localStorage.getItem('marketPrice'))   
    if(!marketPrice){
        try{
            marketPrice = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true`)
            const marketPriceY = marketPrice.data.values.map(price =>price.y)
            localStorage.setItem('marketPrice', JSON.stringify(marketPriceY))
        return marketPriceY;
    } catch(err) {
            console.log('Err: bitcoinService.js '+err);
            throw (err)
        }  
    }
    return marketPrice; 
    
    
}
// async function getRate(coins){
//     var bitCoinsRate = JSON.parse(localStorage.getItem('chart'))   
//     if(!bitCoinsRate){
//         try{
//         bitCoinsRate = await axios.get(`https://blockchain.info/tobtc?currency=${coins}&value=1`)
//         localStorage.setItem('chart', JSON.stringify(bitCoinsRate))
//         } catch(err) {
//             console.log('Err: bitcoinService.js'+err);
//         }
//     }
//     return bitCoinsRate.data;    
// }