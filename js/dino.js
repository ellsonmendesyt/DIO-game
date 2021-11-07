const log=console.log;
const dino = document.querySelector('.dino');
dino.style.left='0px';


const chao = document.querySelector('.chao');


let posicao=-10;
let base=15;
let pico = 180;
let vel = 40;

function handlekeyUp(e){
    if(e.keyCode===32 || e.keyCode===38){
        if(!estaPulando){
            jump();

        }
    }
}






let estaPulando= false;

function jump(){
    estaPulando=true;
    let alturaPulo=90;
    let gravidade=50;


    let upInterval = setInterval(()=>{
    
    if(posicao >=pico ){

      clearInterval(upInterval);
      let downInterval = setInterval(()=>{
          
          posicao  -=gravidade;
          dino.style.bottom= posicao +'px';
          
          //se se passar do chao poe no chao
          if(posicao <=base){
              clearInterval(downInterval)
              estaPulando=false;
              posicao= -base;
          }
          
      },60); ///taxa de atualização
    }else{
        posicao += alturaPulo;
        dino.style.bottom= posicao +'px';
    }
    
},60);
}


function criarCactus(){
    let posicaoCactus = 1000;

    let aletorio = Math.random()*6000+500;
    

    const cactus = document.createElement('div');
    cactus.classList.add('cactus');
    cactus.style.left= posicaoCactus+'px';
    chao.appendChild(cactus);
    
    
    let esquerdaInterval = setInterval(()=>{
        posicaoCactus -= 5;
        
        ///se o cactus sair da tela
        if(posicaoCactus < -50){
            clearInterval(esquerdaInterval);
            chao.removeChild(cactus);
        }
        
        ///se o cactus estiver nos limites do dinosssauro
        // entre 0 - 60px  
        // e se o pulo do dinossauro for menor que a altura do cactus
        // entao o cactuas bateu no dinossauro
        else if (posicaoCactus > 0 && posicaoCactus < 40 && posicao < 10) {
            clearInterval(esquerdaInterval);
            
            // dino.style.backgroundColor='yellow';
            // document.body.innerHTML= "<h1 class='gameover'>FIM DE JOGO</h1>";
        }else{
            
            cactus.style.left= posicaoCactus+'px';
        }


    },20)

    
    setTimeout(criarCactus, aletorio);
}


criarCactus();



document.addEventListener('keydown',handlekeyUp)
document.addEventListener('keydown',
function andar(e){
 switch(e.key){
     case "ArrowRight":
         dino.style.left = parseInt(dino.style.left)+ vel + 'px';
         break;
         case "ArrowLeft":
             
             dino.style.left = parseInt(dino.style.left) - vel + 'px';
        break;
 }
})

