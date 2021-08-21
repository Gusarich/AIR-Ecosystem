var accountUpdaterId;

async function getAccount () {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]

    let wallet = document.querySelector('.wallet')
    wallet.innerText = 'Connected: ' + account.slice(0, 4) + '...' + account.slice(-4)

    setTimeout(() => {
        reloadAccount(account)
    }, 500)
    clearInterval(accountUpdaterId)
    accountUpdaterId = setInterval(() => {
        console.log('reload')
        reloadAccount(account)
    }, 3000)
}

ethereum.on('accountsChanged', function (accounts) {
    let account = accounts[0]
    let wallet = document.querySelector('.wallet')
    wallet.innerText = 'Connected: ' + account.slice(0, 4) + '...' + account.slice(-4)

    reloadAccount(account)
    clearInterval(accountUpdaterId)
    accountUpdaterId = setInterval(() => {
        reloadAccount(account)
    }, 3000)
})

document.addEventListener('DOMContentLoaded', () => {
    window.web3_ = new Web3('https://bsc-dataseed1.binance.org:443')

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

    let interval = setInterval(() => {
        console.log('interval!', window.abi)
        if (window.abi != undefined) {
            clearInterval(interval)
            getAccount()
        }
    }, 200)
})
