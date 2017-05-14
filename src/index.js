import './styles/game.css';
import Game from './partials/Game'


// create a game instance
const game = new Game('game', 512, 256);


    document.getElementById('#start-button'),
    'click',
    (function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();



