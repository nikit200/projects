document.addEventListener("DOMContentLoaded", function() {
    var phoneInput = document.getElementById("phone");
  
    phoneInput.addEventListener("input", formatPhoneNumber);
    phoneInput.addEventListener("keydown", handleBackspace);
  
    function formatPhoneNumber() {
      var phoneNumber = phoneInput.value.replace(/\D/g, ""); // Remove non-digit characters
      var formattedPhoneNumber = "";
      var caretStart = phoneInput.selectionStart; // Get the caret start position
  
      if (phoneNumber.length > 0) {
        formattedPhoneNumber = "(" + phoneNumber.substring(0, 3);
      }
      if (phoneNumber.length >= 4) {
        formattedPhoneNumber += ") " + phoneNumber.substring(3, 6);
      }
      if (phoneNumber.length >= 7) {
        formattedPhoneNumber += "-" + phoneNumber.substring(6, 10);
      }
  
      phoneInput.value = formattedPhoneNumber;
  
      // Restore the caret position
      var caretOffset = 0;
      if (caretStart >= 2 && caretStart < 5) {
        caretOffset = 2;
      } else if (caretStart >= 6 && caretStart < 8) {
        caretOffset = 3;
      } else if (caretStart >= 9) {
        caretOffset = 4;
      }
      phoneInput.setSelectionRange(caretStart + caretOffset, caretStart + caretOffset);
    }
  
    function handleBackspace(event) {
      if (event.key === "Backspace") {
        var caretStart = phoneInput.selectionStart;
        var caretEnd = phoneInput.selectionEnd;
  
        if (caretStart === caretEnd && caretStart > 0 && caretStart <= 14) {
          var phoneNumber = phoneInput.value.replace(/\D/g, ""); // Remove non-digit characters
          var formattedPhoneNumber = phoneInput.value.substring(0, caretStart - 1) +
            phoneInput.value.substring(caretStart); // Remove the deleted digit
  
          phoneInput.value = formattedPhoneNumber;
  
          // Preserve the caret position
          phoneInput.setSelectionRange(caretStart - 1, caretStart - 1);
        }
      }
    }
  });
  