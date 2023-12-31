const mongoose =  require("mongoose")

module.exports = () =>{

    const connectionParams = {
        useNewUrlparser: true,
        useUnifiedTopology:true,
    };

    try {
        mongoose.connect(process.env.MONGODB_URL,connectionParams)
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
        console.log("Could not connect the DB");
    }
}