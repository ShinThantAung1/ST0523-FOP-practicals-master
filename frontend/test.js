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

  fetch("https://fop-practical-remote-execution.onrender.com/evaluate", {
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
      customInput: customInputUsed ? customInputValue : null
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
      outputEl.innerHTML = ""; // Clear previous content

      const resultContainer = document.createElement("div");
      resultContainer.style.fontFamily = "monospace";

      // Circles
      const circlesContainer = document.createElement("div");
      circlesContainer.style.display = "flex";
      circlesContainer.style.flexWrap = "wrap";
      circlesContainer.style.gap = "8px";
      circlesContainer.style.marginBottom = "16px";

      // Detail container
      const detailsContainer = document.createElement("div");
      detailsContainer.id = "details-container";

      results.forEach((r, index) => {
        const circle = document.createElement("div");
        circle.title = `Test Case ${r.testCase}`;
        circle.style.width = "18px";
        circle.style.height = "18px";
        circle.style.borderRadius = "50%";
        circle.style.cursor = "pointer";
        circle.style.backgroundColor = r.passed ? "#22c55e" : "#ef4444";

        circle.addEventListener("click", () => {
          detailsContainer.innerHTML = ""; // Clear previous box

          const box = document.createElement("div");
          box.style.marginTop = "8px";
          box.style.padding = "10px";
          box.style.border = "1px solid #e5e7eb";
          box.style.borderRadius = "8px";
          box.style.backgroundColor = "#f9fafb";

          if (index < 2) {
            // First 2 test cases: show full detail
            box.innerHTML = `
              <strong>🔍 Test Case ${r.testCase}</strong><br/>
              <strong>Input:</strong> ${JSON.stringify(r.input)}<br/>
              <strong>Result:</strong> <span style="color: ${r.passed ? '#16a34a' : '#dc2626'};">${r.passed ? '✅ Passed' : '❌ Failed'}</span>
            `;
          } else {
            // Others: show summary only
            box.innerHTML = `
              <strong>Test Case ${r.testCase}:</strong> <span style="color: ${r.passed ? '#16a34a' : '#dc2626'};">${r.passed ? '✅ Passed' : '❌ Failed'}</span>
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
