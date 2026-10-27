const cardButton = document.querySelector("#card-button");
const cardStatus = document.querySelector("#card-status");
const feedbackForm = document.querySelector("#feedback-form");
const feedbackInput = document.querySelector("#feedback");
const characterCount = document.querySelector("#character-count");
const formStatus = document.querySelector("#form-status");

cardButton.addEventListener("click", () => {
  const card = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Sam Rodil",
    "N:Rodil;Sam;;;",
    "TITLE:Creative Student | Digital Artist",
    "NOTE:Curious mind. Creative hands. Always making something new.",
    "END:VCARD",
  ].join("\r\n");
  const file = new Blob([card], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const download = document.createElement("a");

  download.href = url;
  download.download = "sam-rodil.vcf";
  document.body.append(download);
  download.click();
  download.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  cardStatus.textContent = "Your contact card is ready to save.";
});

feedbackInput.addEventListener("input", () => {
  characterCount.textContent = `${feedbackInput.value.length} / 600`;
  formStatus.textContent = "";
  formStatus.removeAttribute("data-state");
});

feedbackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = feedbackInput.value.trim();

  if (message.length < 3) {
    formStatus.textContent = "Please write at least 3 characters before sending.";
    formStatus.dataset.state = "error";
    feedbackInput.focus();
    return;
  }

  formStatus.textContent = "Thanks for sharing your thoughts! Your feedback has been received in this demo.";
  formStatus.removeAttribute("data-state");
  feedbackForm.reset();
  characterCount.textContent = "0 / 600";
});
