/*
References
1. https://cloud.google.com/functions/docs/calling/pubsub

*/

	const pubsub = require('@google-cloud/pubsub');
	const subClient = new pubsub.v1.SubscriberClient();

	//const subscriptionName = 'halifaxfoodie-sub';
	var subscriptionName = '';
	const projectId = 'halifax-foodie-320910';
	const timeout = 60;



	exports.subscribe = async (req, res) => {
		subscriptionName=req.body.subscriptionName;
		res.set('Access-Control-Allow-Origin', "*")
		res.set('Access-Control-Allow-Methods', 'GET, POST');
		res.setHeader("Access-Control-Allow-Headers", "content-type");

		console.log("Inside subscribe api");

		if (req.method === "OPTIONS") {
			// stop preflight requests here
			res.status(204).send('');
			return;
		}

	 try {
	const formattedSubscription = subClient.subscriptionPath(projectId, subscriptionName);

	console.log("formattedSubscription::::::"+formattedSubscription);
	const request = {
	  subscription: formattedSubscription,
	  maxMessages: 10,
	};

	const [response] = await subClient.pull(request);
	console.log("after pull")
	const ackIds = [];
	const msgLists=[];
	for (const message of response.receivedMessages) {
	  console.log(`Received message: ${message.message.data}`);
	  console.log(message);
	  msgLists.push(message);
	  ackIds.push(message.ackId);
	}

	
	if(ackIds.length!==0){
		const ackRequest = {
	 	subscription: formattedSubscription,
	 	ackIds: ackIds,
		};

	await subClient.acknowledge(ackRequest);
	}

	 
		   //const ackRequest = { subscription: formattedSubscription,ackIds: ackIds,	};
			//await subClient.acknowledge(ackRequest);
			res.status(200).json({
            message: "Users retrieved!!",
            success:true,
            msg:msgLists            
        });
		} catch (err) {
			console.error(err);
			res.status(500).send(err);
			
		}


	};