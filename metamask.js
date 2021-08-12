async function getAccount () {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]

    let wallet = document.querySelector('.wallet')
    wallet.innerText = 'Connected: ' + account.slice(0, 4) + '...' + account.slice(-4)

    reloadAccount(account)
    setInterval(() => {
        reloadAccount(account)
    }, 2000)
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum == 'undefined') {
        alert("I can't find your BSC wallet :(\nOpen this website with Metamask or Trust wallet")
        return
    }

    const ethereumButton = document.querySelector('.wallet')
    ethereumButton.addEventListener('click', () => {
        getAccount()
    })

    ethereum.on('accountsChanged', function (accounts) {
        reloadAccount(accounts[0])
    })

    getAccount()
})
