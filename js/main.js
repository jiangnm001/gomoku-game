// 游戏主入口文件

import { Game } from './game.js';
import { Board } from './board.js';

// 游戏配置常量
const BOARD_SIZE = 15; // 棋盘大小15x15
const CELL_SIZE = 40;  // 每个格子的像素大小
const CANVAS_SIZE = BOARD_SIZE * CELL_SIZE;

// 获取DOM元素
const canvas = document.getElementById('game-board');
const currentPlayerSpan = document.getElementById('current-player');
const newGameBtn = document.getElementById('new-game');
const undoBtn = document.getElementById('undo');
const gameMessage = document.getElementById('game-message');

// 初始化游戏
const game = new Game(BOARD_SIZE);
const board = new Board(canvas, BOARD_SIZE, CELL_SIZE);

// 渲染当前玩家
function renderCurrentPlayer() {
    const player = game.getCurrentPlayer();
    const playerText = player === 1 ? '黑棋' : '白棋';
    currentPlayerSpan.textContent = `当前玩家：${playerText}`;
}

// 渲染游戏消息
function renderMessage(message, isWin = false) {
    gameMessage.textContent = message;
    if (isWin) {
        gameMessage.classList.add('win-message');
    } else {
        gameMessage.classList.remove('win-message');
    }
}

// 处理画布点击事件
function handleCanvasClick(event) {
    if (game.isGameOver()) {
        return;
    }

    // 获取点击位置
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 计算棋盘坐标
    const row = Math.round(y / CELL_SIZE - 0.5);
    const col = Math.round(x / CELL_SIZE - 0.5);

    // 检查坐标是否有效
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
        return;
    }

    // 尝试落子
    if (game.makeMove(row, col)) {
        // 更新棋盘显示
        board.drawBoard(game.getBoard());

        // 显示最后一步标记
        const lastMove = game.getLastMove();
        if (lastMove) {
            board.drawLastMoveMarker(lastMove.row, lastMove.col);
        }

        // 检查游戏是否结束
        if (game.isGameOver()) {
            const winner = game.getWinner();
            const winnerText = winner === 1 ? '黑棋' : '白棋';
            renderMessage(`${winnerText}获胜！`, true);

            // 高亮获胜的五子
            const winningStones = game.getWinningStones();
            if (winningStones) {
                board.highlightWinningStones(winningStones);
            }
        } else {
            // 切换玩家
            game.switchPlayer();
            renderCurrentPlayer();
        }
    }
}

// 处理新游戏按钮点击
function handleNewGame() {
    game.reset();
    board.drawBoard(game.getBoard());
    renderCurrentPlayer();
    renderMessage('');
}

// 处理悔棋按钮点击
function handleUndo() {
    if (game.undo()) {
        board.drawBoard(game.getBoard());

        // 显示最后一步标记（如果有的话）
        const lastMove = game.getLastMove();
        if (lastMove) {
            board.drawLastMoveMarker(lastMove.row, lastMove.col);
        }

        renderCurrentPlayer();
        renderMessage('');

        // 显示剩余可悔棋步数
        const undoCount = game.getUndoCount();
        if (undoCount > 0) {
            renderMessage(`还可悔棋 ${undoCount} 步`);
        }
    } else {
        renderMessage('没有可悔的棋步');
    }
}

// 绑定事件监听器
canvas.addEventListener('click', handleCanvasClick);
newGameBtn.addEventListener('click', handleNewGame);
undoBtn.addEventListener('click', handleUndo);

// 初始化显示
board.drawBoard(game.getBoard());
renderCurrentPlayer();