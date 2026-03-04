// 棋盘绘制模块

export class Board {
    constructor(canvas, boardSize, cellSize) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.boardSize = boardSize;
        this.cellSize = cellSize;

        // 设置画布大小
        this.canvas.width = boardSize * cellSize;
        this.canvas.height = boardSize * cellSize;

        // 颜色配置
        this.boardColor = '#DEB887'; // 棋盘颜色（木质色）
        this.lineColor = '#8B4513';  // 线条颜色
        this.blackColor = '#000000'; // 黑棋颜色
        this.whiteColor = '#FFFFFF'; // 白棋颜色
        this.stoneRadius = cellSize * 0.4; // 棋子半径
    }

    // 绘制整个棋盘
    drawBoard(boardState) {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制棋盘背景
        this.drawBoardBackground();

        // 绘制网格线
        this.drawGrid();

        // 绘制棋子
        this.drawStones(boardState);

        // 绘制星位（天元和小星）
        this.drawStarPoints();
    }

    // 绘制棋盘背景
    drawBoardBackground() {
        this.ctx.fillStyle = this.boardColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // 绘制网格线
    drawGrid() {
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = 1;

        // 绘制横线
        for (let i = 0; i < this.boardSize; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.cellSize / 2, this.cellSize / 2 + i * this.cellSize);
            this.ctx.lineTo(this.canvas.width - this.cellSize / 2, this.cellSize / 2 + i * this.cellSize);
            this.ctx.stroke();
        }

        // 绘制竖线
        for (let i = 0; i < this.boardSize; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.cellSize / 2 + i * this.cellSize, this.cellSize / 2);
            this.ctx.lineTo(this.cellSize / 2 + i * this.cellSize, this.canvas.height - this.cellSize / 2);
            this.ctx.stroke();
        }
    }

    // 绘制棋子
    drawStones(boardState) {
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const piece = boardState[row][col];
                if (piece !== 0) {
                    this.drawStone(row, col, piece);
                }
            }
        }
    }

    // 绘制单个棋子
    drawStone(row, col, player) {
        const x = this.cellSize / 2 + col * this.cellSize;
        const y = this.cellSize / 2 + row * this.cellSize;

        // 设置棋子颜色
        this.ctx.fillStyle = player === 1 ? this.blackColor : this.whiteColor;

        // 绘制棋子（圆形）
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.stoneRadius, 0, 2 * Math.PI);
        this.ctx.fill();

        // 如果是白棋，添加边框
        if (player === 2) {
            this.ctx.strokeStyle = this.lineColor;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }

        // 添加高光效果
        this.drawStoneHighlight(x, y, player);
    }

    // 绘制棋子高光效果
    drawStoneHighlight(x, y, player) {
        const gradient = this.ctx.createRadialGradient(
            x - this.stoneRadius * 0.3,
            y - this.stoneRadius * 0.3,
            0,
            x,
            y,
            this.stoneRadius
        );

        if (player === 1) {
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.stoneRadius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    // 绘制星位
    drawStarPoints() {
        this.ctx.fillStyle = this.lineColor;

        // 标准五子棋星位位置
        const starPoints = [
            [3, 3], [3, 11], [11, 3], [11, 11], // 四个角
            [7, 7] // 天元（中心）
        ];

        // 如果棋盘太小，只画天元
        if (this.boardSize < 15) {
            starPoints.splice(0, 4);
        }

        for (const [row, col] of starPoints) {
            if (row < this.boardSize && col < this.boardSize) {
                const x = this.cellSize / 2 + col * this.cellSize;
                const y = this.cellSize / 2 + row * this.cellSize;

                this.ctx.beginPath();
                this.ctx.arc(x, y, 3, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }
    }

    // 在指定位置绘制预览棋子
    drawPreviewStone(row, col, player) {
        const x = this.cellSize / 2 + col * this.cellSize;
        const y = this.cellSize / 2 + row * this.cellSize;

        // 设置半透明颜色
        this.ctx.fillStyle = player === 1 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.7)';

        // 绘制半透明棋子
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.stoneRadius * 0.8, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    // 清除预览棋子
    clearPreview() {
        // 重新绘制整个棋盘
        const boardState = this.lastBoardState || Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(0));
        this.drawBoard(boardState);
    }

    // 获取棋盘大小
    getBoardSize() {
        return this.boardSize;
    }

    // 获取格子大小
    getCellSize() {
        return this.cellSize;
    }

    // 获取画布元素
    getCanvas() {
        return this.canvas;
    }

    // 坐标转换为棋盘位置
    pixelToBoard(x, y) {
        const col = Math.round(x / this.cellSize - 0.5);
        const row = Math.round(y / this.cellSize - 0.5);
        return { row, col };
    }

    // 棋盘位置转换为坐标
    boardToPixel(row, col) {
        const x = this.cellSize / 2 + col * this.cellSize;
        const y = this.cellSize / 2 + row * this.cellSize;
        return { x, y };
    }

    // 高亮显示获胜的五子
    highlightWinningStones(winningStones) {
        // 保存当前棋盘状态
        this.saveBoardState(this.lastBoardState || Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(0)));

        // 重新绘制棋盘
        this.drawBoard(this.lastBoardState);

        // 高亮获胜的棋子
        for (const [row, col] of winningStones) {
            const { x, y } = this.boardToPixel(row, col);

            // 绘制高亮圆圈
            this.ctx.strokeStyle = '#FF0000';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.stoneRadius + 5, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }

    // 保存当前棋盘状态
    saveBoardState(boardState) {
        this.lastBoardState = boardState.map(row => [...row]);
    }

    // 绘制最后落子标记
    drawLastMoveMarker(row, col) {
        const { x, y } = this.boardToPixel(row, col);

        // 绘制小圆点标记
        this.ctx.fillStyle = '#FF0000';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}