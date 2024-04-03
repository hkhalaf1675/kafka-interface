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
// take object{topics: {[topic_1, topic_1], callback: function()}
consumer.consumeMessage( {topics: [topic_1, topic_2], callback: (message) => {
    const payload = message.payload
    if(message.type == "type1"){
        
        // handle logic of messages
    }
    else{
        
        // handle logic of messages
    }
}});
```