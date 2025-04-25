javascript:(function(){
    const TARGET = 'https://api.cohere.com/v2/chat';
    const KEY    = 'lrp9HEhtqwW5iuodWV89HqfUWtOVKyUXQNWmfy3M';
  
    const history = [
      { role: 'system', content: 'You are a helpful assistant.' }
    ];
  
    async function chat(promptText) {
      history.push({ role: 'user', content: promptText });
      try {
        const res = await fetch(TARGET, {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${KEY}`,
          },
          body: JSON.stringify({
            model:    'command-a-03-2025',
            messages: history
          })
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        const reply = data.message.content[0].text;
        history.push({ role: 'assistant', content: reply });
        alert(reply);
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  
    const userInput = prompt('Enter your prompt:');
    if (userInput) chat(userInput);
    else          alert('Cancelled');
  })();
  