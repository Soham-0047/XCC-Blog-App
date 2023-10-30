require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db")
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")


connection();    


app.use(express.json());

app.use(cors());

// app.use(cors({credentials:true, origin:'http://localhost:5173'}))


// app.use((_req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
  
//     next();
//   });

// app.get('/',(req,res)=>{
//     res.send({message:"Welcome"})
// })

app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)

    

const port = process.env.PORT || 8080;
app.listen(port,console.log(`Listening Port http://localhost:${port}`)); 





// const startserver = async() =>{
//     try {
//         connection();
//        app.listen(port,console.log(`Listening Port http://localhost:${port}`));    
//     } catch (error) {
//         console.log(error)
//     }
 
// }
// startserver();
