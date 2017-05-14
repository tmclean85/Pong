import './styles/game.css';
import Game from './partials/Game'
import { KEYS } from './settings'

// create a game instance

const game = new Game('game', 512, 256);

document.addEventListener('keydown', event => {
    if(event.key === KEYS.x){
          (function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();   
 document.getElementById('rules-wrapper').style.display='none';
 document.getElementById('start-button').style.display='none';
    }
})




