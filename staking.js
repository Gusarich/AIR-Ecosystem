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

        td1.className = 'claim'
        td3.className = 'tablet'
        td4.className = 'desktop'

        td1.appendChild(document.createTextNode(r[i][0]))
        td2.appendChild(document.createTextNode(r[i][2] + '%'))

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
