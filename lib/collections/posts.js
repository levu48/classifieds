Posts = new Mongo.Collection('posts');


Posts.allow({
    update(userId, post) {
        return Utils.ownsDocument(userId, post);
    },
    
    remove(userId, post) {
        return Utils.ownsDocument(userId, post);
    }
});


validatePost = function(post) {
    var errors = {};
    
    if (!post.category) {
        errors.category = "Please select a category";
    }
        
    if (!post.title) {
        errors.title = "Please enter a title";
    }
    
    if (!post.description) {
        errors.description = "Please enter a description";
    }
    
    if (!post.address) {
        errors.address = "Please specify your address or location";
    }  
    
    /*
    if (!post.price) {
        errors.price = "Please specify a price";
    }
    
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
    
  postInsert(postAttributes) {
        check(this.userId, String);
        check(postAttributes, {
            title: String,
            image: String,
            price: String,
            description: String,
            contact: String,
            phone: String,
            email: String,
            category: String,
            address: String,
            city: String,
            state: String,
            country: String,
            lat: String,
            lng: String
        });
        
        var errors = validatePost(postAttributes);
        if (errors.title || errors.category || errors.price || errors.phone || errors.description || errors.address ) {
            throw new Meteor.Error('invalid-post', "Please fill in all the required fields");
        }
        
        var user = Meteor.user();
        var post = _.extend(postAttributes, {
                userId: user._id,
                author: user.username,
                submitted: new Date(),
                flag: 0
            });
        
        var postId = Posts.insert(post);
        
        return {
            _id: postId
        };
    },
    
    
    flag(postId) {
        var updated = Posts.update(postId, {$inc: {flags: 1}});
    },
    
    
    deletePost(postId) {
        let toDelete = Posts.findOne(postId);
        if (toDelete == null) {
            console.log("No posting found for to be deleted.");
            return;
        }
        Posts.remove({_id: postId});
    }
});