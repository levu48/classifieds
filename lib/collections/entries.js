Entries = new Mongo.Collection('entries');

if (Meteor.isServer) {
    Meteor.startup(function() {
        Entries._ensureIndex({
            'location.coordinates': '2dsphere'
        });
    });
}


Entries.allow({
    update(userId, entry) {
        return Utils.ownsDocument(userId, entry);
    },
    
    remove(userId, entry) {
        return Utils.ownsDocument(userId, entry);
    }
});


validateEntry = function(entry) {
    var errors = {};
    
    if (!entry.category) {
        errors.category = "Please select a category";
    }

    if (!entry.language) {
        errors.language = "Please select the primary language";
    }
            
    if (!entry.name) {
        errors.title = "Please enter a business name";
    }
    
    if (!entry.address) {
        errors.address = "Please specify your address or location";
    }  
    
    /*
    
    if (!post.contact) {
        errors.contact = "Please enter a contact name";
    }
    
    if (!post.phone) {
        errors.phone = "Please enter a phone number";
    }
    
    if (!post.email) {
        errors.email = "Please enter an email";
    }

    
  
    
    if (!post.city) {
        errors.city = "Please specify your city";
    }
    */
    

    
    return errors;
};


Meteor.methods({
    
  entryInsert(attributes) {
        check(this.userId, String);
        check(attributes, {
            name: String,
            image: String,
            language: String,
            description: String,
            contact: String,
            phone: String,
            email: String,
            web: String,
            category: String,
            address: String,
            city: String,
            state: String,
            country: String,
            location: { coordinates: Array, type: String}
        });
        
        var errors = validateEntry(attributes);
        if (errors.name || errors.category || errors.language || errors.address) {
            throw new Meteor.Error('invalid directory entry', "Please fill in all the required fields");
        }
        
        var user = Meteor.user();
        var entry = _.extend(attributes, {
                userId: user._id,
                author: user.username,
                submitted: new Date(),
                flag: 0
            });
        
        var entryId = Entries.insert(entry);
        
        return {
            _id: entryId
        };
    },
    
    
    deleteEntry(entryId) {
        let toDelete = Entries.findOne(entryId);
        if (toDelete == null) {
            console.log("No posting found for to be deleted.");
            return;
        }
        Entries.remove({_id: entryId});
    }
});