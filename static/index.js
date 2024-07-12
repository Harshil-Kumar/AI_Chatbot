const chatbox = document.querySelector('.chatbox');
const textField = document.querySelector('.chat-input textarea');

function appendMessage(sender, message) {
  const messageDiv = document.createElement('li');
  messageDiv.classList.add('chat');
  if (sender === 'You') {
    messageDiv.classList.add('outgoing');
  } else {
    messageDiv.classList.add('incoming');
  }

  const span = document.createElement('span');
  span.classList.add('material-symbols-outlined');
  sender === 'You' && span.classList.add('icon');
  if (sender === 'You') {
    span.textContent = 'person_search';
  } else {
    span.textContent = 'smart_toy';
  }

  const p = document.createElement('p');
  p.classList.add('messagefrom')

  const linkRegex = /https?:\/\/[^\s]+/;
  const linkMatch = message.match(linkRegex);
  if (linkMatch) {
    const linkIndex = message.indexOf(linkMatch[0]);
    const link = document.createElement('a');
    link.href = linkMatch[0];
    link.target = '_blank'; 
    link.textContent = linkMatch[0]; 
    const beforeLink = document.createTextNode(message.substring(0, linkIndex));
    const afterLink = document.createTextNode(message.substring(linkIndex + linkMatch[0].length));

    p.appendChild(beforeLink);
    p.appendChild(link);
    p.appendChild(afterLink);
  } else {
    p.textContent = message;
  }

  messageDiv.appendChild(span);
  messageDiv.appendChild(p);
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;

  if (sender === 'Bot') {
    const buttonContainer = document.querySelector('.button-container');
    chatbox.appendChild(buttonContainer); 
  }
}

var setText = '';

function sendMessage() {
  var message = textField.value.trim();
  if (message.length === 0 && setText.length !== 0) {
    message = setText;
  } else {
    setText = '';
  }

  if (message === '') {
    return;
  }
  appendMessage('You', message);

  fetch('/predict', {
    method: 'POST',
    body: JSON.stringify({ message: message }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const botResponse = data.answer;
      appendMessage('Bot', botResponse);
    })
    .catch((error) => {
      console.error('Error: ', error);
    });

  textField.value = '';
}

document.getElementById('send-btn').addEventListener('click', () => {
  sendMessage();
});

document.getElementById('courses').addEventListener('click', () => {
  setText = 'courses';
  sendMessage();
});

document.getElementById('fees').addEventListener('click', () => {
  setText = 'fees';
  sendMessage();
});

document.getElementById('placements').addEventListener('click', () => {
  setText = 'placements';
  sendMessage();
});

document.getElementById('contact').addEventListener('click', () => {
  setText = 'contact';
  sendMessage();
});

document.getElementById('admission').addEventListener('click', () => {
  setText = 'admission';
  sendMessage();
});

document.getElementById('staff').addEventListener('click', () => {
  setText = 'staff';
  sendMessage();
});

document.getElementById('curriculum').addEventListener('click', () => {
  setText = 'curriculum';
  sendMessage();
});

textField.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

document.querySelector('.chatbot-toggler').addEventListener('click', () => {
  const chatbot = document.querySelector('.chatbot');
  chatbot.classList.toggle('show-chatbot');
});
