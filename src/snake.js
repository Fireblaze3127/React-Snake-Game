import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

class Snake extends React.Component {
    run() {
        //Update state of snake to the running state so that we know the player has started playing the game
        //SetInterval will repeat code every 200/this.props.snake.speed milliseconds
        //  (speed is 1, so the intervgal will fire 5 times per second)
        this.props.snake.running = true;
        var running = setInterval(() => {
            const snake = this.props.snake;
            
            //switch case to decide on how to move the snake
            switch(snake.direction) {
                case 'up':
                    snake.head.y -= 1;
                    break;
                case 'down':
                    snake.head.y += 1;
                    snake.head.x += 1;
                case 'left':
                    snake.head.x -= 1;
                    break;
                case 'right': 
                    snake.head.x += 1;
                    break;
                default:
                    break;
            }
            
            //If statements to stop the game; to not hog all computer resources
            if(this.props.snake.running === false) {
                clearInterval(running);
            }
            else if (snake.head.x > 29 || snake.head.y > 29 || snake.head.x < 0 || snake.head.y < 0) {
                snake.running = false;
                snake.alive = false;
                clearInterval(running);
            }

            //causes the snake to move accordingly on the canvas
            this.props.changeDirection(snake.direction);
        }, 200 / this.props.snake.speed);
    }

    render() {

        return(
            <KeyboardEventHandler
                handleKeys={['left',  'up', 'right', 'down', 'space']}
                onKeyEvent={(key, e) => {
                    if (!this.props.snake.running && this.props.snake.alive) {
                        this.run()
                    }
                    this.props.changeDirection(key)
                }} />
        );
    }
}

export default Snake;