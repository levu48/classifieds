import cheerio from 'cheerio';

Meteor.methods({
    
    scrape(url, key) {
        console.log(url, key);       
        const fixedUrl = "http://raovat.viendongdaily.com/chuyen-muc/650-viec-hair--nail-650.html?pg=6";
        
        const url2 = url || fixedUrl;
        let result = Meteor.http.get(url2);
        let $ = cheerio.load(result.content, {decodeEntities: true});
        //let tmp = $('.TBLRoll a').map(function(i, el) {
        let tmp = $(key).map(function(i, el) {
            let str = $(this).text();
            if (str.indexOf("(function") <= 0 && str.indexOf("googletag") <= 0) {
                return str;
            } else {
                return "";
            }
        }).filter(function(s) { if(s === "") return false; else return true; } ).get();
        console.log(url2, tmp);
        return tmp;    
    },
    
    saveScrape(url, key, catId) {
        if (!Meteor.user()) {
            throwError("No user logged in. No permission.");
        }
        const fixedUrl = "http://raovat.viendongdaily.com/chuyen-muc/650-viec-hair--nail-650.html?pg=6";
        
        const url2 = url || fixedUrl;
        let result = Meteor.http.get(url2);
        let $ = cheerio.load(result.content, {decodeEntities: true});
        //let tmp = $('.TBLRoll a').map(function(i, el) {
        let tmp = $(key).map(function(i, el) {
            let str = $(this).text();
            if (str.indexOf("(function") <= 0 && str.indexOf("googletag") <= 0) {
                return str;
            } else {
                return "";
            }
        }).filter(function(s) { if(s === "") return false; else return true; } ).get();
        
        //console.log(url2, tmp);
        tmp.forEach(function(entry) {
            if (entry && entry !== "") {
                let post = {
                    title: entry.substring(0, entry.indexOf('.')),
                    description: entry,
                    category: catId,
                    city: "Little Saigon",
                    region: "Orange County, Californina",
                    userId: Meteor.user()._id,
                    author: Meteor.user().username,
                    submitted: new Date(),
                    flag: 0
                };
                let postId = Posts.insert(post);
                console.log("postId:", postId, post);
            }
        });
        
        return tmp;
    }
});

