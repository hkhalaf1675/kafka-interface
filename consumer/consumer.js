const {Kafka} = require('kafkajs');
require('dotenv').config();

let kafkaConsumer = {};
let kafka = null;
let consumer = null;

// configuration of kafka nad consumer

/**
 * @typedef {object} kafkaProducer
 * @property {string} clientId 
 * @property {Array<Broker>} brokers 
 * @property {string} groupId 
 * @property {boolean} fromBeginning 
 */
kafkaConsumer.clientId = process.env.KAFKA_CLIENT_ID;
kafkaConsumer.brokers = ["localhost:9092"];
kafkaConsumer.groupId = "my-group";
kafkaConsumer.fromBeginning = false;

/**
   *
   * @param {object} params Example: (topics: [topic_1, topic_2, ...], callback: function())
   */
kafkaConsumer.consumeMessage = async(params) => {
    try {
        if(!kafka){
            kafka = new Kafka({
                clientId: kafkaConsumer.clientId,
                brokers: kafkaConsumer.brokers
            });
        }
    
        if(!consumer){
            consumer = kafka.consumer({
                groupId: kafkaConsumer.groupId
            });
        }
    
        await consumer.connect();

        await consumer.subscribe({topics: params.topics});

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try{
                    const messagePayload = JSON.parse(message.value.toString());
                    if(params.callback){
                        params.callback(topic, messagePayload);
                    }
                    else{
                        console.log("Error: object not have callback function . ex of obj {topic_name: 'topic', callback: function()");
                    }
                }
                catch(error){
                    console.log(`Error in parsing: ${error}`);
                }
            }
        });
        
    } catch (error) {
        console.log({error: error.message});
    }
}

module.exports = kafkaConsumer;