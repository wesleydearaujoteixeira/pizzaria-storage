
const Item = (el) => document.querySelector(el)
const Itens = (els) => document.querySelectorAll(els)

let cart = []
let item = 0
let quantity = 1

pizzaJson.map((item, index) => {
    let pizzaItem =  Item('.pizza-item').cloneNode(true);
    
    pizzaItem.setAttribute('data-index', index)
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--img > img').src = item.img 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`

    //event of click 

    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();

        let key = event.target.closest('.pizza-item').dataset.index
        quantity = 1
        qtd = key


        Item('.pizzaInfo > h1 ' ).innerHTML = pizzaJson[key].name
        Item('.pizzaInfo--desc').innerHTML = pizzaJson[key].description 
        Item('.pizzaBig > img').src = pizzaJson[key].img
        Item('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`



        Item('.selected').classList.remove('selected')

        Itens('.pizzaInfo--size').forEach((item, index) => {

            
            if(index == 2){
                item.classList.add('selected')
            }
        

            item.querySelector('span').innerHTML = pizzaJson[key].sizes[index]

        });


        Item('.pizzaWindowArea').style.opacity = 0
        Item('.pizzaWindowArea').style.display = 'flex'

        setTimeout(() => {
            Item('.pizzaWindowArea').style.opacity = 1

        }, 200)

       
        
    });


    Item('.pizza-area').append(pizzaItem)
});


const CloseModel = () => {
        
    Item('.pizzaWindowArea').style.opacity = 0

    setTimeout(() => {
        Item('.pizzaWindowArea').style.display = 'none'
    }, 500)

}



Item('.pizzaInfo--cancelButton').addEventListener('click', CloseModel);
Item('.pizzaInfo--cancelMobileButton').addEventListener('click', CloseModel);





Item('.pizzaInfo--qtmais').addEventListener('click', () => {
    quantity++
    Item('.pizzaInfo--qt').innerHTML = quantity
})

Item('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(quantity <= 1){
        quantity = 1
        Item('.pizzaInfo--qt').innerHTML = quantity
    }else{
        quantity--
        Item('.pizzaInfo--qt').innerHTML = quantity
    }
})


Item('.cart--finalizar').addEventListener('click', () => {
    Item('aside').classList.remove('show')
});


Itens('.pizzaInfo--size').forEach((item) => {

    item.addEventListener('click', () => {
        Item('.pizzaInfo--size.selected').classList.remove('selected')
        item.classList.add('selected')

    });


});


Item('.pizzaInfo--addButton').addEventListener('click', () => {
    CloseModel();
    Item('aside').classList.add('show')

    let size = parseFloat(Item('.pizzaInfo--size.selected').dataset.key);

   let identifier = pizzaJson[item].id+'@'+size

    const key = cart.findIndex((item) => item.identifier == identifier)
    
    if(key > -1) { // significa que já possui uma identificação portanto irá somar com o novo quantity.
        cart[key].qtd += quantity
    }else{
        cart.push({ // agora é -1 então ele da push na nova quantidade a ser adicionada. 
            identifier,
            id: pizzaJson[item].id,
            size,
            qtd: quantity
        })
    }    
    
    Item('.menu-openner').innerHTML = quantity

    Item('.TotalReais').innerHTML = `R$ ${pizzaJson[qtd].price * quantity}`

    const reais = pizzaJson[qtd].price * quantity
    const percent = reais - (reais * (10/100))
    const desc = reais - percent

    const valorTotal = reais - desc


    Item('.Desconto').innerHTML = `R$ ${desc.toFixed(2)} `
    Item('.valorTotal').innerHTML = `R$ ${valorTotal.toFixed(2)}`









    
});

