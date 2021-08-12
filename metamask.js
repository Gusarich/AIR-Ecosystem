function reloadAccount(account) {
    fetch('https://raw.githubusercontent.com/Gusarich/AIR-Ecosystem/main/data.json')
    .then(r => r.json())
    .then(r => {
        r = r['tokens']
        tokenFrom = r[window.swapFrom]
        tokenTo = r[window.swapTo]
        console.log(tokenFrom, tokenTo)
    })
    //'https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56&address=' + account + '&tag=latest'
}

async function getAccount () {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    reloadAccount(account)
}

document.addEventListener('DOMContentLoaded', () => {
    const ethereumButton = document.querySelector('.connect-wallet')
    ethereumButton.addEventListener('click', () => {
        getAccount()
    })

    if (typeof window.ethereum == 'undefined') {
        alert("I can't find your BSC wallet :(\nOpen this website with Metamask or Trust wallet")
        return
    }

    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        console.log(accounts)
    })
})
