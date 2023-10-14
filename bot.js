const fs = require('fs'); // Include the fs module to work with the file system

// Define a variable to keep track of the last message timestamp
let lastMessageTimestamp = Date.now();

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
const token = '6674775946:AAHqSjfv6jX1rVs497CwpsEEVQ2Sw8RhoEg'; // Replace with your bot token
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start(@\w+)?/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Update the last message timestamp
  lastMessageTimestamp = Date.now();

  // Check if the message is in a group or supergroup
  if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
    // Send the group message before sending a DM to the user
    bot.sendMessage(chatId, 'I'm sending you instructions via DM 👑');

    // If there is a mention in the message, reply to the user with a DM
    if (match && match[1]) {
      const mentionedUsername = match[1].replace('@', '');
      bot.sendMessage(userId, `Click here to launch the app 👇`, {
        reply_markup: JSON.stringify({ inline_keyboard: keyboard.inline_keyboard })
      });
    }
  } else if (msg.chat.type === 'private') {
    // Save the user ID of the user who used the bot
    saveUserIdsToFile([userId]);

    // Send the message with the "web_app" property for DMs
    sendWithWebAppKeyboard(userId, userId);
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

// Check if the node is running every 2 minutes
setInterval(() => {
  const currentTime = Date.now();
  const twoMinutesInMilliseconds = 2 * 60 * 1000;

  // If it's been more than 2 minutes since the last message
  if (currentTime - lastMessageTimestamp > twoMinutesInMilliseconds) {
    console.log('The bot has not received a message in the last 2 minutes!');
    // Perform your desired action here, e.g., send an alert or restart the node
  }
}, 2 * 60 * 1000); // Run the function every 2 minutes
