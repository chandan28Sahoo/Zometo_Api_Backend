const fetch = require('node-fetch');
const express=require('express')
const app = express();
const router=express.Router()
app.use('/',router)
router.use(express.json())

app.get('/',(req,res)=>{
    res.send("home")
    console.log("connected")
})

// sign_up
router.use("/data",router)
require("./zometo")(router,fetch);



app.listen(3000,()=>{
    console.log("server is running on port 3000");
})






















// const request=require('request');

// var Headers={userKey: '93e4da5293cdf6b2eedaf0e4145d98c4'}
// var req=request.get('https://developers.zomato.com/api/v2.1/cities?q={{new delhi}}',headers=Headers);
// console.log(req.text)
  //     if(!error && res.statusCode==200){



// var client = zomato.createClient({
//     userKey: '93e4da5293cdf6b2eedaf0e4145d98c4', //as obtained from [Zomato API](https://developers.zomato.com/apis)
// });



// app.get('/data_by_q/:q',(req,res)=>{
    // client.getCategories(null,(err, result)=>{
    //     if(!err){
    //       res.send(result);
    //     }else {
    //       console.log(err);
    //     }
    // // });
    // client.getCities({
    //     q:req.params.q, //query by city name
        // lat:"28.613939", //latitude
        // lon:"77.209021", //longitude
        // city_ids:"1,2,3", //comma separated city_ids value
        // count:"2" // number of maximum result to display
//         },(err, result)=>{
//             if(!err){
//               console.log(result);
//             }else {
//               console.log(err);
//             }
//         });
// })


// app.listen(3000,()=>{
//     console.log("server is running port 3000")
// })