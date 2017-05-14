import { SVG_NS, KEYS, SCORE } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';


export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.radius = 8;
		this.gameSound = new Audio('public/sounds/game-music.mp3')
		this.winSound = new Audio('public/sounds/win-music.mp3')
		this.player1Score = new Score(this.width / 2 - SCORE.distance - 30, SCORE.topDistance, SCORE.size);
		this.player2Score = new Score(this.width / 2 + SCORE.distance, SCORE.topDistance, SCORE.size);



		this.gameElement = document.getElementById(element);
		this.board = new Board(this.width, this.height);
		this.paddleWidth = 8,
			this.paddleHeight = 56,
			this.padding = 10,
			this.radius = 8;


		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.padding,
			(this.height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z,
			KEYS.x,
		)

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.paddleWidth - this.padding),
			(this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down
		)

		this.ball = new Ball(
			this.radius,
			this.width,
			this.height,
		);

	

		this.ball2 = new Ball(
			this.radius,
			this.width,
			this.height,
		);


		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		})

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.c) {
				this.ball.vx = this.ball.vx * 1.5,
					this.ball.vy = this.ball.vy * 1.5,
					this.ball2.vx = this.ball.vx * 1.5,
					this.ball2.vy = this.ball.vy * 1.5
			}
		})
		

	}




	render() {

		

		if (this.player1.height > 28 && this.player1.score - this.player2.score > 5) {
			this.player1.height = this.player1.height * 0.5
		}

		if (this.player2.height > 28 && this.player2.score - this.player1.score > 5) {
			this.player2.height = this.player2.height * 0.5
		}

		if (this.pause) {
			return;
		}

		if (this.player1.score === 20 || this.player2.score === 20) {
			this.player1.score = 'WIN';
			this.player2.score = 'LOSE';
			this.ball.vx = 0;
			this.ball.vy = 0;
			this.ball2.vx = 0;
			this.ball2.vy = 0;
			this.gameSound.pause();
			this.winSound.play();

		} else if (this.player1.score < 20 || this.player2.score < 20){
			this.gameSound.play();
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg)

		this.player1Score.render(svg, this.player1.score)
		this.player2Score.render(svg, this.player2.score)

		this.player1.render(svg)
		this.player2.render(svg)
		this.ball.render(svg, this.player1, this.player2)
		this.ball2.render(svg, this.player1, this.player2)

	}

}