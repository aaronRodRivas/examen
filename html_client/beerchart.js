const beerSize = document.getElementById("beerSize");
const buttons = document.querySelectorAll("button");
const divs = document.querySelectorAll("div");

buttons[0].addEventListener("click", async () => {
  if (beerSize.value.length === 0) {
    alert("Add a beer size!");
    return;
  } 
  try {
    divs[0].innerText = "loading...";
    const response = await fetch("http://localhost:3000/api/v1/apirandom/beers/" + beerSize.value);
    const result = await response.json();
    const alcoholValues = {"<4%" : 0, "4-7%" : 0, ">7%" : 0}
    result.beersArray.forEach(beer => {
      if (beer.alcohol < "4") alcoholValues["<4%"]++
      else if (beer.alcohol <= "7") alcoholValues["4-7%"]++
      else alcoholValues[">7%"]++
    });
    const ctx = document.getElementById('beerChart');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(alcoholValues),
        datasets: [{
          label: 'Beer Alcohol types',
          data: Object.values(alcoholValues),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
        }]
      }
    });
    divs[0].innerText = "";
    // ctx.remove();
  } catch (error) {
    console.error(error);
    alert("Internal Server Error!");
  }
});


// const ctx = document.getElementById('beerChart');

// new Chart(ctx, {
//   type: 'bubble',
//   data: {
//     labels: ['Rojo', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//       label: '# of Votes',
//       data: [10, 19, 3, 5, 2, 3],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });