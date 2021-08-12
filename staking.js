fetch('https://raw.githubusercontent.com/Gusarich/AIR-Ecosystem/main/data.json')
.then(r => r.json())
.then(r => {
    r = r['pools']
    window.pools = r

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

        td1.appendChild(document.createTextNode(r[i]['TOKEN_1'] + ' / ' + r[i]['TOKEN_2']))
        td2.appendChild(document.createTextNode(r[i]['APY'] + '%'))

        td3.innerHTML = '0 <span class="f16">' + r[i]['TOKEN_1'] + '-' + r[i]['TOKEN_2'] + '</span>'
        td4.innerHTML = '0 <span class="f16">' + r[i]['TOKEN_2'] + '</span>'

        td1.onclick = () => {
            document.location.href = '/AIR-Ecosystem/swap?from=' + r[i]['TOKEN_1'] + '&to=' + r[i]['TOKEN_2']
        }

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)

        table.appendChild(tr)
    }
})
