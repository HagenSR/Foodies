var mongo = require('mongoose');

mongo.connect("mongodb+srv://hagensr:lSu3172O2NjrzKO2KWJ9@cluster0-3yaji.mongodb.net/test?retryWrites=true&w=majority", { dbName: "Foods", useUnifiedTopology: true }, function (err, response) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to ");
    };
});

var Schema = mongo.Schema;

var FoodSchema = new Schema({
    ID: { type: String },
    Shrt_Desc: { type: String },
    Water: { type: String },
    cal: { type: String },
    Protein: { type: String, },
    Carbs: { type: String },
    Fiber: { type: String },
    Sugar: { type: String },
    CalciumMG: { type: String },
    IronMG: { type: String },
    SodiumMG: { type: String },
    SatFat: { type: String },
    MonoFat: { type: String },
    PolyFat: { type: String },
    GrmWT: { type: String },
    GrmDesc: { type: String }
}, { versionKey: false });


find("Choc")

async function find(input, fn) {
    var db = mongo.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        var model = mongo.model("abbrev", FoodSchema, "abbrev");
        model.find({ Shrt_Desc: { $regex: input.toUpperCase(), $options: 'i' } },function(err,docs){
            if (err) {
                console.log(err);
            } else {
               console.log(docs);
            }
        }).limit(25);
    });
}





