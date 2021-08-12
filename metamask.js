document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum == 'undefined') {
        alert("I can't find your BSC wallet :(\nOpen this website with Metamask or Trust wallet")
        return
    }

    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        console.log(accounts)
    })
}
