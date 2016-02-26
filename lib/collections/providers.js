Providers = new Mongo.Collection('providers');

if (Meteor.isServer) {
        
    Providers.remove({});

    if (Providers.find().count() === 0) {
        Providers.insert({
            name: 'Nguoi Viet Daily News',
            location: 'Orange County',
            language: 'vi',
            distribution: ['Orange County', 'Los Angeles', 'Pomona'],
            quantity: 15000,
            price: 8,
            options: ['daily', 'weekly', 'weekends']
        });
        
        Providers.insert({ 
            name: 'Vien Dong Daily News',
            location: 'Orange County',
            language: 'vi',
            distribution: ['Orange County', 'Los Angeles'],
            quantity: 10000,
            price: 7,
            options: ['daily', 'weekly', 'weekends']
        });
        
        Providers.insert({
            name: 'Vietmerican Daily News',
            location: 'Pomona',
            language: 'vi',
            distribution: ['Orange County', 'Pomona'],
            quantity: 10000,
            price: 7,
            options: ['daily', 'weekly', 'weekends']
        });
        
        Providers.insert({
            name: 'Chi Linh Magazine',
            location: 'Orange County',
            language: 'vi',
            distribution: ['Orange County'],
            quantity: 10000,
            price: 7,
            options: ['weekly']
        });
        
        Providers.insert({
            name: 'Korean Times',
            location: 'Orange County',
            language: 'ko',
            distribution: ['Orange County', 'Los Angeles'],
            quantity: 10000,
            price: 7,
            options: ['daily']
        });
          
        Providers.insert({
            name: 'OC Weekly',
            location: 'Orange County',
            language: 'en',
            distribution: ['Orange County'],
            quantity: 20000,
            price: 7,
            options: ['weekly']
        });
        
        Providers.insert({
            name: 'El Classificados',
            location: 'Orange County',
            language: 'es',
            distribution: ['Orange County'],
            quantity: 20000,
            price: 7,
            options: ['weekly']
        });
    }
}