const div = document.querySelector(".ok");
const notify = document.querySelector(".notify");
const getValue = document.querySelector("#textInput");

function getSingle() {
  fetch("http://localhost:4000/conversation/create/ok", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ id: "639e80ea6d6238216703af01" }),
  })
    .then((res) => {
      const x = res.json();
      return x;
    })
    .then((res) => {
      console.log(res);
      let x = res[0];
      const { members, msg, _id } = x;
      div.innerHTML = `
     <div class="res"> <p>
          members :   ${members[0].name},  ${members[1].name}
      <br/>msg  : <br/> ${msg.map((val, index) => {
        return `${index}  <span>${val.sender}</span>
       <br/> <span>${val.text}</span>
       <br/>  `;
      })}
ID :  ${_id}
      <p> 
          </div>`;
    });
}

function makeRoom(e) {
  const x = "kuldeep";
  const sendTHis = [x, e];
  fetch("http://localhost:4000/conversation/create", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ members: sendTHis }),
  })
    .then((res) => {
      const x = res.json();
      return x;
    })
    .then((res) => {
      console.log(res);
      let x = res[0];
      const { members, msg, _id } = x;
      div.innerHTML = `
     <div class="res"> <p>
          members :   ${members}
      <br/>msg  : <br/> ${msg.map((val, index) => {
        return `${index}  <span>${val.sender}</span>
       <br/> <span>${val.text}</span>
       <br/>  `;
      })}
ID :  ${_id}
      <p> 
          </div>`;
    });
}

function sendMSG() {
  const sendTHis = { sender: "kartik", text: getValue.value };
  fetch("http://localhost:4000/conversation/number", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      id: "639e80ea6d6238216703af01",
      msg: sendTHis,
    }),
  })
    .then((res) => {
      const x = res.json();
      return x;
    })
    .then((res) => {
      notify.innerHTML = `Message sent `;
    });
}

function AllConversation() {
  const sendTHis = { sender: "kartik", text: "hello" };
  try {
    fetch("http://localhost:4000/conversation")
      .then((res) => {
        const x = res.json();
        return x;
      })
      .then((res) => {
        console.log("Getting all conversation", res);
        res.map((value, index) => {
          div.innerHTML = `<div class="ok">
              <p> msg : ${value.msg.length} ,members : ${value.members.length} , </p>  
              </div>`;
        });
      });
  } catch (err) {
    console.log("err", err);
  }
}
