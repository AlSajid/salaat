
if (navigator.geolocation)
	navigator.geolocation.getCurrentPosition(storeLocation);

var latitude, longitude, elevation, timezone, daylightSavingTime;

function storeLocation(position) {
	fetch(
		"https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
		position.coords.latitude +
		"," +
		position.coords.longitude +
		"&key=AIzaSyBPaYvFthsrjakGqjnEQo6DjGItafowF3I&language=bn&region=bd"
	)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			sessionStorage.setItem("location", data.results[2].formatted_address);
		});

	var altitude;

	if (position.coords.altitude)
		altitude = position.coords.altitude;
	else
		altitude = 0;

	showTime(position.coords.latitude, position.coords.longitude, altitude);
}

function showTime(latitude, longitude, altitude) {
	var
		elevation = sessionStorage.getItem("altitude"),
		timezone = "auto",
		daylightSavingTime = "auto";

	prayTimes.adjust({
		imsak: "3 min",
		fajr: 18.5,
		dhuhr: "3 min",
		asr: "Hanafi",
		maghrib: "3 min",
		isha: 18.5,
	});

	prayTimes.tune({ fajr: 3, midday: -3, asr: 0, lateAsr: -24 });

	var time = prayTimes.getTimes(
		new Date(),
		[latitude, longitude, elevation],
		timezone,
		daylightSavingTime,
		"Float"
	);

	var ftime = prayTimes.getTimes(
		new Date(),
		[latitude, longitude, elevation],
		timezone,
		daylightSavingTime,
		"12HNS"
	);



	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var now = hours + minutes / 60;

	console.log(ftime);

	var waqt;

	if (now >= time.fajr && now < time.sunrise) {
		waqt = "ফজর";
	} else if (now >= time.midday && now < time.dhuhr) {
		waqt = "নিষিদ্ধ সময়";
	} else if (now >= time.dhuhr && now < time.asr) {
		waqt = "যোহর"
	} else if (now >= time.asr && now < time.maghrib) {
		waqt = "আসর"
	} else if (now >= time.lateAsr && now < time.maghrib) {
		waqt = "নিষিদ্ধ সময়";
	} else if (now >= time.maghrib && now < time.isha) {
		waqt = "মাগরিব";
	}



	document.getElementById("waqt").innerHTML = waqt;
	document.getElementById("imsak").innerHTML = ftime.imsak;
	document.getElementById("fajr").innerHTML = ftime.fajr;
	document.getElementById("sunrise").innerHTML = ftime.sunrise;
	document.getElementById("dhuhr").innerHTML = ftime.dhuhr;
	document.getElementById("asr").innerHTML = ftime.asr;
	document.getElementById("sunset").innerHTML = ftime.sunset;
	document.getElementById("maghrib").innerHTML = ftime.maghrib;
	document.getElementById("isha").innerHTML = ftime.isha;



	var countDownDate = cd;


	var now = Date.now();

	var distance = countDownDate - now;

	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	console.log(hours)

	/*
		if (hours > 0) {
			document.getElementById("cd").innerHTML = hours + " N›Uv "/* ঘন্টা */ // + minutes + " wgwbU  " /* মিনিট */ + seconds + " †m‡KÛ" /* সেকেন্ড */;
	//	} else if (minutes > 0) {
	//		document.getElementById("cd").innerHTML = minutes + " wgwbU  " /* মিনিট */ + seconds + " †m‡KÛ" /* সেকেন্ড */;
	//	} else {
	//		document.getElementById("cd").innerHTML = seconds + " †m‡KÛ" /* সেকেন্ড */;


	//	}
	/*
		document.write("1. সেহ্‌রীর শেষ সময় : " + time.imsak + "<br>");
		document.write("2. ফজর : " + time.fajr + "<br>");
		document.write("3. সূর্যোদয় : " + time.sunrise + "<br>");
		document.write("4. যোহর : " + time.dhuhr + "<br>");
		document.write("5. আসর : " + time.asr + "<br>");
		document.write("6. সুর্যাস্ত : " + time.sunset + "<br>");
		document.write("7. মাগরিব : " + time.maghrib + "<br>");
		document.write("8. ইশা : " + time.isha + "<br>");
		document.write("9. মধ্যরাত : " + time.midnight + "<br>");
	
	*/


}



/*











	/*


// }
/*
	  if (distance < 0) {
		clearInterval(x);
		location.reload();
	  } else if (distance < 1000) {
		displayNotification(Pmsg);
	  }
	}, 1000);


	Notification.requestPermission(
	  function(status) {
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
		  .then(function(reg) {
			reg.showNotification(PHead, options);
		  });
	  }
	}
*/
