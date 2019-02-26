

var link = document.getElementsByTagName("a")
getLink(link)
var recievedData = []
var copiedData;

$(document).ready(function () {
    $.ajax({
        url: 'https://api.myjson.com/bins/2sadq?pretty=1',
        method: 'get',
        dataType: 'json',
        success: function (data) {
            if (data.message != null) {
                document.getElementById('Demo').innerHTML = data.message
            } else {
                copiedData = getDataFromResponse(data)
            }
        }
    })

})

function getDataFromResponse(data) {
    var apartmentArray = data.apartments
    var apartmentslength = data.apartments.length
    for (let i = 0; i < apartmentslength; i++) {
        recievedData.push(apartmentArray[i]);
    }
    //console.log('RecievedData Array lenght is: '+recievedData.length)
    //console.log(recievedData)
    var data = recievedData
    readArrayElements(recievedData)
    return recievedData
}
var usehtml = ""
var cityName = ""
var html = ""
var addressArray = []
function readArrayElements(data) {
    $(data).each(function (index, value) {
       // console.log(value['city'] + "\n" + value['description'] +"\n" + value['address']);
       if (cityName === '') {
           addressArray.push(value)
        html += 
        `<div id="divID" class="card mb-3 p-4">

            <h4 class="card-title text-center">Apartmen ${index+1}</h4>
            <div class="card-body">
            <h5>City Name:</h5><h6 class="card-title"> ${value.city}</h6>
            <h6>Apartment Description: </h6><p class="card-text">${value.description}</p> 
            <h6>Price: </h6><p class="card-subtitle mb-2 text-muted">${value.price}</p>
            <h6>State: </h6><p>${value.state}</p> 
            <h6>Address: </h6><a class="card-link" target="_blank" href="geoCode.html">${value.address}</a>
            </div>

        </div>`
       } else if (`${value.city}` == cityName){
        addressArray.push(value)
       html += 
         `<div id="divID" class="card mb-3 p-4">

            <h4 class="card-title text-center">Apartmen ${index+1}</h4>
            <div class="card-body">
            <h5>City Name:</h5><h6 class="card-title"> ${value.city}</h6>
            <h6>Apartment Description: </h6><p class="card-text">${value.description}</p> 
            <h6>Price: </h6><p class="card-subtitle mb-2 text-muted">${value.price}</p>
            <h6>State: </h6><p>${value.state}</p> 
            <h6>Address: </h6><a class="card-link" target="_blank" href="geoCode.html">${value.address}</a>
            </div>

         </div>`
        }
    })
}
// Skapat apartmentAddress för att kunna spara den i localStorage som kan användas senare när man navigerar till nästa .js filen
var apartmentAddress
var choosedLinkAddress
    $(document).on('click', 'a.card-link', function () {
        choosedLinkAddress = addressArray[$('a.card-link').index(this)].address
        console.log(choosedLinkAddress + '\n' + 'Index: ' +$('a.card-link').index(this))
        //apartmentAddress = choosedLinkAddress
         apartmentAddress = new Apartments(choosedLinkAddress)
         localStorage.setItem('address', apartmentAddress.address)
         
    })
// City names links and there click events
function getLink(link) {
    for (let i = 0; i < link.length; i++) {
        link[i].onclick = function () {
            if (link[i]['id'] == 'All') {
                console.log('link1')
                cityName = ""
                clear()
                readArrayElements(recievedData)
                document.getElementById("ApartmentsDiv").innerHTML = html
            }
            if (link[i]['id'] == 'Brooklyn') {
                cityName = "Brooklyn"
                console.log('link2')
                console.log('RecievedData Array lenght is: '+recievedData.length)
                clear()
                readArrayElements(recievedData)
                document.getElementById("ApartmentsDiv").innerHTML = html
            }
            if (link[i]['id'] == 'Manhattan') {
                cityName = "Manhattan"
                console.log('link3')
                clear()
                readArrayElements(recievedData)
                document.getElementById("ApartmentsDiv").innerHTML = html
            }
            if (link[i]['id'] == 'Staten Island') {
                cityName = "Staten Island"
                console.log('link4')
                clear()
                readArrayElements(recievedData)
                document.getElementById("ApartmentsDiv").innerHTML = html
            }
            if (link[i]['id'] == 'The Bronx') {
                cityName = "The Bronx"
                console.log('link5')
                clear()
                readArrayElements(recievedData)
                document.getElementById("ApartmentsDiv").innerHTML = html
            }
            if (link[i]['id'] == 'Queens') {
                cityName = "Queens"
                console.log('link6')
                clear()
                readArrayElements(recievedData)
                document.getElementById("ApartmentsDiv").innerHTML = html
            }
        }
    }
}
function clear() {
    document.getElementById("ApartmentsDiv").innerHTML = ""
    html = ""
    addressArray = []
}

class Apartments {
    constructor(address) {
        this.address = address
    }
}