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
    window.web3_ = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/')

    const abi = [
        {
            'type': 'function',
            'name': 'claimableOf',
            'constant': true,
            'payable': false,
            'stateMutability': 'view',
            'inputs': [{'name':'account','type':'address'}, {'name':'token','type':'address'}],
            'outputs': [{'name':'','type':'uint256'}]
        }
    ]

    window.web3Contract = new window.web3_.eth.Contract(abi, '0x2fDc0abC687f729380ce075548537cc447DF59C4')

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
