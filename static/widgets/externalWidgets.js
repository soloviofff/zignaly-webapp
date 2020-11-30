// zendesk

window.zESettings = {
  webWidget: {
    position: { horizontal: "right", vertical: "bottom" },
    offset: {
      horizontal: "-10px",
      vertical: "-5px",
      mobile: {
        horizontal: "-10px",
        vertical: "-5px",
      },
    },
  },
};

window.userpilotSettings = { token: "55mi72q1" };

const interval = setInterval(() => {
  if (typeof window !== "undefined" && window.zE) {
    window.zE("webWidget", "hide");

    window.zE("webWidget:on", "close", () => {
      window.zE("webWidget", "hide");
    });
    clearInterval(interval);
  }
}, 100);

let script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://static.zdassets.com/ekr/snippet.js?key=374628c3-7648-4afb-96c4-c13bc6408a8f";
script.id = "ze-snippet";
script.async = true;
script.defer = true;
document.getElementsByTagName("head")[0].appendChild(script);

// dashly
let script2 = document.createElement("script");
script2.type = "text/javascript";
script2.src = "https://cdn.dashly.app/api.min.js";
script2.id = "dashly";
script2.async = true;
document.getElementsByTagName("head")[0].appendChild(script2);

// user pilot
let script3 = document.createElement("script");
script3.type = "text/javascript";
script3.src = "https://js.userpilot.io/sdk/latest.js";
script3.id = "userPilot";
script3.async = true;
document.getElementsByTagName("head")[0].appendChild(script3);

// user report
let meta1 = document.createElement("meta");
meta1.name = "userreport:mediaId";
meta1.value = "66375182-a207-4c0a-9c18-716188f4581c";
document.getElementsByTagName("head")[0].appendChild(meta1);

let script4 = document.createElement("script");
script4.type = "text/javascript";
script4.src = "https://sak.userreport.com/zignaly/launcher.js";
script4.id = "userReport";
script4.async = true;
document.getElementsByTagName("head")[0].appendChild(script4);
