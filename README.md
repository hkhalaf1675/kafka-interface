# Kafka-Interface

## Getting started

```javascript
## Producer
// Producer config

const producer = require('kafka-interface');

producer.clientId = 'my-app';

producer.brokers = ['localhost:9092'];

producer.allowTopicCreation = false;

producer.transactionTimeout = 30000

// produce message

producer.produceMessage('my-topic', 'message my topic');


## Consumer
// consumer config

const consumer = require('kafka-interface');

consumer.clientId = 'my-app';

consumer.brokers = ['localhost:9092'];

consumer.groupId = 'my-group';

// consume message

consumer.consumeMessage(['topic-1', 'topic-2'], (topic, partition, message) => {
    console.log({
        topic,
        partition,
        message
    });
});
