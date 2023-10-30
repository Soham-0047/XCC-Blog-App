
[Project Link](https://github.com/CyberW0lves/AuthInMern/blob/Email-Verify-In-MERN/client/src/components/Singup/index.jsx)


# models -> token.js
```
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({

    userId: {
        type:Schema.Types.ObjectId,
        required:true,
        ref:"user",
        unique:true,
    },

    token:{type:String,required:true},
    createdAt:{type:Date, default:Date.now, expires:5600},
})

module.exports = mongoose.model("token",tokenSchema);
```

# models ->user.js

```
const router =  require("express").Router();
const {User,validate} = require("../models/user")
const Token = require("../models/token")
const crypto = require("crypto")
const sendEmail = require("../sendEmail")
const bcrypt = require("bcrypt")

router.post("/", async(req,res) =>{

    try{
        const {error} = validate(req.body);
        if(error)
                return res.status(400).send({message:error})
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
        res.status(500).send({message:"Internal Server Error"});

    }

})


router.get("/:id/verify/:token/", async(req,res)=>{


    try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}


})

module.exports = router;

```
# routes ->auth.js

```
const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		if (!user.verified) {
			let token = await Token.findOne({ userId: user._id });
			if (!token) {
				token = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
				await sendEmail(user.email, "Verify Email", url);
			}

			return res
				.status(400)
				.send({ message: "An Email sent to your account please verify" });
		}

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
```

# routes -> users.js

```
const router =  require("express").Router();
const {User,validate} = require("../models/user")
const Token = require("../models/token")
const crypto = require("crypto")
const sendEmail = require("../sendEmail")
const bcrypt = require("bcrypt")

router.post("/", async(req,res) =>{

    try{
        const {error} = validate(req.body);
        if(error)
                return res.status(400).send({message:error})
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
        res.status(500).send({message:"Internal Server Error"});

    }

})


router.get("/:id/verify/:token/", async(req,res)=>{


    try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}


})

module.exports = router;
```

