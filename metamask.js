function reloadAccount(account) {
    fetch('https://raw.githubusercontent.com/Gusarich/AIR-Ecosystem/main/data.json')
    .then(r => r.json())
    .then(r => {
        r = r['tokens']
        tokenFrom = r[window.swapFrom]
        tokenTo = r[window.swapTo]

        fetch('https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=' + tokenFrom + '&address=' + account + '&tag=latest')
        .then(r => r.json())
        .then(r => {
            console.log(r)
        })
    })
    //
}

async function getAccount () {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    reloadAccount(account)
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum == 'undefined') {
        alert("I can't find your BSC wallet :(\nOpen this website with Metamask or Trust wallet")
        return
    }

    const ethereumButton = document.querySelector('.connect-wallet')
    ethereumButton.addEventListener('click', () => {
        getAccount()
    })

    ethereum.on('accountsChanged', function (accounts) {
        reloadAccount(accounts[0])
    })

    getAccount()
})
