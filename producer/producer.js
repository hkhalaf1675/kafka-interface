const {Kafka} = require('kafkajs');
require('dotenv').config();

let kafkaProducer = {};
let kafka = null;
let producer = null;

// configuration of kafka and producer

/**
 * @typedef {Object} kafkaProducer
 * @property {string} clientId 
 * @property {Array<Broker>} brokers 
 * @property {Boolean} allowTopicCreation 
 * @property {Number} transactionTimeout 
 * @property {0 | 1 | all} acknowledgementLevel Example: 0 | 1 | all
 */
kafkaProducer.clientId = process.env.KAFKA_CLIENT_ID;
kafkaProducer.brokers = ["localhost:9092"];
kafkaProducer.allowTopicCreation = false;
kafkaProducer.transactionTimeout = 30000;
kafkaProducer.acknowledgementLevel = 1;

/**
   *
   * @param {String} topic Example: 'topic_1'
   * @param {object} payload Example: {username: 'username', password: 'password'}
   */
kafkaProducer.produceMessage = async(topic, payload) => {
    try {
        if(!kafka){
            kafka = new Kafka({
                clientId: kafkaProducer.clientId,
                brokers: kafkaProducer.brokers
            });
        }
    
        if(!producer){
            producer = kafka.producer({
                allowAutoTopicCreation: kafkaProducer.allowTopicCreation,
                transactionTimeout: kafkaProducer.transactionTimeout
            });
        }
        const message = {
            payload
        };

        const run = async() => {
            await producer.connect();
    
            await producer.send({
                topic: topic,
                messages: [
                    {value: JSON.stringify(message)}
                ]
            });
        }
    
        await run().catch(console.error);
    } catch (error) {
        console.log({error: error});
    }
}

module.exports = kafkaProducer;