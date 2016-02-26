  // Load the Google Maps API on startup
  Meteor.startup(() => {
    GoogleMaps.load({
      key: 'AIzaSyDQiIkUVqyUu_ev3QaOQFLqfCyR_wtLwTo',
      libraries: 'places'
    });
  });
  
