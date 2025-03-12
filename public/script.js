function convert() {
  const input = document.getElementById("inputValue").value.trim();
  const resultElement = document.getElementById("result");

  if (!input) {
    resultElement.innerHTML = `invalid unit <br><br> <pre>"invalid unit"</pre>`;
    return;
  }

  fetch(`/api/convert?input=${encodeURIComponent(input)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        resultElement.innerHTML = `invalid unit <br><br> <pre>"invalid unit"</pre>`;
      } else {
        resultElement.innerHTML = `
          ${data.string} <br><br>
          <pre>{ "initNum": ${data.initNum}, "initUnit": "${data.initUnit}", "returnNum": ${data.returnNum}, "returnUnit": "${data.returnUnit}", "string": "${data.string}" }</pre>
        `;
      }
    })
    .catch((error) => {
      console.error("Error fetching conversion:", error);
      resultElement.innerHTML = `invalid unit <br><br> <pre>"invalid unit"</pre>`;
    });
}
