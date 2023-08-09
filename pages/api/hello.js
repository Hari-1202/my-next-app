// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDatabase } from "@/db";

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }


// import { connectDatabase } from '../../path-to-db.js';

export default async function handler(req, res) {
  const db = await connectDatabase();
  const collection = db.collection('Movies');

  //merges all array into a single one
  const aggregate_query_addTofield =  [
    {
      '$match': {
        'title': 'Avatar'
      }
    }, {
      '$group': {
        '_id': '$title', 
        'totalSeats': {
          '$sum': '$seatsAvailable'
        }, 
        'seatsBooked': {
          '$addToSet': {
            '$concatArrays': [
              '$seatsBooked'
            ]
          }
        }
      }
    }, {
      '$project': {
        'totalSeats': 1
      }
    }
  ]
   //merge - inserts , out - replaces
  const merge = [
    // {
    //   $match: {
    //     title: {
    //       $exists: true,
    //     },
    //   },
    // }
    {
      $group:
        /**
         * _id: The id of the group.
         * fieldN: The first field name.
         */
        {
          _id: {
            $concat: ["hello1", "$title"],
          },
          seatsAvailable1: {
            $sum: "$seatsAvailable",
          },
          seatsDenied: {
            $push: {
              seatsAvailable: "c",
              totalSeats: {
                $sum: "$seatsAvailable",
              },
            },
          },
        },
    },
    // {
    //   $unwind:
    //     /**
    //      * path: Path to the array field.
    //      * includeArrayIndex: Optional name for index.
    //      * preserveNullAndEmptyArrays: Optional
    //      *   toggle to unwind null and empty values.
    //      */
    //     {
    //       path: "$seatsDenied",
    //     },
    // }
    // {
    //   $out:
    //     /**
    //      * Provide the name of the output collection.
    //      */
    //     "Todo",
    // }
    {
      $merge:
        /**
         * into: The target collection.
         * on: Fields to  identify.
         * let: Defined variables.
         * whenMatched: Action for matching docs.
         * whenNotMatched: Action for non-matching docs.
         */
        {
          into: "dummies",
          whenMatched: "merge",
          whenNotMatched: "insert",
        },
    },
  ]
  //uses unwind to separate and display the docs
  const aggregate_query_push = [
    {
      '$match': {
        'title': 'Avatar'
      }
    }, {
      '$group': {
        '_id': '$title', 
        'totalSeats': {
          '$sum': '$seatsAvailable'
        }, 
        'seatsBooked': {
          '$push': {
            '$concatArrays': [
              '$seatsBooked'
            ]
          }
        }
      }
    }, {
      '$project': {
        'totalSeats': 1, 
        'seatsBooked': 1
      }
    }, {
      '$unwind': {
        'path': '$seatsBooked'
      }
    }
  ]


  //using facet to run parallel aggregations and project to combinedArrays and then unwimnd to split them
  const facet_query = [
    {
      '$facet': {
        'new_1': [
          {
            '$match': {
              'title': 'Avatar'
            }
          }
        ], 
        'new_2': [
          {
            '$match': {
              'title': 'Avatar'
            }
          }
        ]
      }
    }, {
      '$project': {
        'combinedArrays': {
          '$concatArrays': [
            '$new_1', '$new_2'
          ]
        }
      }
    }, {
      '$unwind': {
        'path': '$combinedArrays'
      }
    }
  ]
  
  //Redact query if , else (prune - discard , keep - keep)
  const prune_query = [
    {
      '$redact': {
        '$cond': {
          'if': {
            '$eq': [
              '$title', 'Avatar'
            ]
          }, 
          'then': '$$PRUNE', 
          'else': '$$KEEP'
        }
      }
    }
  ]

  const insert_query = {"_id":"63c903a8a7fd32635618de38","loginId":"63a154024dedcbb87d39c367","todoList":["good","to see yoy"],"todoList1":["good","to see yoy"],"__v":{"$numberInt":"0"}}
  
  // const result = await collection.find({title: "Avatar"}).toArray()
  // const result = await collection.aggregate(aggregate_query_push).toArray()

  const result = await collection.updateOne({_id : "63c903a8a7fd32635618de38"}, {$set:{todoList1:["good","to see yoy"]}})
  return res.json({result})
    
  // Perform database operations using the 'collection' object
  // ...
}