const flow = {
  "start": {
    "question": "Is the device ON?",
    "yes": "device_on",
    "no": "do_not_power"
  },
  "device_on": {
    "question": "Keep the device powered on and charge, if needed. Done?",
    "yes": "locked",
    "no": null
  },
  "do_not_power": {
    "question": "DO NOT power on or plug in the device. Done?",
    "yes": "passcode_1",
    "no": null
  },
  "locked": {
    "question": "Is the device currently locked?",
    "yes": "passcode_2",
    "no": "no_lock"
  },
  "passcode_1": {
    "question": "Was the passcode obtained?",
    "yes": "test_code_1",
    "no": "major_crime_3"
  },
  "test_code_1": {
    "question": "DO NOT power on the device. Only document the code. Done?",
    "yes": "major_crime_3",
    "no": null
  },
  "signals_1": {
    "question": "Can Airplane Mode be enabled, and disable Bluetooth and Wi-Fi?",
    "yes": "major_crime_1",
    "no": "recommendation_1"
  },
  "major_crime_1": {
    "question": "Is this event considered a major crime?",
    "yes": "recommendation_1",
    "no": "recommendation_4"
  },
  "recommendation_1": {
    "question": "RECOMMENDATION: Place the device in a Faraday bag with a charger. Notify CSI without delay. Done?",
    "yes": "complete_1",
    "no": null
  },
  "recommendation_2": {
    "question": "RECOMMENDATION: Notify CSI and contact the Digital Lab immediately for further guidance. Done?",
    "yes": "complete_1",
    "no": null
  },
  "recommendation_3": {
    "question": "RECOMMENDATION: Notify CSI, if applicable. Otherwise, follow evidence procedures. Done?",
    "yes": "complete_1",
    "no": null
  },
  "recommendation_4": {
    "question": "RECOMMENDATION: Keep device on and charged. Notify CSI without delay. Done?",
    "yes": "complete_1",
    "no": null
  },
  "recommendation_5": {
    "question": "RECOMMENDATION: Place the device in a Faraday bag WITHOUT a charger. Notify CSI without delay. Done?",
    "yes": "complete_1",
    "no": null
  },
  "passcode_2": {
    "question": "Was the passcode obtained?",
    "yes": "test_code_2",
    "no": "signals_1"
  },
  "test_code_2": {
    "question": "Document the passcode. Done?",
    "yes": "signals_2",
    "no": null
  },
  "signals_2": {
    "question": "Enable Airplane Mode, and disable Bluetooth and Wi-Fi. Done?",
    "yes": "major_crime_2",
    "no": null
  },
  "major_crime_2": {
    "question": "Is this event considered a major crime?",
    "yes": "recommendation_1",
    "no": "recommendation_3"
  },
  "no_lock": {
    "question": "DO NOT lock the device! Done?",
    "yes": "signals_3",
    "no": null
  },
  "signals_3": {
    "question": "Enable Airplane Mode, and disable Bluetooth and Wi-Fi. Done?",
    "yes": "passcode_4",
    "no": null
  },
  "passcode_4": {
    "question": "Without Locking: Is a passcode required to unlock? If unsure, assume there is.",
    "yes": "passcode_5",
    "no": "major_crime_2"
  },
  "passcode_5": {
    "question": "Was the passcode obtained?",
    "yes": "test_code_3",
    "no": "settings_1"
  },
  "test_code_3": {
    "question": "Document the passcode. Done?",
    "yes": "major_crime_2",
    "no": null
  },
  "complete_1": {
    "question": "Completed. Follow any additional procedures as necessary.",
    "yes": null,
    "no": null
  },
  "major_crime_3": {
    "question": "Is this event considered a major crime?",
    "yes": "leave_off",
    "no": "leave_off_2"
  },
  "leave_off": {
    "question": "Leave the device off. DO NOT charge. Done?",
    "yes": "recommendation_5",
    "no": null
  },
  "leave_off_2": {
    "question": "Leave the device off. DO NOT charge. Done?",
    "yes": "recommendation_3",
    "no": null
  },
  "settings_1": {
    "question": "In device settings: Navigate to the Display settings and set the screen lock to maximum possible time. Done?",
    "yes": "screen_on_1",
    "no": null
  },
  "screen_on_1": {
    "question": "DO NOT LOCK. Keep the screen on and charge the device as needed. Done?",
    "yes": "label_1",
    "no": null
  },
  "label_1": {
    "question": "Affix a label that says \"DO NOT LOCK SCREEN\" or similar to warn others.",
    "yes": "recommendation_2",
    "no": null
  }
};

let current = "start";
let history = [];

function render() {
  const node = flow[current];
  const q = document.getElementById("question");
  const yesBtn = document.getElementById("btn-yes");
  const noBtn = document.getElementById("btn-no");
  const backBtn = document.getElementById("btn-back");
  const restartBtn = document.getElementById("btn-restart");

  if (!node) {
    q.innerText = "Start step not found.";
    document.getElementById("options").style.display = "none";
    return;
  }
  q.innerText = node.question || "—";
  yesBtn.style.display = node.yes ? "inline-block" : "none";
  noBtn.style.display = node.no ? "inline-block" : "none";
  backBtn.style.display = history.length > 0 ? "inline-block" : "none";
  restartBtn.style.display = "inline-block";
}

function nextStep(answer) {
  const next = flow[current][answer];
  if (next && flow[next]) {
    history.push(current);
    current = next;
    render();
  } else if (!next) {
    render();
  } else {
    alert("This path points to a step that does not exist: " + next);
  }
}

function goBack() {
  if (history.length > 0) {
    current = history.pop();
    render();
  }
}

function restart() {
  current = "start";
  history = [];
  render();
}

window.onload = () => render();
