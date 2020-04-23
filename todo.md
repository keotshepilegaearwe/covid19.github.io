# Plan Of Action


- Get every country location

- get COVID stats on every country as you click on those country

- allow users to select their address on different country


<!-- fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(response => response.json())
    .then(function(data){
    Object.entries(data).forEach((obj, index) => {
            
            // console.log(obj[1][obj[1].length -1])
            document.querySelector('.country-list').innerHTML = countries;
        })
    }); -->


    function retrieveJSON(){
    fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(response => response.json())
    .then(data => Object.entries(data).map(value => {
            info1.push(value);
        }),
    );
}

// function displayCountries(){
//     var countries = '';
//     fetch("https://pomber.github.io/covid19/timeseries.json")
//     .then(response => response.json())
//     .then(function(data){
//     Object.entries(data).forEach((obj, index) => {
//             countries +=`
//                 <div class="contries">
//                     <div class="container">
//                         <div class="info">
//                             <div class="country-container">
//                                 <span>${obj[0]}</span> 
//                             </div>
//                             <span><strong>Confirmed:</strong> ${obj[1][obj[1].length -1]["confirmed"]}</span> 
//                             <span><strong>Deaths:</strong> ${obj[1][obj[1].length -1]["deaths"]}</span> 
//                             <span><strong>Recoverd:</strong> ${obj[1][obj[1].length -1]["recovered"]}</span>
//                         </div>
//                     </div>
//                     <div class="store-number-container">
//                         <div class="store-number">
//                             ${index+1}
//                         </div>
//                     </div>
//                 </div>
//             `
//             // console.log(obj[1][obj[1].length -1])
//             document.querySelector('.country-list').innerHTML = countries;
//         })
//     });
    
// }