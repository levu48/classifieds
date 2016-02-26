Meteor.publish('restaurants', function(box) {
    check(box, {
        sw: {
            lat: Number,
            lon: Number
        },
        ne: {
            lat: Number,
            lon: Number
        }
    });
  
    return Restaurants.find({
        location: {
            $geoWithin: {
                $box: [
                    [box.sw.lon, box.sw.lat],
                    [box.ne.lon, box.ne.lat]
                ]
            }
        }
    });
});


Meteor.publish('posts', function() {
    return Posts.find({});
});

Meteor.publish('providers', function() {
    return Providers.find({});
});

Meteor.publish('app-accounts', function() {
    return AppAccounts.find({});
});

Meteor.publish('entries', function(box) {
    check(box, {
        sw: {
            lat: Number,
            lon: Number
        },
        ne: {
            lat: Number,
            lon: Number
        }
    });
  
    
    return Entries.find({
        location: {
            $geoWithin: {
                $box: [
                    [box.sw.lon, box.sw.lat],
                    [box.ne.lon, box.ne.lat]
                ]
            }
        }
    });

});


Meteor.publish('messages', function(obj) {
    check(obj, {
        sender: String,
        target: {
                type: String,
                receivers: Array
            },
        message: String,
        createdAt: Date
    });
    
    return Messages.find({});
});