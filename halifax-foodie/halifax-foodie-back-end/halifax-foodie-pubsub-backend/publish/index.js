/*
References
1. https://cloud.google.com/functions/docs/calling/pubsub

*/

const {PubSub} = require('@google-cloud/pubsub');

const pubsub = new PubSub();

exports.publish = async (req, res) => {
   res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader("Access-Control-Allow-Headers", "content-type");

  console.log("Inside publish api")

  if (req.method === "OPTIONS") {
    // stop preflight requests here
    res.status(204).send('');
    return;
  }

  if (!req.body.topic || !req.body.message) {
    res
      .status(400)
      .send(
        'Missing parameter(s); include "topic" and "message" properties in your request.'
      );
    return;
  }

  console.log(`Publishing message to topic ${req.body.topic}`);

  // References an existing topic
  const topic = pubsub.topic(req.body.topic);


  const messageBuffer = Buffer.from(req.body.message, 'utf8');

   // Publishes a message
  try {
    const messageId=await topic.publish(messageBuffer);
     
    console.log(`Message ${messageId} published.`);
    res.status(200).json({
            message: "Message Published!!",
            success:true,
            id:messageId            
        });
    
   
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
    return Promise.reject(err);
  }
};
