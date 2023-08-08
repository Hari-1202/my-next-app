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
  // const result = await collection.find({title: "Avatar"}).toArray()
  const result = await collection.aggregate(aggregate_query_push).toArray()
  return res.json({result})
    
  // Perform database operations using the 'collection' object
  // ...
}