// import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
// import { Kafka, logLevel } from 'kafkajs';

// @Injectable()
// export class KafkaService implements OnModuleInit {
//   private readonly logger = new Logger(KafkaService.name);
//   private kafka: Kafka;
//   private producer;
//   private consumer;

//   constructor() {
//     this.kafka = new Kafka({
//       clientId: 'oeapi-app',
//       brokers: ['kafka:9092'],
//       logLevel: logLevel.INFO,
//     });
//   }

//   async onModuleInit() {
//     try {
//       console.log('Initializing Kafka producer...');
//       this.producer = this.kafka.producer();
//       console.log('Kafka producer initialized');

//       console.log('Initializing Kafka consumer...');
//       this.consumer = this.kafka.consumer({ groupId: 'oeapi-group' });
//       await this.runConsumer();
//       console.log('Kafka consumer initialized');
//     } catch (error) {
//       this.logger.error(`Error initializing Kafka Consumer: ${error.message}`);
//     }
//   }

//   async sendMessage(topic: string, message: any) {
//     if (!this.producer) {
//       console.error('Producer not initialized');
//       return;
//     }
//     try {
//       await this.producer.connect();
//       await this.producer.send({
//         topic,
//         messages: [{ value: JSON.stringify(message) }],
//       });
//     } catch (error) {
//       this.logger.error(`Error sending message: ${error.message}`);
//     } finally {
//       await this.producer.disconnect();
//     }
//   }

//   async runConsumer() {
//     try {
//       this.consumer = this.kafka.consumer({ groupId: 'oeapi-group' });
//       await this.consumer.connect();
//       await this.consumer.subscribe({ topic: 'oeapi', fromBeginning: true });

//       await this.consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//           console.log({
//             value: message.value?.toString(),
//             topic,
//             partition,
//           });
//         },
//       });
//     } catch (error) {
//       this.logger.error(`Error running consumer: ${error.message}`);
//     }
//   }
// }
