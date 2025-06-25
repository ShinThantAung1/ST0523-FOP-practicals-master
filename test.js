function sendCodeToServer(codeContent) {
    const studentId = "p1121782";
    const className = "DIT/FT/1A/01";
    const mockExecution = true;
    const topicId = 3;
    const questionNumber = "q2";
  
    const outputEl = document.getElementById("output");
    if (!outputEl) {
      console.error("❌ Output element not found.");
      return;
    }
  
    fetch("http://localhost:3000/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: codeContent,
        studentId,
        className,
        Topicid: topicId,
        Questionid: questionNumber,
        mockExecution
      })
    })
    .then(async (res) => {
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }
      return res.json();
    })
    .then(data => {
      outputEl.textContent = JSON.stringify(data, null, 2);
    })
    .catch(err => {
      outputEl.textContent = "❌ Error sending code:\n" + err.message;
    });
}
  
  // Expose to the HTML page
  window.sendCodeToServer = sendCodeToServer;
  