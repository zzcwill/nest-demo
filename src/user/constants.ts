let rabbitMqOption = {
  username:'root',
  password:'root',
  authMechanism: 'AMQPLAIN' ,
  pathname:'/'
}

export const RABBIT_TEST_PATTERN = "mqPattern"
export const RABBITMQ_URL = `amqp://${rabbitMqOption.username}:${rabbitMqOption.password}@127.0.0.1:5672`;
export const RABBITMQ_QUEUE_NAME = "mq-queue"
