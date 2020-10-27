exports = function(){

  let f = [
    {
      $group:
        {
           _id: "$category",
           count: { $sum: 1 }
        }
     }
  ]
  

    var collection = context.services.get("mongodb-atlas").db("apotheke").collection("items");
    var doc = collection.aggregate(f).toArray()


  return doc
};




exports = function(){

  let f = [
    {
      $unwind:
      {
        path: "$packType",
      }
     },
    {
      $group:
        {
          _id: "$packType",
          count: { $sum: 1 }
        }
    }
  ]
  

    var collection = context.services.get("mongodb-atlas").db("apotheke").collection("items");
    var doc = collection.aggregate(f).toArray()


  return doc
};