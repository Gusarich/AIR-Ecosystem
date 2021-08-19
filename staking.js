function normalizeNumber (n) {
    if (n < 0.000001) return 0
    if (n < 1000000) return Number(n.toPrecision(6))
    return Math.ceil(n)
}

async function claimableOf (account, token) {
    return await window.web3Contract.methods.claimableOf(account, token).call()
}

async function reloadAccount (account) {
    let table = document.getElementsByClassName('staking-list')[0]

    for (let i = 0; i < window.tokens.length; i += 1) {
        let yourStake = table.getElementsByTagName('td')[2]
        let yourProfit = table.getElementsByTagName('td')[3]
        fetch('https://api-testnet.bscscan.com/api?module=account&action=tokenbalance&contractaddress=' + window.tokens[i][1] + '&address=' + account + '&tag=latest')
        .then(r => r.json())
        .then(async r => {
            if (r.status == '1') {
                let balance = normalizeNumber(r.result / 10 ** 18)
                yourStake.innerHTML = balance + ' <span class="f16">' + window.tokens[i][0] + '</span>'
                let claimable = await claimableOf(account, window.tokens[i][1])
                yourProfit.innerHTML = claimable + ' <span class="f16">' + window.tokens[i][0] + '</span>'
                console.log(claimable)
            }
        })
    }
}

fetch('https://raw.githubusercontent.com/Gusarich/AIR-Ecosystem/main/data.json')
.then(r => r.json())
.then(r => {
    window.tokens = r['tokens']
    window.contract = r['contract']
    r = r['tokens']

    let table = document.getElementsByClassName('staking-list')[0]

    for (let i = 0; i < r.length; i += 1) {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')

        td1.className = 'claim noselect'
        td3.className = 'tablet'
        td4.className = 'desktop'

        td1.appendChild(document.createTextNode(r[i][0]))
        td2.appendChild(document.createTextNode(r[i][2] * 365 + '%'))

        td3.innerHTML = '0 <span class="f16">' + r[i][0] + '</span>'
        td4.innerHTML = '0 <span class="f16">AIR</span>'

        td1.onclick = () => {
            // TODO
        }

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)

        table.appendChild(tr)
    }
})
