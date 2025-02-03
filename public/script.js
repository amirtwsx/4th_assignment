async function fetchData() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const field = document.getElementById('field').value;

    const response = await fetch(`/api/measurements?start_date=${startDate}&end_date=${endDate}&field=${field}`);
    const data = await response.json();

    const timestamps = data.map(item => item.timestamp);
    const values = data.map(item => item[field]);

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [{
          label: field.charAt(0).toUpperCase() + field.slice(1),
          data: values,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        }],
      },
      options: {
        scales: {
          x: { type: 'time', time: { unit: 'day' } },
          y: { beginAtZero: true },
        },
      },
    });

    const metricsResponse = await fetch(`/api/measurements/metrics?field=${field}`);
    const metrics = await metricsResponse.json();
    document.getElementById('avg').innerText = metrics.avg;
    document.getElementById('min').innerText = metrics.min;
    document.getElementById('max').innerText = metrics.max;
    document.getElementById('stdDev').innerText = metrics.stdDev;
  }