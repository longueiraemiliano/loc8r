var mongoose = require( 'mongoose' );

var locationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: String,
    rating: Number,
    facilities: [String],
    rating: {type: Number, "default": 0, min: 0, max: 5}
 });