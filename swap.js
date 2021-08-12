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
    let url = document.URL
    let params = {}
    try {
        let get = url.split('?')[1].split('&')
        for (let i = 0; i < get.length; i += 1) {
            let param = get[i].split('=')
            params[param[0]] = param[1]
        }
        if (params['from'] == undefined || params['to'] == undefined) {
            window.location.href = url + '?from=MDUST&to=AIR'
        }
    }
    catch {
        window.location.href = url + '?from=MDUST&to=AIR'
    }

    document.getElementById('from-currency').innerText = params['from']
    document.getElementById('to-currency').innerText = params['to']

    window.swapFrom = params['from']
    window.swapTo = params['to']

    setInputFilter(document.getElementById('input-1'), function(value) {
        return /(^\d+[.,]?\d*$)|(^$)/.test(value)
    })
    setInputFilter(document.getElementById('input-2'), function(value) {
        return /(^\d+[.,]?\d*$)|(^$)/.test(value)
    })
})
