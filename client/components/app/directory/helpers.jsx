map = null;
layers = {};
handle = null;

BOX = {
        sw: {
            lat: 40.68818804944925,
            lon: -74.05574798583986
        },
        ne: {
            lat: 40.81822635589172,
            lon: -73.88408660888673
        }
    };

getMapBounds = function(map) {
    if (!map) return null;
    
    let sw = map.getBounds().getSouthWest();
    let ne = map.getBounds().getNorthEast();
    let box = { sw: {lat: sw.lat, lon: sw.lng}, ne: {lat: ne.lat, lon: ne.lng}};
    return box;
}


subscribeWithBounds = function(e) {
    if (handle) {
        handle.stop();
    }
    handle = Meteor.subscribe('entries', getMapBounds(map));
    return handle;
}
