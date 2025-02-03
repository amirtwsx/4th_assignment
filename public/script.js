let myChartInstance = null;

async function fetchData() {
    const field = document.getElementById("field").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    console.log('Selected Field:', field);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    try {
        const response = await fetch(`http://localhost:3000/api/measurements?field=${field}&start_date=${startDate}&end_date=${endDate}`);
        const data = await response.json();

        const labels = data.map(item => {
            const date = new Date(item.Date);
            if (isNaN(date)) {
                console.error("Invalid Date format:", item);
                return "Invalid Date";
            }
            return date.toISOString().split("T")[0];
        });
        console.log('Labels:', labels);
        
        const values = data.map(item => item[field]);

        if (myChartInstance) {
            myChartInstance.destroy();
        }

        const ctx = document.getElementById("myChart").getContext("2d");

        myChartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels,
                datasets: [{
                    label: field,
                    data: values,
                    borderColor: "blue",
                    fill: false
                }]
            }
        });

        const metricsResponse = await fetch(`http://localhost:3000/api/measurements/metrics/?field=${field}`);
        const metrics = await metricsResponse.json();

        document.getElementById("avg").innerText = metrics.avg;
        document.getElementById("min").innerText = metrics.min;
        document.getElementById("max").innerText = metrics.max;
        document.getElementById("stdDev").innerText = metrics.stdDev;
        console.error(metrics.avg);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
