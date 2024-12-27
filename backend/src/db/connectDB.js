const mongoose  = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ishita928:qwerty123@cluster0.1lszv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() =>{
        console.log("Database connected")
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = connectDB;