



function fetchData() {
  fetch('https://www.tradingview.com/conversation-status/?_rand=0.46910101152052874&offset=0&room_id=bitcoin&stat_interval=60&size=10')
    .then(response => response.json())
    .then(data => {
       // const data = JSON.parse(response);
        const messages = data.messages;
        
        const timestampToSeconds = (timestamp) => {
          const parts = timestamp.split(' ')[4].split(':');
          const seconds = (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]);
          return seconds;
        }
        
        const messagesPerMinute = (messages) => {

          const lastTimestamp = timestampToSeconds(new Date().toUTCString())
          const firstTimestamp =timestampToSeconds(messages[messages.length-1].time);
          const durationMinutes = (lastTimestamp - firstTimestamp) / 60;
          const count = messages.length;
          const rate = count / durationMinutes;
          return rate;
        }
        
        console.log(`Chat Speed: ${messagesPerMinute(messages)} messages per minute`);
    })
    .catch(error => {
      console.error(error);
    });
}

setInterval(fetchData, 5000);
