

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}


async function main() {
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );

//   const response = await fetch('https://api.twelvedata.com/api_usage?apikey=df8ce6d4fd6a41d7b37384c5bf2e6d3c')

//   const result = await response.json();

  const { GME, MSFT, DIS, BNTX } = mockData;

  const stocks = [GME, MSFT, DIS, BNTX];

  stocks.forEach(stock => stock.values.reverse());

  // overtime
  new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.map(value => value.datetime),
        datasets: stocks.map( stock => ({
            label: stock.meta.symbol,
            data: stock.values.map(value => parseFloat(value.high)),
            backgroundColor:  getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
        }))
    }
})
       // Highest Stock Price 
   new Chart(highestPriceChartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: stocks.map(stock => stock.meta.symbol),
        datasets: [{
            label: 'highest',
            data: stocks.map(stock => (
                findHighest(stock.values)
            )),
            backgroundColor: stocks.map(stock => (
                getColor(stock.meta.symbol)
            )),
            borderColor: stocks.map(stock => (
                getColor(stock.meta.symbol)
            ))
        }]
    }
   });

     // Average Stock Price 
     new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Average',
                data: stocks.map(stock => (
                    calculateAverage(stock.values)
                )),
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                ))
            }]
        }
    });

}

    // "Calculating" The Highest 
    function findHighest(values) {
        let highest = 0;
        values.forEach(value => {
            if (parseFloat(value.high) > highest) {
                highest = value.high
            }
        })
        return highest
    }

    // "Calculating" The Average
    function calculateAverage(values) {
        let total = 0;
        values.forEach(value => {
            total += parseFloat(value.high)
        })
        return total / values.length
    }

main();
                                              
