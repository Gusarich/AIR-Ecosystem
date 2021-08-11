function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
    setInputFilter(document.getElementById('input-1'), function(value) {
        return /(^\d+[.,]?\d*$)|(^$)/.test(value)
    })
    setInputFilter(document.getElementById('input-2'), function(value) {
        return /(^\d+[.,]?\d*$)|(^$)/.test(value)
    })
})