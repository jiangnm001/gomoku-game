// 游戏逻辑核心模块

export class Game {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.reset();
    }

    // 重置游戏
    reset() {
        // 初始化棋盘，0表示空位
        this.board = Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(0));
        this.currentPlayer = 1; // 1表示黑棋，2表示白棋
        this.gameOver = false;
        this.winner = null;
        this.winningStones = null; // 获胜的五子坐标
        this.lastMove = null; // 最后一步的位置
        this.moveHistory = []; // 记录走子历史，用于悔棋
    }

    // 获取当前棋盘状态
    getBoard() {
        return this.board;
    }

    // 获取当前玩家
    getCurrentPlayer() {
        return this.currentPlayer;
    }

    // 切换玩家
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }

    // 检查游戏是否结束
    isGameOver() {
        return this.gameOver;
    }

    // 获取获胜者
    getWinner() {
        return this.winner;
    }

    // 落子
    makeMove(row, col) {
        // 检查游戏是否已结束
        if (this.gameOver) {
            return false;
        }

        // 检查位置是否有效
        if (row < 0 || row >= this.boardSize || col < 0 || col >= this.boardSize) {
            return false;
        }

        // 检查位置是否已被占用
        if (this.board[row][col] !== 0) {
            return false;
        }

        // 落子
        this.board[row][col] = this.currentPlayer;

        // 记录走子历史和最后一步
        this.lastMove = { row, col, player: this.currentPlayer };
        this.moveHistory.push(this.lastMove);

        // 检查是否获胜
        const winningStones = this.checkWin(row, col, this.currentPlayer);
        if (winningStones) {
            this.gameOver = true;
            this.winner = this.currentPlayer;
            this.winningStones = winningStones; // 保存获胜的五子坐标
            return true;
        }

        // 检查是否平局（棋盘已满）
        if (this.isBoardFull()) {
            this.gameOver = true;
            return true;
        }

        return true;
    }

    // 悔棋（支持多步悔棋）
    undo() {
        if (this.moveHistory.length === 0) {
            return false;
        }

        // 获取上一步走子
        const lastMove = this.moveHistory.pop();

        // 清除棋盘上的棋子
        this.board[lastMove.row][lastMove.col] = 0;

        // 切换回上一个玩家
        this.currentPlayer = lastMove.player;

        // 重置游戏结束状态
        this.gameOver = false;
        this.winner = null;

        return true;
    }

    // 获取可悔棋的步数
    getUndoCount() {
        return this.moveHistory.length;
    }

    // 检查是否获胜（返回获胜的五子坐标）
    checkWin(row, col, player) {
        // 检查四个方向：横、竖、左斜、右斜
        const directions = [
            [0, 1],   // 横向
            [1, 0],   // 纵向
            [1, 1],   // 左斜
            [1, -1]   // 右斜
        ];

        for (const [dx, dy] of directions) {
            let count = 1; // 当前棋子
            let winningStones = [[row, col]]; // 获胜的五子坐标

            // 向一个方向检查
            for (let i = 1; i < 5; i++) {
                const newRow = row + dx * i;
                const newCol = col + dy * i;
                if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol] === player) {
                    count++;
                    winningStones.push([newRow, newCol]);
                } else {
                    break;
                }
            }

            // 向相反方向检查
            for (let i = 1; i < 5; i++) {
                const newRow = row - dx * i;
                const newCol = col - dy * i;
                if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol] === player) {
                    count++;
                    winningStones.unshift([newRow, newCol]);
                } else {
                    break;
                }
            }

            // 如果连续5个或以上，则获胜
            if (count >= 5) {
                // 只返回连续的五子（可能多于5个）
                return count === 5 ? winningStones : winningStones.slice(0, 5);
            }
        }

        return false;
    }

    // 检查位置是否有效
    isValidPosition(row, col) {
        return row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize;
    }

    // 检查棋盘是否已满
    isBoardFull() {
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if (this.board[i][j] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    // 获取指定位置的棋子
    getPiece(row, col) {
        if (this.isValidPosition(row, col)) {
            return this.board[row][col];
        }
        return null;
    }

    // 获取走子历史
    getMoveHistory() {
        return [...this.moveHistory];
    }

    // 获取棋盘大小
    getBoardSize() {
        return this.boardSize;
    }

    // 获取最后一步的位置
    getLastMove() {
        return this.lastMove;
    }

    // 获取获胜的五子坐标
    getWinningStones() {
        return this.winningStones;
    }

    // 获取当前游戏状态
    getGameState() {
        return {
            board: this.getBoard(),
            currentPlayer: this.currentPlayer,
            gameOver: this.gameOver,
            winner: this.winner,
            moveHistory: this.getMoveHistory()
        };
    }

    // 从状态恢复游戏
    setGameState(state) {
        this.board = state.board.map(row => [...row]);
        this.currentPlayer = state.currentPlayer;
        this.gameOver = state.gameOver;
        this.winner = state.winner;
        this.moveHistory = [...state.moveHistory];
    }
}