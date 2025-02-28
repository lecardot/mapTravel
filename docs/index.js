let convertString = function (milisecs) {
  var diff_hours = Math.floor(milisecs / 3600, 1)
  var diff_minutes = (milisecs - 3600 * diff_hours) / 60
  return `${diff_hours}h${diff_minutes}m`
}

let getDistance = (map, cordsFrom, cordsTo) =>
  map.distance(cordsFrom, cordsTo).toFixed(0) / 1000;

let iconPlane = L.divIcon({
  className: 'custom-div-icon',
  html: '<div class="dot_plane"></div>',
  iconAnchor: [4, 12.3]
});

let add_flight = function (map, points) {

  let dist = Array.from({ length: points.length - 1 }, (_, i) => getDistance(map, points[i], points[i + 1]))

  return L.Marker.movingMarker(
    points, dist,
    options = {
      loop: true,
      icon: iconPlane
    });
}

async function renderMap() {
  const map = L.map(document.querySelector(".map"), { 'worldCopyJump': true });

  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  L.control.scale().addTo(map);

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

  // MTL <-> YVR <-> TPE
  add_flight(map, [pointYUL, pointYVR_A, pointNRT_A, pointTPE_A]).addTo(map).start();
  add_flight(map, [pointYUL_B, pointYVR_B, pointNRT_B, pointTPE_B]).addTo(map).start();

  // TPE <-> MNL
  add_flight(map, [pointTPE_A, pointMNL_A, pointTPE_A]).addTo(map).start();
  add_flight(map, [pointTPE_B, pointMNL_B, pointTPE_B]).addTo(map).start();

  // TPE <-> LAX <-> YUL
  add_flight(map, [pointTPE_A, pointLAX_A, pointYUL]).addTo(map).start();
  add_flight(map, [pointTPE_B, pointLAX_B, pointYUL_B]).addTo(map).start();

  // YMH <-> KEF <-> CDG
  add_flight(map, [pointYMH, pointKEF, pointCDG, pointKEF, pointYMH]).addTo(map).start();

  // MTL <-> Fort Laudernale
  add_flight(map, [pointYUL, pointFLL, pointYUL]).addTo(map).start();

  // Miami <-> San Juan
  add_flight(map, [pointMIA, pointSJU, pointMIA]).addTo(map).start();

  // Paris -> MTL
  add_flight(map, [pointCDG, pointYUL]).addTo(map).start();

  // Paris <-> Lisbonne <-> MTL
  add_flight(map, [pointOrly, pointLOA, pointYUL, pointLOA, pointOrly]).addTo(map).start();

  // NYC -> Paris
  add_flight(map, [pointNLI, pointOrly]).addTo(map).start();

  // MTL <-> HLX
  add_flight(map, [pointYUL, pointHLX, pointYUL]).addTo(map).start();

  // Barcelone -> Beauvais
  add_flight(map, [pointBCN, pointBVA]).addTo(map).start();

  map.panTo(pointYUL);

  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Légende</h4>";
    div.innerHTML += '<i style="background-color: rgba(0, 0, 255, 0.7)"></i><span>Train</span><br>';
    div.innerHTML += '<i style="background-color: rgba(255, 0, 0, 0.5)"></i><span>Ferry</span><br>';
    div.innerHTML += '<i style="background-color: rgba(0, 0, 0, 0.5)"></i><span>Route</span><br>';
    div.innerHTML += '<i style="background-color: rgba(0, 255, 0, 0.5)"></i><span>Vélo</span><br>';
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