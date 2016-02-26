 
// Insert restaurant fixtures if the Entries collection is empty.
Meteor.startup(function() {
  let isFirstTime = false;
  if (isFirstTime && Entries.find().count() === 0) {
    var restaurantFixtures = JSON.parse(
        Assets.getText('fixtures/entries_restaurants.json'));

    _.each(restaurantFixtures, function(restaurant) {
        Entries.insert(restaurant);
    });
  }
});
