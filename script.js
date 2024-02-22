
const Item = (el) => document.querySelector(el)
const Itens = (els) => document.querySelectorAll(els)



pizzaJson.map((item, index) => {
    let pizzaItem =  Item('.pizza-item').cloneNode(true);

    let quantity = 1

    pizzaItem.setAttribute('data-index', index)
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--img > img').src = item.img 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`

    //event of click 

    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();

        let key = event.target.closest('.pizza-item').dataset.index
        console.log(pizzaJson[key])
        
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

        Item('.pizzaInfo--qtmais').addEventListener('click', () => {
            Item('.pizzaInfo--qt').innerHTML = quantity++
        })

        Item('.pizzaInfo--qtmenos').addEventListener('click', () => {
            Item('.pizzaInfo--qt').innerHTML = quantity--
        })



        Item('.pizzaWindowArea').style.opacity = 0
        Item('.pizzaWindowArea').style.display = 'flex'

        setTimeout(() => {
            Item('.pizzaWindowArea').style.opacity = 1

        }, 200)

        Item('.pizzaInfo--cancelButton').addEventListener('click', () => {
          
            Item('.pizzaWindowArea').style.display = 'none'
    
            
    
        })
        
    });

    

    Item('.pizza-area').append(pizzaItem)
});