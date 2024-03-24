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
   * @param {Array<object>} params Example: [{topic_name: 'topic', callback: callback()}]
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

        for(const param of params){
            if(param.topic_name){
                await consumer.subscribe({ topic: param.topic_name, fromBeginning: kafkaConsumer.fromBeginning });
                await consumer.run({
                    eachMessage: async ({ topic, partition, message }) => {
                        try{
                            const messagePayload = JSON.parse(message.value.toString());
                            if(param.callback){
                                param.callback(messagePayload);
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
            }
            else{
                console.log('Error: Not valid object: ex of obj { topic_name: "topic", callback: function()}');
            }
        }
    } catch (error) {
        console.log({error: error.message});
    }
}

module.exports = kafkaConsumer;