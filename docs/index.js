let convertString = function (milisecs) {
  var diff_hours = Math.floor(milisecs / 3600, 1)
  var diff_minutes = (milisecs - 3600 * diff_hours) / 60
  return `${diff_hours}h${diff_minutes}m`
}

async function renderMap() {
  const map = L.map(document.querySelector(".map"));

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

  var pointYMH = new L.LatLng(43.1737220, -79.9232869);
  var pointKEF = new L.LatLng(63.9851196, -22.6056430);

  var pointFLL = new L.LatLng(26.076756, -80.150874);
  var pointMIA = new L.LatLng(25.794470, -80.290558);
  var pointSJU = new L.LatLng(18.442935, -66.002363);


  // Tor <-> Reyk
  var planeMarker = L.Marker.movingMarker(
    [pointYMH, pointKEF, pointCDG, pointKEF, pointYMH],
    [5000, 3000, 3000, 5000],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointYYZ, pointKEF, pointCDG, pointKEF, pointYYZ], { color: 'black', weight: 5, opacity: 0.03}).addTo(map);


  // MTL <-> Fort Laudernale
  var planeMarker = L.Marker.movingMarker(
    [pointYUL, pointFLL, pointYUL],
    [3000, 3000],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointYUL, pointFLL, pointYUL], { color: 'black', weight: 5, opacity: 0.03}).addTo(map);

  // Miami <-> San Juan
  var planeMarker = L.Marker.movingMarker(
    [pointMIA, pointSJU, pointMIA],
    [2500, 2500],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointMIA, pointSJU, pointMIA], { color: 'black', weight: 5, opacity: 0.03}).addTo(map);

  // Paris -> MTL
  var planeMarker = L.Marker.movingMarker(
    [pointCDG, pointYUL],
    [4500],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointCDG, pointYUL], { color: 'black', weight: 5, opacity: 0.03}).addTo(map);

  // Paris <-> Lisbonne <-> MTL
  var planeMarker = L.Marker.movingMarker(
    [pointOrly, pointLOA, pointYUL, pointLOA, pointOrly],
    [2000, 4500, 4500, 2000],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointOrly, pointLOA, pointYUL], { color: 'black',  weight: 5, opacity: 0.03 }).addTo(map);

  // NYC -> Paris
  var planeMarker = L.Marker.movingMarker(
    [pointNLI, pointOrly],
    [4500],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointNLI, pointOrly], { color: 'black', weight: 5, opacity: 0.03 }).addTo(map);

  // MTL <-> HLX
  var planeMarker = L.Marker.movingMarker(
    [pointYUL, pointHLX, pointYUL],
    [1500, 1500],
    options = {
      loop: true,
      icon: iconPlane
    }).addTo(map);
  planeMarker.start();
  //L.polyline([pointYUL, pointHLX], { color: 'black', weight: 5, opacity: 0.03 }).addTo(map);

  // Barcelone -> Beauvais
  var planeMarker = L.Marker.movingMarker(
    [pointBCN, pointBVA],
    [2000],
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

  for (let type of ['Bus', 'Voiture']) {
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