// Use Leaflet images from bevanhunt:leaflet.
L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

getMapBounds = function(e) {
  return {
    sw: {
      lat: e.target.getBounds().getSouthWest().lat,
      lon: e.target.getBounds().getSouthWest().lng
    },
    ne: {
      lat: e.target.getBounds().getNorthEast().lat,
      lon: e.target.getBounds().getNorthEast().lng
    }
  };
};

handleMarkerClick = function(e) {
  // The clicker marker layer.
  var layer = e.target;
  // The related DOM element in the restaurant listing.
  var el = $('.entries[data-mongodb-id=\'' + layer.entry._id + '\']');

  // Show pop up balloon with restaurant name above marker.
  layer.bindPopup(layer.entry.name).openPopup();

  // Highlight restaurant in listing.
  $('.entries').removeClass('bg-silver');
  el.addClass('bg-silver');

  // Scroll to the restaurant related to the clicked marker.
  var offset = el.position().top;
  $('.entries .listing').animate({
    scrollTop: $('.entries .listing').scrollTop() + offset
  }, 1000);
};
