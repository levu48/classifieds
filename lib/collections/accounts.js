AppAccounts = new Mongo.Collection('app-accounts');

Meteor.methods({
    accountInsert(postId) {
        let user = Meteor.user();
        let rec = AppAccounts.find({userId: user._id}).fetch();
        if (rec.length === 0) {
            let accountId = AppAccounts.insert({
                userId: user._id,
                saves: [postId]
            });
            return accountId;
            
        } else {
            let i = rec[0].saves.indexOf(postId);
            if (i > -1) {
                rec[0].saves.splice(i,1);
            } else {
                rec[0].saves.push(postId);
            }
            
            AppAccounts.update(rec[0]._id, { 
                    userId: user._id, 
                    saves: rec[0].saves 
                });
            return rec[0]._id;
        }
    }
});