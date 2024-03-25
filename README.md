# Kafka-Interface

### <a name="getting-started"></a> Getting Started

```sh
npm install kafka-interface
```
#### <a name="usage"></a> Usage
#### <a name="Producer"></a> Producer
```javascript
// Producer config
const producer = require('kafka-interface');
producer.clientId = 'my-app';
producer.brokers = ['localhost:9092'];
producer.allowTopicCreation = false;
producer.transactionTimeout = 30000;
producer.acknowledgementLevel = 0;

// produce message
// take parameters : topic_name, message_type, payload
producer.produceMessage('topicName', 'userCreate', {"userId": 55, "name": "full name"});
```

#### <a name="Consumer"></a> Consumer
```javascript
// consumer config
const consumer = require('kafka-interface');
consumer.clientId = 'my-app';
consumer.brokers = ['localhost:9092'];
consumer.groupId = 'my-group';
consumer.fromBeginning = true;

// consume message
// take array of object{topic_name: "topicName", callback: function()}
consumer.consumeMessage([{topic_name: "topicName", callback: (payload) => {
    console.log(payload);
}}]);
```