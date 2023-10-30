const router =  require("express").Router();
const {User,validate} = require("../models/user")
const Token = require("../models/token")
const crypto = require("crypto")
const sendEmail = require("../sendEmail")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")




const jwt = require("jsonwebtoken")


router.post("/", async(req,res) =>{

    try{
        const {error} = validate(req.body);
        if(error)
                return res.status(400).send({message:error.details[0].message })


        let user = await User.findOne({email:req.body.email});


        if(user) 
                return res.status(409).send({message:"user with given emailid already exist"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT));

		
        const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		
		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		res.status(201).send({ message: "An Email sent to your account please verify" });           
    
    
    
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:"Internal Server Errorrtee register"});

    }

})


router.get("/:id/verify/:token", async(req,res)=>{


    try {
		const user = await User.findOne({ _id: req.params.id });

		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id}, {verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error in users.js token" });
	}


})



// router.get("/",async(req,res) =>{

// 	try {
// 		const user = await User.find({}).limit(req.query._end);

// 		res.status(200).json(user);

// 	} catch (error) {
// 		res.status(500).json({messge:error.message});
// 	}
// })



// router.get("/profile", async(req,res) =>{

	
// 		const {token} = req.cookies

// 		jwt.verify(token, secret, {}, (err, info) =>{

// 			if(err) throw err;
// 			res.json(info)
// 		})

// })


router.get("/:id", async(req,res) =>{

	try {
		// const user = await User.findOne({ _id: req.params.id });
		const{id} = req.params
		const user = await User.findById(id)

		if (!user) return res.status(400).json({ message: "User Invalid or absent" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).json({ message: "Invalid link" });

		
		
		// const user = await User.findById({_id: req.params.id})  

		if(user){
			console.log(user);
			res.status(200).json(user)
		}
		else{
			res.status(404).json({message:"User not exist"})
		}
	} catch (error) {
		res.status(500).json({message:error.message});

	}
})





// router.use((req, res, next) => {
//     console.log(`In router: ${req.method}:${req.originalUrl}`);
//     next();
// });
module.exports = router;