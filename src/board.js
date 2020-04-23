import React from 'react'
import Snake from './snake'
//board size never changes
const boardSize = 720
const cellSize = boardSize / 30;

class Board extends React.Component {
    constructor(props) {
        super(props);
        //Direction for snake, storing of the head and tail, and body in an array
        this.state = {
            snake: {
                head: {
                    x: 15,
                    y: 15
                },
                tail: {
                    x: 15,
                    y: 15
                },
                direction: '',
                body: [{x:15,y:15}],
                running: false,
                alive: true,
                speed: 1
            }
        }
    }

    //Draw board function
    drawBoard() {
        const canvas = this.refs.gameBoard
        this.setState( {
            canvas: canvas,
            ctx: canvas.getContext('2d')
        }, function () {
            this.drawGrid();
            this.drawSnake();
        } )
    }

    //Draws grid
    drawGrid() {
        const {ctx} = this.state;

        ctx.strokeStyle = 'grey';
        ctx.fillRect(0,0, boardSize, boardSize)
        for (var vertical = cellSize; vertical < boardSize; vertical += cellSize) {
            ctx.beginPath();
            ctx.moveTo(vertical,0);
            ctx.lineTo(vertical, boardSize);
            ctx.stroke();
        }

        for (var horizontal = cellSize; horizontal < boardSize; horizontal += cellSize) {
            ctx.beginPath();
            ctx.moveTo(0, horizontal);
            ctx.lineTo(boardSize, horizontal);
            ctx.stroke();
        }
    }

    //Draws snake and fills in rectangles based on the body's coordinates
    drawSnake() {
        const {ctx, snake} = this.state;
        ctx.fillStyle = 'green';
        snake.body.forEach(cord => {
            this.drawRect(cord.x, cord.y, 1, 1);
        });

    }

    //changes state to move direction
    changeDirection (direction) {
        let newState = Object.assign({}, this.state);
        newState.snake.direction = direction;
        this.setState(newState);
        this.canvasMoveSnake();
    }

    //Changes state to move tail and head (and by extension body) of the snake
    canvasMoveSnake() {
        const {ctx, snake} = this.state;
        ctx.fillStyle = 'black';
        this.drawRect(snake.tail.x, snake.tail.y, 1, 1);
        ctx.fillStyle = 'green';
        this.drawRect(snake.head.x, snake.head.y, 1, 1);
    }

    //helper function draw rectangle to help implement fillRect method 
    drawRect(x, y, l, h) {
        const {ctx} = this.state;
        ctx.fillRect(x * cellSize, y * cellSize, l * cellSize, h * cellSize);
    }

    //function that is automatically called when the compoenent is being created and when it is being removed 
    componentDidMount () {
        this.drawBoard();
    }

    render() {
        return (
            <div>
                <canvas id ='gameBoard' ref="gameBoard" width={boardSize} height={boardSize} />
                <Snake snake={this.state.snake}
                    changeDirection={this.changeDirection.bind(this)}
                />
            </div>
        )
    }
}

export default Board