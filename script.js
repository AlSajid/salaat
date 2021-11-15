document.addEventListener('contextmenu', event => event.preventDefault());

navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;

	localStorage.setItem("lat", position.coords.latitude);
	localStorage.setItem("lng", position.coords.longitude);
}

if (localStorage.getItem("lat") === null) {
	var lat = "23.729356";
	var lng = "90.412747";
} else {
	var lat = localStorage.getItem("lat");
	var lng = localStorage.getItem("lng");
	showLoaction();
}

function showLoaction() {
	fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyBPaYvFthsrjakGqjnEQo6DjGItafowF3I&language=en&region=us').then(response => {
		return response.json();
	}).then(data => {
		document.getElementById("check").innerHTML = data.results[0].formatted_address;
	})
}

var date = new Date(); // get time

var PT = new PrayTimes('Karachi');
PT.adjust({ imsak: "6 min", dhuhr: "3 min", asr: "Hanafi", maghrib: "3 min", highLats: "AngleBased" })
var times = PT.getTimes(date, [lat, lng], +6, 0, '12h');
console.log(PT.getSetting());


var imsak = times.imsak;
var fajr = times.fajr;
var sunrise = times.sunrise;
var dhuhr = times.dhuhr;
var asr = times.asr;
var maghrib = times.maghrib;
var isha = times.isha;
var midnight = times.midnight;

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var d = date.getDate();
var m = monthNames[date.getMonth()];
var y = date.getFullYear();

var timsak = new Date(m + " " + d + ", " + y + " " + imsak).getTime();
var tfajr = new Date(m + " " + d + ", " + y + " " + fajr).getTime();
var tsunrise = new Date(m + " " + d + ", " + y + " " + sunrise).getTime();
var tdhuhr = new Date(m + " " + d + ", " + y + " " + dhuhr).getTime();
var tasr = new Date(m + " " + d + ", " + y + " " + asr).getTime();
var tmaghrib = new Date(m + " " + d + ", " + y + " " + maghrib).getTime();
var tisha = new Date(m + " " + d + ", " + y + " " + isha).getTime();
var tmidnight = new Date(m + " " + d + ", " + y + " " + midnight).getTime();

var qal = new Date((tmaghrib - 86400000) + (((tfajr - (tmaghrib - 86400000)) / 3) * 2)).getTime();

var now = date.getTime();

let Pmsg;

if (qal > now) {
	var pName = "Isha";
	var cd = timsak;
	document.body.className = "w3-flat-wet-asphalt";
}
else if (timsak > now) {
	var pName = "Qiyaam Al Layl";
	var cd = timsak;
	document.body.className = "w3-flat-midnight-blue";
	PHead = "Fajr Is Almost There";
	Pmsg = "No more suhoor today";
}
else if (tfajr + 180000 > now) {
	var pName = "Imsak";
	var cd = tfajr + 180000;
	document.body.className = "w3-flat-green-sea";
	PHead = "Wake Up! It’s Fajr";
	Pmsg = "Whoever offers the morning prayer, he is under the protection of Allah";
}
else if (tsunrise > now) {
	var pName = "Fajr";
	var cd = tsunrise;
	document.body.className = "w3-flat-nephritis";
	PHead = "Hey, Be Careful!";
	Pmsg = "Saying prayer is prohibited in this forbidden time";
}
else if (tsunrise + 1440000 > now) {
	var pName = "Forbidden Time";
	var cd = tsunrise + 1440000;
	document.body.className = "w3-flat-pomegranate";
}
else if (tdhuhr - 360000 > now) {
	var pName = "Fajr";
	var cd = tdhuhr - 360000;
	document.body.className = "w3-flat-nephritis";
	PHead = "Hey, Be Careful!";
	Pmsg = "Saying prayer is prohibited in this forbidden time";
}
else if (tdhuhr > now) {
	var pName = "Forbidden Time";
	var cd = tdhuhr;
	document.body.className = "w3-flat-pomegranate";
	PHead = "Pay Attention. It's Time to Say Dhuhr";
	Pmsg = "Take a break and Say Dhuhr";
}
else if (tasr > now) {
	var pName = "Dhuhr";
	var cd = tasr;
	document.body.className = "w3-flat-amethyst";
	PHead = "Hey, Now It’s Time to Say Asr";
	Pmsg = "Asr will save you from Jahannam and open the door of Jannah";
}
else if (tmaghrib - 1440000 > now) {
	var pName = "Asr";
	var cd = tmaghrib - 1440000;
	document.body.className = "w3-flat-belize-hole";
	PHead = "Hey, Be Careful!";
	Pmsg = "Saying prayer is prohibited in this forbidden time";
}
else if (tmaghrib + 180000 > now) {
	var pName = "Forbidden Time";
	var cd = tmaghrib + 180000;
	document.body.className = "w3-flat-pomegranate";
	PHead = "Don't Be Late in Maghrib";
	Pmsg = "Allah (SWT) will fulfill all your wishes";
}
else if (tisha > now) {
	var pName = "Maghrib";
	var cd = tisha;
	document.body.className = "w3-flat-pumpkin";
	PHead = "It’s Time to Say Isha";
	Pmsg = "Say Isha and sleep in peace. Allah will reward you for whole night.";
}
else {
	var pName = "Isha";
	var cd = timsak + 86400000;
	document.body.className = "w3-flat-wet-asphalt";
}

var countDownDate = cd;

var x = setInterval(function () {

	var now = new Date().getTime();

	var distance = countDownDate - now;

	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	if (hours > 0) {
		document.getElementById("cd").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
	}
	else if (minutes > 0) {
		document.getElementById("cd").innerHTML = minutes + "m " + seconds + "s ";
	}
	else {
		document.getElementById("cd").innerHTML = seconds + "s ";
	}

	if (distance < 0) {
		clearInterval(x);
		location.reload();
	} else if (distance < 1000) {
		displayNotification(Pmsg);
	}
}, 1000);


Notification.requestPermission(
	function (status) {
		console.log('Status:', status);
	}
);


var options = {
	body: Pmsg,
	icon: 'icons/icon-192x192.png',
	vibrate: [5000, 3000, 5000, 3000, 5000, 3000, 5000],
	data: { primaryKey: 1 }

};

function displayNotification(Pmsg) {
	if (Notification.permission === 'granted') {
		navigator.serviceWorker.getRegistration()
			.then(function (reg) {
				reg.showNotification(PHead, options);
			});
	}
}


