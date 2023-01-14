const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
require ("dotenv").config({path:".env"})

//Settings
app.set("port", process.env.PORT || 3001)
mercadopago.configure({
	access_token: process.env.ACCESS_TOKEN,
});

//midlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


//routes


app.post("/create_preference", async(req, res) => {

	let preference = {
		items: [
			{
				title: req.body.title,
                currency_id: "ARS",
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:3000",
			"failure": "http://localhost:3000",
			"pending": ""
		},
		auto_return: "approved",
        binary_mode:true//no pending payments
	};

    try{
       const response = await mercadopago.preferences.create(preference)
       res.status(200).json({response})

    } catch (error) {
	res.status(500).json({error})
	};
});

//app
app.get("/", (req,res)=>{
    res.send("API RUNNING AND READY TO TAKE DATA")
})


app.listen(app.get("port"), ()=>{console.log(`app succesfully runnint in port ${app.get("port")}`)})