let h1 = document.getElementById("h1");
let h2 = document.getElementById("h2");

function greet() {
  h1.innerText = "asdasd";
}

function fetchAPI() {
  fetch("http://localhost:8080/json")
    .then((res) => {
      if (res) {
        return res.text();
      }
    })
    .then((data) => {
      h2.innerText = data;
    })
    .catch((err) => {
      console.log(err);
    });
}
