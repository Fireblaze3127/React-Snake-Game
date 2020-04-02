import React from 'react'
//board size never changes
const boardSize = 720
const cellSize = boardSize / 30;

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    //Draw board function
    drawBoard() {
        const canvas = this.refs.gameBoard
        this.setState( {
            canvas: canvas,
            ctx: canvas.getContext('2d')
        }, function () {
            this.drawGrid();
        } )
    }

    //Draws grid
    drawGrid() {
        const {ctx} = this.state

        ctx.strokeStyle = 'grey'
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

    componentDidMount () {
        this.drawBoard();
    }

    render() {
        return (
            <div>
                <canvas id ='gameBoard' ref="gameBoard" width={boardSize} height={boardSize} />
            </div>
        )
    }
}

export default Board