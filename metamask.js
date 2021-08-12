async function getAccount () {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    console.log(account)
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
