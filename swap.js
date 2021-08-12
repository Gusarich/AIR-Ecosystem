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

function normalizeNumber(n) {
    if (n < 0.000001) return 0
    if (n < 1000000) return Number(n.toPrecision(6))
    return Math.ceil(n)
}

function reloadAccount(account) {
    fetch('https://raw.githubusercontent.com/Gusarich/AIR-Ecosystem/main/data.json')
    .then(r => r.json())
    .then(r => {
        r = r['tokens']
        let tokenFrom = r[window.swapFrom]
        let tokenTo = r[window.swapTo]

        fetch('https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=' + tokenFrom + '&address=' + account + '&tag=latest&apikey=Y1I94DQ6BBW9GCYZ2NBB4BN36GAS1HXH24')
        .then(r => r.json())
        .then(r => {
            let balanceFrom = normalizeNumber(r['result'] / 10 ** 18)
            setTimeout(() => {
                fetch('https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=' + tokenTo + '&address=' + account + '&tag=latest&apikey=Y1I94DQ6BBW9GCYZ2NBB4BN36GAS1HXH24')
                .then(r => r.json())
                .then(r => {
                    let balanceTo = normalizeNumber(r['result'] / 10 ** 18)

                    document.getElementById('from-balance').innerText = balanceFrom
                    document.getElementById('to-balance').innerText = balanceTo
                })
            }, 250)
        })
    })
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
