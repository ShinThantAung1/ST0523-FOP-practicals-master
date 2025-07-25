function checkUserSession() {
  return fetch('https://fop-practical-log-collector.onrender.com/sessionData', {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Not authenticated");
      }
      return response.json();
    })
    .then(data => {
      console.log('User session:', data.user);
      return data.user;
    })
    .catch(err => {
      console.warn('No session or not authenticated');
      return null;
    });
}

// Make it globally accessible
window.checkUserSession = checkUserSession;
