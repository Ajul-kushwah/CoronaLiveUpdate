var commArr;
var country_name = document.getElementById('country_name');

function fetchAlldata(){
    var request = new XMLHttpRequest();
    request.open('GET','https://api.covid19api.com/summary');
    request.send();
    request.onload = function(){
        // console.log(request.responseText);

        commArr = JSON.parse(request.responseText);
        console.log(commArr);
        // console.log(typeof(commArr));
		
		//console.log(commArr.Countries.Country);
        fetchCountries(commArr.Countries);
		globalData(commArr.Global);
    }
}


function globalData(globaldata){
	//console.log(globaldata);
	displayGlobalData(globaldata);
}

function displayGlobalData(data){
	// console.log(obj);
    document.getElementById('TotalConfirmed').innerHTML = data.TotalConfirmed;
    document.getElementById('TotalRecovered').innerHTML = data.TotalRecovered;
    document.getElementById('TotalDeaths').innerHTML = data.TotalDeaths;
    document.getElementById('NewConfirmed').innerHTML = data.NewConfirmed;
    document.getElementById('NewRecovered').innerHTML = data.NewRecovered;
    document.getElementById('NewDeaths').innerHTML = data.NewDeaths;
	
}

function fetchCountries(countryData){
    for(var i =0;i<countryData.length; i++){
        // console.log(countryData[i].Country);
        var option = document.createElement('option'); 
        option.innerHTML = countryData[i].Country;
        option.value = countryData[i].Country;
        if (countryData[i].Country === 'India'){
            option.selected =true;
            displayResult(countryData[i]);
        }
        country_name.appendChild(option);
    }
}

function displayResult(obj){
    // console.log(obj);
	document.getElementById('country').innerHTML = obj.Country;
	document.getElementById('countrycode').innerHTML = obj.CountryCode;
    document.getElementById('confirm').innerHTML = obj.TotalConfirmed;
    document.getElementById('recover').innerHTML = obj.TotalRecovered;
    document.getElementById('death').innerHTML = obj.TotalDeaths;
    document.getElementById('newConfirm').innerHTML = obj.NewConfirmed;
    document.getElementById('newRecover').innerHTML = obj.NewRecovered;
    document.getElementById('newDeath').innerHTML = obj.NewDeaths;
}
// if(countryName){
country_name.addEventListener('change', function(event){
    console.log(event.target.value)
    for(var i =0; i<commArr.Countries.length; i++){
        if(commArr.Countries[i].Country == event.target.value){
            displayResult(commArr.Countries[i])
        }
    }
});
// }


fetchAlldata();