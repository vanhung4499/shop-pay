const logger = require('../config/logger');
const { consumeMessage } = require('../config/rabbitmq');
const RabbitMQConstants = require('../common/constants/rabbitmq.constant');
const {transactionService} = require("../services");

const handleTransaction = async (message) => {
  try {
    const { transactionId } = JSON.parse(message.content.toString());

    // Process transaction
    await transactionService.processTransaction(transactionId);

  } catch (error) {
    logger.error(`Error handling order close: ${error}`);
    throw error;
  }
};

consumeMessage(RabbitMQConstants.TRANSACTION_QUEUE, handleTransaction);
