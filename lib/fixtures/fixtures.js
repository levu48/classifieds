if (Meteor.isServer) {
    
    Meteor.startup(function() {
        if (Entries.find().count() === 0) {
            let entriesFixtures = JSON.parse(
                Assets.getText('fixtures/entries_restaurants.json')
            );
            
            _.each(entriesFixtures, function(entry) {
                Entries.insert(entry);
            });
        }
    });
    
    /*
    Meteor.startup(function() {
        if (Posts.find().count() === 0) {
            for (let i=0; i<4; i++) {
                Posts.insert({
                    userId: "jsun246",
                    email:  "jsun246@gmail.com",
                    number: "+17144489000",
                    title: "post# " + i,
                    category: Utils.getRandomCategory(),
                    image: "/resources/blue-camera-icon.png",
                    description: "This is the description for this post!",
                    price: "300",
                    city: "Dar-Es-Salaam",
                    region: "Mbezi",
                    flags: 0
                });
            }
        }
    });
    */
}

if (!AppObj) AppObj = {};
 

AppObj.categories = [
    {
		_id: "for-sale",
		name: "forSale",
        subtitle: "forSale-sub",
		image: "/resources/for_sale.png",
        link: "/cat/for-sale"
	},
    
    {
		_id: "hair-nails",
		name: "nails",
        subtitle: "nails-sub",
		image: "/resources/hairNails.png",
        link: "/cat/hair-nails"
	},    
    {
        _id: "housing",
        name: "housing",
        subtitle: "housing-sub",
        image: "/resources/housing.png",
        link: "/cat/housing",
        categories: [
            {
                _id: "house-rent",
                name: "housesForRent",
                subtitle: "housesForRent-sub",
                image: "/resources/housing.png",
                link: "/cat/house-rent"
            },
            {
                _id: "apt-condo-rent",
                name: "aptCondoForRent",
                subtitle: "aptCondoForRent-sub",
                image: "/resources/housing.png",
                link: "/cat/apt-condo-rent"
            },
            {
                _id: "room-rent",
                name: "roomsForRent",
                subtitle: "roomsForRent-sub",
                image: "/resources/housing.png",
                link: "/cat/room-rent"
            },
            {
                _id: "house-for-sale",
                name: "housesForSale",
                subtitle: "housesForSale-sub",
                image: "/resources/housing.png",
                link: "/cat/house-for-sale"
            }
        ]
	},
    {
        _id: "jobs",
        name: "jobs",
        subtitle: "jobs-sub",
        image: "/resources/chef.png",
        link: "/cat/jobs",
        categories: [
            {
                _id: "jobs-work",
                name: "jobsWork",
                subtitle: "jobsWork-sub",
                image: "/resources/chef.png",
                link: "/cat/jobs-work"
            },
            {
                _id: "jobs-household",
                name: "jobsHousehold",
                subtitle: "jobsHousehold-sub",
                image: "/resources/chef.png",
                link: "/cat/jobs-household"
            },
            {
                _id: "jobs-company",
                name: "jobsCompany",
                subtitle: "jobsCompany-sub",
                image: "/resources/chef.png",
                link: "/cat/jobs-company"
            },
            {
                _id: "jobs-office",
                name: "jobsOffice",
                subtitle: "jobsOffice-sub",
                image: "/resources/chef.png",
                link: "/cat/jobs-office"
            },
            {
                _id: "jobs-food",
                name: "jobsFood",
                subtitle: "jobsFood-sub",
                image: "/resources/chef.png",
                link: "/cat/jobs-food"
            },
            {
                _id: "jobs-texttile",
                name: "jobsTexttile",
                subtitle: "jobsTexttile-sub",
                image: "/resources/chef.png",
                link: "/cat/jobs-texttile"
            }
        ]
    },
    
    {
		_id: "automobiles",
		name: "automobiles",
        subtitle: "automobiles-sub",
		image: "/resources/automobiles.png",
        link: "/cat/automobiles"
	},
    
    {
		_id: "opportunities",
		name: "opportunities",
        subtitle: "opportunities-sub",
		image: "/resources/opportunities.png",
        link: "/cat/opportunities"
	},

	{
		_id: "services",
		name: "services",
        subtitle: "services-sub",
		image: "/resources/services.png",
        link: "/cat/services"
	},

	{
		_id: "communities",
		name: "communities",
        subtitle: "communities-sub",
		image: "/resources/community.png",
        link: "/cat/communities"
	},

	{
		_id: "wanted",
		name: "wanted",
        subtitle: "wanted-sub",
		image: "/resources/wanted.png",
        link: "/cat/wanted"
	}


];


AppObj.Items = [
	{
		_id: "001",
		name: "Mountain Bike",
		image: "/resources/mountain_bike.jpg",
		cateogories: ["for_sale", "wanted"]
	},

	{
		_id: "002",
		name: "10 String Classical Guitar",
		image: "/resources/10_string_classical_guitar.jpg",
		cateogories: ["services", "for_sale"]
	},

];
