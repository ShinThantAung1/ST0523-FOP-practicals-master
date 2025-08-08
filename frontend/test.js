function sendCodeToServer(codeContent) {
  const studentId = "p1121782";
  const className = "DIT/FT/1A/01";
  const mockExecution = false;

  const params = new URLSearchParams(window.location.search);
  const topicId = parseInt(params.get("topicId"), 10);
  const questionNumber = params.get("questionId");

  const outputEl = document.getElementById("output");
  if (!outputEl) {
    console.error("❌ Output element not found.");
    return;
  }

  const customInputUsed = document.getElementById("useCustomInput").checked;
  const customInputValue = document.getElementById("customInput").value.trim();

  fetch("http://localhost:3000/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: codeContent,
      studentId,
      className,
      Topicid: topicId,
      Questionid: questionNumber,
      mockExecution,
      useCustomInput: customInputUsed,
      customInput: customInputUsed ? customInputValue.split(",").map(v => isNaN(v.trim()) ? v.trim() : Number(v.trim())): null
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
      if (!data.success || !Array.isArray(data.results)) {
        outputEl.innerHTML = `<p style="color: red;">❌ Invalid response from server.</p>`;
        return;
      }

      const { results } = data; 
      outputEl.innerHTML = "";

   
      if (customInputUsed) {
      const customResultBox = document.createElement("div");
      customResultBox.style.padding = "10px";
      customResultBox.style.border = "1px solid #e5e7eb";
      customResultBox.style.borderRadius = "8px";
      customResultBox.style.backgroundColor = "#f9fafb";
      customResultBox.innerHTML = `
      <strong>🧪 Custom Test Case</strong><br/>
      <strong>Input:</strong> ${JSON.stringify(results[0].input)}<br/>
      <strong>Output:</strong> ${JSON.stringify(results[0].output)}
      `;
      outputEl.appendChild(customResultBox);
      return;
      }
      

      const resultContainer = document.createElement("div");
      resultContainer.style.fontFamily = "monospace";

      
      const circlesContainer = document.createElement("div");
      circlesContainer.style.display = "flex";
      circlesContainer.style.flexWrap = "wrap";
      circlesContainer.style.gap = "8px";
      circlesContainer.style.marginBottom = "16px";

      
      const detailsContainer = document.createElement("div");
      detailsContainer.id = "details-container";

      

      results.forEach((r, index) => {
        const circle = document.createElement("div");
        const testCaseNumber = r.testCase ?? r.testcase ?? (index + 1);
        circle.title = `Test Case ${testCaseNumber}`;
        circle.style.width = "18px";
        circle.style.height = "18px";
        circle.style.borderRadius = "50%";
        circle.style.cursor = "pointer";
        circle.style.backgroundColor = r.passed ? "#22c55e" : "#ef4444";

        circle.addEventListener("click", () => {
          detailsContainer.innerHTML = "";

          const box = document.createElement("div");
          box.style.marginTop = "8px";
          box.style.padding = "10px";
          box.style.border = "1px solid #e5e7eb";
          box.style.borderRadius = "8px";
          box.style.backgroundColor = "#f9fafb";

          if (index < 2) {
            box.innerHTML = `
              <strong>🔍 Test Case ${testCaseNumber}</strong><br/>
              <strong>Input:</strong> ${JSON.stringify(r.input)}<br/>
              ${r.actual_output !== undefined ? `<strong>Output:</strong> ${JSON.stringify(r.actual_output)}<br/>` : ''}
              <strong>Result:</strong> <span style="color: ${r.passed ? '#16a34a' : '#dc2626'};">${r.passed ? '✅ Passed' : '❌ Failed'}</span>
            `;
          } else {
            box.innerHTML = `
              <strong>Test Case ${testCaseNumber}:</strong> <span style="color: ${r.passed ? '#16a34a' : '#dc2626'};">${r.passed ? '✅ Passed' : '❌ Failed'}</span>
            `;
          }

          detailsContainer.appendChild(box);
        });

        circlesContainer.appendChild(circle);
      });

      resultContainer.appendChild(circlesContainer);
      resultContainer.appendChild(detailsContainer);
      outputEl.appendChild(resultContainer);
    })
    .catch(err => {
      outputEl.textContent = "❌ Error sending code:\n" + err.message;
    });
}

// Expose to the HTML page
window.sendCodeToServer = sendCodeToServer;
