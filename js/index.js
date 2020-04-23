

var map;
var covid19Data =[];
var covid19;
var markers = [];
var infoWindow;
async function initMap() {
    let info = await axios.get('https://corona.lmao.ninja/v2/countries');
    covid19 = info.data;
    let res = await axios.get("https://pomber.github.io/covid19/timeseries.json");
    covid19Data = res.data;
    
    var southAfrica = {
        lat: -25.746111, 
        lng: 28.188056
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: southAfrica,
        zoom: 4,
        mapTypeId: 'roadmap',
        styles: mapStyle,
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        gestureHandling: 'greedy',
    });

    infoWindow = new google.maps.InfoWindow();
    searchCountry();
    //retrivedata()
    //displayCountries();
    //displayCountries(covid19Data);
    
    
    
}

function searchCountry(){
    var foundCountries= [];
    var country = document.getElementById('search-country').value;
    if(country){
        Object.entries(covid19).map(value =>{
            if(value[1]['country'].toLowerCase().includes(country.toLowerCase())){
                foundCountries.push(value[1]);
                
            }
        });
    }else{
        foundCountries = covid19;
    }
    clearLocations()
    displayCountries(foundCountries);
    showCovidMarkers(foundCountries);
    setOnClickListener()

}

function displayCountries(covid19){
    //console.log(covid19Data)
    var countries = '';
    (covid19).map((country, index) => {
        let countires = country['country']
        let cases = country['cases']
        let deaths = country['deaths']
        let recovered = country['recovered']

        // countries +=`
        //     <div class="country-list">
        //         <div class="contries">
        //             <div class="container">
        //                 <div class="info">
        //                     <div class="country-container">
        //                         <span>${countires}</span> 
        //                     </div>
        //                     <span><strong>Confirmed:</strong> ${cases}</span> 
        //                     <span><strong>Deaths:</strong> ${deaths}</span> 
        //                     <span><strong>Recoverd:</strong> ${recovered}</span>
        //                 </div>
        //             </div>
        //         <div class="store-number-container">
        //             <div class="store-number">
        //             ${index+1}
        //             </div>
        //         </div>
        //     </div>
        // `

        countries+=`
        <div class="country-list">
            <div class="contries" value="tshepi">
                <div class="container">
                    <div class="info">
                        <div class="country-container">
                            <span>${countires}</span> 
                        </div>
                        <span><strong>Confirmed:</strong> ${cases}</span> 
                        <span><strong>Deaths:</strong> ${deaths}</span> 
                        <span><strong>Recoverd:</strong> ${recovered}</span> 
                    </div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${index+1}
                    </div>
                </div>
            </div>
        </div>
        `

        //console.log(country)
        document.querySelector('.country-list').innerHTML = countries;
    }) 
}

function showCovidMarkers(covid19){
    var bounds = new google.maps.LatLngBounds();
    covid19.map((one,index) =>{
        var latlng = new google.maps.LatLng(
            one['countryInfo']['lat'],
            one['countryInfo']['long']
        );
        let lastUpdated = new Date(one['updated']).toLocaleDateString("vn")
        let country = one['country']
        let cases = one['cases']
        let deaths = one['deaths']
        let recovered = one['recovered']
        bounds.extend(latlng);
        createCovidMarker(latlng,country,lastUpdated,cases,recovered,deaths,index)
    })
    //map.fitBounds(bounds);
}

function createCovidMarker(latlng,country,lastUpdated,cases,recovered,deaths,index){
    let html = `
        <div class="ccp-virus-info-country-container">
            <div class="info-main-container">
                <div class="info-country">
                    ${country}
                </div>
                <div class="info-last-updated">
                    <span>last updated: </span>${lastUpdated}
                </div>
            </div>
            <div class="info-secondary-container">
                <div class="info-cases">Cases: ${cases}</div>
                <div class="info-recovered">Recovered: ${recovered}</div>
                <div class="info-death">Deaths: ${deaths}</div>
                <div class="info-active">Active: ${cases-recovered-deaths}</div>
            </div>
        </div>
    `
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        icon: 'image/corona.png'
      });
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
      markers.push(marker);
    
}

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
  }
  function setOnClickListener()
  {
      var storeElement = document.querySelectorAll('.contries');
      storeElement.forEach(function(elem, index){
          elem.addEventListener('click',function(){
              google.maps.event.trigger(markers[index], 'click');
          })
      })
  }

