let h1 = document.querySelector('h1')
let getData = () => {
    fetch('http://localhost:3000/data', {
        method: 'GET'
    })
        .then((res) => {
            return res.json()
        })
        .then(data => {
            console.log(data)
        })
}
h1.onclick = () => {
    getData()
}