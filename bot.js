const fs = require('fs'); // Include the fs module to work with the file system

// Function to save user IDs to a text file
function saveUserIdsToFile(userIds) {
  // Define the file path where you want to save the user IDs
  const filePath = 'user_ids.txt';

  // Join the user IDs with newlines
  const data = userIds.join('\n');

  // Write the data to the file
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error('Error saving user IDs to file:', err);
    } else {
      console.log('User IDs saved to file:', filePath);
    }
  });
}

const TelegramBot = require('node-telegram-bot-api');
const token = '6674775946:AAERrObpUZ6QNUOxRrozlXHoqfsM8o0VcS0'; // Replace with your bot token
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start(@\w+)?/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Check if the message is in a group or supergroup
  if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
    // Send the message with the "web_app" property to the group chat
    sendWithWebAppKeyboard(chatId, userId);

    // If there is a mention in the message, reply to the user with a DM
    if (match && match[1]) {
      const mentionedUsername = match[1].replace('@', '');
      bot.sendMessage(userId, `Click here to launch the app 👇`, { reply_markup: JSON.stringify({ inline_keyboard: keyboard.inline_keyboard }) });
    }
  } else if (msg.chat.type === 'private') {
    // Send the message with the "web_app" property for DMs
    sendWithWebAppKeyboard(userId, userId);
    
    // Save the user ID of the user who used the bot
    saveUserIdsToFile([userId]);
  }
});

function sendWithWebAppKeyboard(chatId, userId) {
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: 'Play Now!',
          web_app: { url: 'https://gamdom.one' }
        }
      ]
    ]
  };

  // Sending message to the group chat with "web_app" property
  bot.sendMessage(
    chatId,
    'Click here to launch the app 👇',
    { reply_markup: JSON.stringify({ inline_keyboard: keyboard.inline_keyboard }) }
  );

  // Sending DM to the user with "web_app" property
  if (chatId !== userId) {
    bot.sendMessage(
      userId,
      'Click here to launch the app 👇',
      { reply_markup: JSON.stringify({ inline_keyboard: keyboard.inline_keyboard }) }
    );
  }
}
