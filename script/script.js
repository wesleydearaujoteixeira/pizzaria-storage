
const Item = (el) => document.querySelector(el)
const Itens = (els) => document.querySelectorAll(els)

let cart = []
let sabor = 0
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
        sabor = key


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
    alert('Obrigado, volte sempre!!!')
    Item('aside').style.left = '100vw' 


});


Itens('.pizzaInfo--size').forEach((item) => {

    item.addEventListener('click', () => {
        Item('.pizzaInfo--size.selected').classList.remove('selected')
        item.classList.add('selected')

    });


});


Item('.pizzaInfo--addButton').addEventListener('click', () => {


    let size = Number(Item('.pizzaInfo--size.selected').dataset.key);
    

   let identifier = pizzaJson[sabor].id+'@'+ size

    let low = cart.findIndex((item) => item.identifier == identifier)

        if (low > -1) {
            cart[low].qtd += quantity;
        } else {
            cart.push({
                identifier,
                id: pizzaJson[sabor],
                size,
                qtd: quantity,
            });
        }
   
    CloseModel();
    UpdateCart()

    
});

    
Item('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        Item('aside').style.left = '0vw' 
    }   
    
});


Item('.menu-closer').addEventListener('click', () => {

    Item('aside').classList.remove('show')
    Item('aside').style.left = '100vw' 

});




function UpdateCart() {
    if(cart.length > 0) {
        Item('aside').classList.add('show');

        Item('.cart').innerHTML = ''

        let subtotal = 0
        let total = 0
        let desconto = 0

        for(let i in cart) {

            let newr = cart.find((item) => item.id == cart[i].id)

            subtotal += cart[i].id.price * cart[i].qtd

            console.log(subtotal)
            
            let cartItem = Item('.cart--item').cloneNode(true);

            let pizzaNewSize = ''

            switch(cart[i].size){
                case 0:
                    pizzaNewSize = 'P'
                    break
                case 1:
                    pizzaNewSize = 'M'
                    break
                case 2:
                    pizzaNewSize = 'G'

            }

            Item('#result').innerHTML = cart.length
            cartItem.querySelector('img').src = newr.id.img
            cartItem.querySelector('.cart--item-nome').innerHTML = newr.id.name + ' ' + pizzaNewSize
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd



            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
              
                if(cart[i].qtd > 1 ){
                    cart[i].qtd--
                }else {
                    cart.splice(i, 1)
                }
                UpdateCart()
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qtd++
                UpdateCart()

            })

            Item('.cart').append(cartItem);

        }

        desconto = subtotal * 0.1
        total = subtotal - desconto
        

        Item('#subtotal').innerHTML = `R$ ${subtotal.toFixed(2)}`
        Item('#desconto').innerHTML = `R$ ${desconto.toFixed(2)}`
        Item(`#total`).innerHTML = `R$ ${total.toFixed(2)}`

    }else {
        Item('aside').classList.remove('show')
        Item('aside').style.left = '100vw' 


    }
}       