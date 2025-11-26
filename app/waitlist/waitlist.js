const SUPABASE_BASE_URL = "https://wqdagsnashvrzrnkgtjv.supabase.co";
const SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxZGFnc25hc2h2cnpybmtndGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE5NjM1NjYsImV4cCI6MTk3NzUzOTU2Nn0.NmUENx2iYedN3XNoWaaZ_ja_nBZTPhSnK17NKpR-XtQ";
const client = supabase.createClient(SUPABASE_BASE_URL, SECRET);

async function insertData(name, email) {
  let response = await client
    .from("waitlists")
    .insert([{ name: name, email: email }]);
  return response;
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function validateForm() {
  let validName = $(".js-input-name").val().trim().length > 0;
  let validEmail = validateEmail($(".js-input-email").val().trim());
  let validForm = validName && validEmail;
  $(".js-submit-form").prop("disabled", !validForm);
}

$(".js-form").on("submit", async function (event) {
  event.preventDefault();
  let response = await insertData(
    $(".js-input-name").val().trim(),
    $(".js-input-email").val().trim()
  );
  if (response.status == 201) {
    $(".js-form").addClass("hidden");
    $(".js-success").removeClass("hidden");
  }
});

$(".js-input-name, .js-input-email").on("input", function (event) {
  validateForm();
});

$(".js-input-email").on("blur", function () {
  let validEmail = validateEmail($(".js-input-email").val().trim());
  if (validEmail) {
    $(".js-email-error").addClass("hidden");
  } else {
    $(".js-email-error").removeClass("hidden");
  }
});

$(".js-input-name").on("blur", function () {
  let validName = $(".js-input-name").val().trim().length > 0;
  if (validName) {
    $(".js-name-error").addClass("hidden");
  } else {
    $(".js-name-error").removeClass("hidden");
  }
});

$(".js-show-form").on("click", function () {
  $(".js-form").removeClass("hidden");
  $(".js-show-form").addClass("hidden");
});

$(document).ready(function () {
  validateForm();
});
