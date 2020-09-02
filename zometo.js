module.exports=((routes,fetch)=>{
  // categories
  routes
      .get('/categories/:id',(req,res)=>{
        let catagory_id=req.params.id;
        fetch('https://developers.zomato.com/api/v2.1/categories',{      
          method: "GET",
          headers: {
          "user-key": "93e4da5293cdf6b2eedaf0e4145d98c4",
          "content-type": "application/json"
          }})
          .then(data =>{
            return data.json()
          }).then((body) =>{
            let list=[]
            for(i of body.categories){
              if(i.categories.id==catagory_id){
                let dict={
                  "category_id":i.categories.id.toString(),
                  "category_name": i.categories.name
                }
                list.push(dict)
              }
            }
            res.json(list)
          }).catch(err=>{
            res.send(err)
          })
      })

    // city and id
    routes
        .get('/city/:id',(req,res)=>{
          let name=req.query.name
          var str=""
          for (i of name){
              if (i==" "){
                  str+="%20"
              }else if(i==","){
                  continue
              }else{
                  str+=i
              }
          }
          let id=req.params.id;
          let url='https://developers.zomato.com/api/v2.1/cities?q='+str;
          fetch(url,{      
            method: "GET",
            headers: {
            "user-key": "93e4da5293cdf6b2eedaf0e4145d98c4",
            "content-type": "application/json"
            }})
            .then(data =>{
              return data.json()
            }).then((body) =>{
              // console.log(body)
              let list=[]
              for(i of body.location_suggestions){
                if(i.id==id){
                  let dict={
                    "id": i.id,
                    "name": i.name,
                    "country_id": i.country_id,
                    "country_name": i.country_name,
                    "is_state": i.is_state,
                    "state_id": i.state_id,
                    "state_name": i.state_name,
                    "state_code": i.state_code
                  }
                  list.push(dict)
                }
              }
              res.json(list)
            }).catch(err=>{
              res.send(err)
            })
        })


    // collection
    routes
        .get('/collection/:id',(req,res)=>{
          let id=req.params.id;
          let url='https://developers.zomato.com/api/v2.1/collections?city_id=280';
          fetch(url,{      
            method: "GET",
            headers: {
            "user-key": "93e4da5293cdf6b2eedaf0e4145d98c4",
            "content-type": "application/json"
            }})
            .then(data =>{
              return data.json()
            }).then((body) =>{
              let list=[]
              for(i of body.collections){
                // console.log(i.collection.collection_id)
                if(i.collection.collection_id==id){
                  res.json(i.collection.collection_id)
                  let dict = {
                    "collection_id":i.collection.collection_id.toString(),
                    "title":i.collection.title,
                    "url":i.url,
                    "description": i.collection.description,
                    "image_url": i.collection.image_url,
                    "res_count": (i.collection.res_count).toString(),
                    "share_url": i.collection.share_url
                  }
                  list.push(dict)
                }
              }
              res.json(list)
            }).catch(err=>{
              res.send(err)
            })
        })
    
  //by geocode (lat and lon)
    routes
        .get('/geocode',(req,res)=>{
          let lat=req.query.lat;
          let lon=req.query.lon
          let url='https://developers.zomato.com/api/v2.1/geocode?lat='+lat+'&lon='+lon;
          console.log(url)
          fetch(url,{      
            method: "GET",
            headers: {
            "user-key": "93e4da5293cdf6b2eedaf0e4145d98c4",
            "content-type": "application/json"
            }})
            .then(data =>{
              return data.json()
            }).then((body) =>{
              res.send(body)
            }).catch(err=>{
              res.send(err)
            })
        })


    //locations by city name
    routes
        .get('/locations',(req,res)=>{
          let city_name=req.query.city_name
          var str=""
          for (i of city_name){
              if (i==" "){
                  str+="%20"
              }else if(i==","){
                  continue
              }else{
                  str+=i
              }
          }
          let url='https://developers.zomato.com/api/v2.1/locations?query='+str;
          fetch(url,{      
            method: "GET",
            headers: {
            "user-key": "93e4da5293cdf6b2eedaf0e4145d98c4",
            "content-type": "application/json"
            }})
            .then(data =>{
              return data.json()
            }).then((body) =>{
              let list=[]
              let dict={
                  "entity_type":body.location_suggestions[0].entity_type,
                  "entity_id":body.location_suggestions[0].entity_id.toString(),
                  "title": body.location_suggestions[0].title,
                  "latitude": body.location_suggestions[0].latitude,
                  "longitude":body.location_suggestions[0].longitude,
                  "city_id": body.location_suggestions[0].city_id.toString(),
                  "city_name": body.location_suggestions[0].city_name,
                  "country_id": body.location_suggestions[0].country_id.toString(),
                  "country_name":body.location_suggestions[0].country_name
                }
                list.push(dict)
                res.json(list)
            }).catch(err=>{
              res.send(err)
            })
        })

  // searc by
  //location_details by entity_id and entity_type 
  // entity_id=2&entity_type=city
  routes
      .get('/location_details',(req,res)=>{
        let entity_id=req.query.entity_id;
        let entity_type=req.query.entity_type;
        let url='https://developers.zomato.com/api/v2.1/location_details?'+'entity_id='+entity_id+'&'+'entity_type='+entity_type;
        fetch(url,{      
          method: "GET",
          headers: {
          "user-key": "93e4da5293cdf6b2eedaf0e4145d98c4",
          "content-type": "application/json"
          }})
          .then(data =>{
            return data.json()
          }).then((body) =>{
            let list=[]
            for (i of body.best_rated_restaurant){
              if (i.restaurant.has_online_delivery!=0){
                has_online_delivery="yes";
              }else{
                has_online_delivery="no"
              }
              var highlights= [];
              for(var j=0;j<3;j++){
                  highlights.push(i.restaurant.highlights[j]);
              }
              let indivisual_resturent={
                'Name' : i.restaurant.name,
                'Link' : i.restaurant.url,
                'Address' : i.restaurant.location.address,
                'Cuisines' : i.restaurant.cuisines.split(',').splice(3,i.restaurant.cuisines.split(',').length),
                'Timings' : i.restaurant.timings,
                'Average Cost' : i.restaurant.average_cost_for_two,
                'Rating' : i.restaurant.user_rating.aggregate_rating,
                'rating_text':i.restaurant.user_rating.rating_text,
                'Image Url' : i.restaurant.featured_image,
                'Contact' : i.restaurant.phone_numbers,
                'online_delivery':has_online_delivery,
                'highilights':highlights
              }
              list.push(indivisual_resturent)
            }
        
            res.send(list);
          }).catch(err=>{
            res.send(err)
          })
      })
})




