const TelegramBot = require('node-telegram-bot-api');
const token = '6684136644:AAHFNMGbc5ry-98hYyw_FFlhUgl2RvqDA3k';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const message = msg.text;
  let keyboard;  // Declare keyboard outside of if block to make it accessible below
  
  if (message === '/start') {
    keyboard = {
      inline_keyboard: [
        [
          {
            text: 'Play Now',
            web_app: { url: 'https://gamdom.one' }
          }
        ]
      ]
    };
    
    // Sending message to the group chat
    bot.sendMessage(
      chatId,
      'Click here to launch the app 👇',
      { reply_markup: JSON.stringify(keyboard) }
    );
    
    // Sending DM to the user if the message is from a group chat
    if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
      bot.sendMessage(
        userId,
        'You started the game in the group chat!',
      );
    }
    
  } else {
     keyboard = {
      inline_keyboard: [
        [
          {
            text: 'Play Now',
            web_app: { url: 'https://gamdom.one' }
          }
        ]
      ]
    };
    
    bot.sendMessage(
      chatId,
      'Click here to launch the app 👇',
      { reply_markup: JSON.stringify(keyboard) }
    );
  }
});