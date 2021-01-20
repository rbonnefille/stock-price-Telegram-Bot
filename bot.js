process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const yahooStockPrices = require('yahoo-stock-prices');

const token = '<your-Telegram-bot-token>';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/stock (.+)/, (msg, match) => {
  
  const chatId = msg.chat.id;
  const companyStock = match[1].toUpperCase();

  function getStockprice() {
    return yahooStockPrices.getCurrentPrice(companyStock);
  }
  //TO DO, handling errors and send a message back to the user
  (async () => {
     stockPrice = (await getStockprice());
     const stockPriceString = `${companyStock} share is currently: ${stockPrice}$`;
    bot.sendMessage(chatId, stockPriceString);
  })()
});
