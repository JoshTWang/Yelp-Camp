const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// get a random element from an array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({}); // remove everything in the DB
    for (let i = 0; i < 300; i += 1) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '631a24718053ec0ba7e2f8ab',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            description: 'Nice Place to go camping. Can not wait for you!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dux0yqckq/image/upload/v1662692161/YelpCamp/ojpplivmrulbdg67plmm.jpg',
                    filename: 'YelpCamp/ojpplivmrulbdg67plmm',
                },
                {
                    url: 'https://res.cloudinary.com/dux0yqckq/image/upload/v1662691404/YelpCamp/kkrmgfzyidkeron4mkob.jpg',
                    filename: 'YelpCamp/jzswhhwlb9has0in8fc9',
                }
            ]
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close() // close the DB
    })