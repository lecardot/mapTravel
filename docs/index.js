let convertString = function (milisecs) {
  var diff_hours = Math.floor(milisecs / 3600, 1)
  var diff_minutes = (milisecs - 3600 * diff_hours) / 60
  return `${diff_hours}h${diff_minutes}m`
}

let getDistance = (map, cordsFrom, cordsTo) =>
  map.distance(cordsFrom, cordsTo).toFixed(0) / 1000;


async function renderMap() {
  const map = L.map(document.querySelector(".map"), { 'worldCopyJump': true });

  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  L.control.scale().addTo(map);

  let iconPlane = L.divIcon({
    className: 'custom-div-icon',
    html: '<div class="dot_plane"></div>',
    iconAnchor: [4, 12.3]
  });

  var pointCDG = new L.LatLng(48.9645519, 2.438448005);
  var pointYUL = new L.LatLng(45.4680288, -73.7276389);
  var pointOrly = new L.LatLng(48.723210, 2.379579320);
  var pointLOA = new L.LatLng(38.7811952, -9.13600751);
  var pointNLI = new L.LatLng(40.6896186, -74.1665474);
  var pointHLX = new L.LatLng(44.8769224, -63.5163199);
  var pointBCN = new L.LatLng(41.2983098, 2.081902809);
  var pointBVA = new L.LatLng(49.4533346, 2.116162099);



  var pointYVR_A = new L.LatLng(49.1876142, -123.18616160);
  var pointNRT_A = new L.LatLng(35.7512768, 140.387501785 - 2 * 180);
  var pointTPE_A = new L.LatLng(25.0852645, 121.231277954 - 2 * 180);
  var pointMNL_A = new L.LatLng(14.5093388, 121.020517500 - 2 * 180);
  var pointLAX_A = new L.LatLng(33.9418113, -118.417868956);

  var pointYUL_B = new L.LatLng(45.4680288 + 2 * 180, -73.7276389 + 2 * 180);
  var pointYVR_B = new L.LatLng(49.1876142, -123.18616160 + 2 * 180);
  var pointNRT_B = new L.LatLng(35.7512768, 140.387501785);
  var pointTPE_B = new L.LatLng(25.0852645, 121.231277954);
  var pointMNL_B = new L.LatLng(14.5093388, 121.020517500);
  var pointLAX_B = new L.LatLng(33.9418113, -118.417868956 + 2 * 180);

  var pointYMH = new L.LatLng(43.1737220, -79.9232869);
  var pointKEF = new L.LatLng(63.9851196, -22.6056430);

  var pointFLL = new L.LatLng(26.076756, -80.150874);
  var pointMIA = new L.LatLng(25.794470, -80.290558);
  var pointSJU = new L.LatLng(18.442935, -66.002363);


  // MTL -> TPE
  var planeMarker = L.Marker.movingMarker(
    [pointYUL, pointYVR_A, pointNRT_A, pointTPE_A],
    [getDistance(map, pointYUL, pointYVR_A),
    getDistance(map, pointYVR_A, pointNRT_A),
    getDistance(map, pointNRT_A, pointTPE_A)],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();

  var planeMarker = L.Marker.movingMarker(
    [pointYUL_B, pointYVR_B, pointNRT_B, pointTPE_B],
    [getDistance(map, pointYUL, pointYVR_B),
    getDistance(map, pointYVR_B, pointNRT_B),
    getDistance(map, pointNRT_B, pointTPE_B)],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();

  var planeMarker = L.Marker.movingMarker(
    [pointTPE_A, pointMNL_A, pointTPE_A],
    [getDistance(map, pointTPE_A, pointMNL_A),
    getDistance(map, pointMNL_A, pointTPE_A)],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();

  var planeMarker = L.Marker.movingMarker(
    [pointTPE_B, pointMNL_B, pointTPE_B],
    [getDistance(map, pointTPE_B, pointMNL_B),
    getDistance(map, pointMNL_B, pointTPE_B)],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();

  var planeMarker = L.Marker.movingMarker(
    [pointTPE_A, pointLAX_A, pointYUL],
    [getDistance(map, pointTPE_A, pointLAX_A),
    getDistance(map, pointLAX_A, pointYUL)],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();


  var planeMarker = L.Marker.movingMarker(
    [pointTPE_B, pointLAX_B, pointYUL_B],
    [getDistance(map, pointTPE_B, pointLAX_B),
    getDistance(map, pointLAX_B, pointYUL_B)],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();


  // Tor <-> Reyk
  var planeMarker = L.Marker.movingMarker(
    [pointYMH, pointKEF, pointCDG, pointKEF, pointYMH],
    [getDistance(map, pointYMH, pointKEF),
    getDistance(map, pointKEF, pointCDG),
    getDistance(map, pointCDG, pointKEF),
    getDistance(map, pointKEF, pointYMH)],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointYYZ, pointKEF, pointCDG, pointKEF, pointYYZ], { color: 'black', weight: 5, opacity: 0.03}).addTo(map);


  // MTL <-> Fort Laudernale
  var planeMarker = L.Marker.movingMarker(
    [pointYUL, pointFLL, pointYUL],
    [getDistance(map, pointYUL, pointFLL),
    getDistance(map, pointFLL, pointYUL)
    ],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointYUL, pointFLL, pointYUL], { color: 'black', weight: 5, opacity: 0.03}).addTo(map);

  // Miami <-> San Juan
  var planeMarker = L.Marker.movingMarker(
    [pointMIA, pointSJU, pointMIA],
    [getDistance(map, pointMIA, pointSJU),
    getDistance(map, pointSJU, pointMIA)
    ],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointMIA, pointSJU, pointMIA], { color: 'black', weight: 5, opacity: 0.03}).addTo(map);

  // Paris -> MTL
  var planeMarker = L.Marker.movingMarker(
    [pointCDG, pointYUL],
    [getDistance(map, pointCDG, pointYUL)],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointCDG, pointYUL], { color: 'black', weight: 5, opacity: 0.03}).addTo(map);

  // Paris <-> Lisbonne <-> MTL
  var planeMarker = L.Marker.movingMarker(
    [pointOrly, pointLOA, pointYUL, pointLOA, pointOrly],
    [getDistance(map, pointOrly, pointYUL),
      getDistance(map, pointYUL, pointLOA),
      getDistance(map, pointLOA, pointOrly)],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointOrly, pointLOA, pointYUL], { color: 'black',  weight: 5, opacity: 0.03 }).addTo(map);

  // NYC -> Paris
  var planeMarker = L.Marker.movingMarker(
    [pointNLI, pointOrly],
    [getDistance(map, pointNLI, pointOrly)],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointNLI, pointOrly], { color: 'black', weight: 5, opacity: 0.03 }).addTo(map);

  // MTL <-> HLX
  var planeMarker = L.Marker.movingMarker(
    [pointYUL, pointHLX, pointYUL],
    [getDistance(map, pointYUL, pointHLX),
      getDistance(map, pointHLX, pointOrly)],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointYUL, pointHLX], { color: 'black', weight: 5, opacity: 0.03 }).addTo(map);

  // Barcelone -> Beauvais
  var planeMarker = L.Marker.movingMarker(
    [pointBCN, pointBVA],
    [getDistance(map, pointBCN, pointBVA)],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointBCN, pointBVA], { color: 'black', weight: 5, opacity: 0.03 }).addTo(map);


  map.fitBounds(new L.LatLngBounds(new L.LatLng(32, -122.292293), new L.LatLng(45.500295, -73.567149)));

  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Légende</h4>";
    div.innerHTML += '<i style="background-color: rgba(0, 0, 255, 0.7)"></i><span>Train</span><br>';
    div.innerHTML += '<i style="background-color: rgba(255, 0, 0, 0.5)"></i><span>Ferry</span><br>';
    div.innerHTML += '<i style="background-color: rgba(0, 0, 0, 0.5)"></i><span>Route</span><br>';
    div.innerHTML += '<i style="background-color: rgba(0, 255, 0, 0.5)"></i><span>Vélo</span><br>';
    //div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
    return div;
  };

  legend.addTo(map);

  for (let country of ['US', 'UK', 'CA', 'ES', 'FR', 'BE']) {
    await fetch(`https://raw.githubusercontent.com/lecardot/mapTravel/main/files/${country}.geojson`)
      .then(res => res.json())
      .then(res => {
        new L.geoJSON(res, {
          onEachFeature: function (feature, layer) {
            try {
              layer.bindTooltip(
                `<center class="track title">${feature.properties.name}</center>` +
                `<center>${(feature.properties.distance / 1000).toFixed(2)} km</center>` +
                `<center>${convertString(feature.properties.time / 1000)}</center>`,
                { sticky: true, });
            } catch { }
          },
          async: true,
          marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
          style: { color: "blue", opacity: 0.5 },
        }).addTo(map);
      })
  }

  await fetch(`https://raw.githubusercontent.com/lecardot/mapTravel/main/files/Ferry.geojson`)
    .then(res => res.json())
    .then(res => {
      new L.geoJSON(res, {
        onEachFeature: function (feature, layer) {
          layer.bindTooltip(
            `<center class="track title">${feature.properties.name}</center>`,
            { sticky: true, });
        },
        async: true,
        marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
        style: { color: "red", opacity: 0.5 },
      }).addTo(map);
    })

  await fetch(`https://raw.githubusercontent.com/lecardot/mapTravel/main/files/Velo.geojson`)
    .then(res => res.json())
    .then(res => {
      new L.geoJSON(res, {
        onEachFeature: function (feature, layer) {
          layer.bindTooltip(
            `<center class="track title">${feature.properties.name}</center>`,
            { sticky: true, });
        },
        async: true,
        marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
        style: { color: "green", opacity: 0.4 },
      }).addTo(map);
    })

  for (let type of ['Bus', 'FR_Voiture']) {
    await fetch(`https://raw.githubusercontent.com/lecardot/mapTravel/main/files/${type}.geojson`)
      .then(res => res.json())
      .then(res => {
        new L.geoJSON(res, {
          async: true,
          marker_options: { startIconUrl: '', endIconUrl: '', shadowUrl: '' },
          style: { color: "black", opacity: 0.3 },
        }).addTo(map);
      })
  }

}

renderMap().catch(console.error)