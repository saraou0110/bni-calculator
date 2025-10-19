document.addEventListener('DOMContentLoaded', function() {
    createGalaxy();
    
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    
    calculateBtn.addEventListener('click', function() {
        const meetings = parseInt(document.getElementById('meetings').value) || 0;
        const visits = parseInt(document.getElementById('visits').value) || 0;
        const oneOnOne = parseInt(document.getElementById('oneOnOne').value) || 0;
        const invitations = parseInt(document.getElementById('invitations').value) || 0;
        const introductions = parseInt(document.getElementById('introductions').value) || 0;
        const speeches = parseInt(document.getElementById('speeches').value) || 0;
        const training = parseInt(document.getElementById('training').value) || 0;
        const years = parseInt(document.getElementById('years').value) || 0;
        const goldMember = parseInt(document.getElementById('goldMember').value) || 0;
        const lt = parseInt(document.getElementById('lt').value) || 0;
        const ambassador = parseInt(document.getElementById('ambassador').value) || 0;
        const leader = parseInt(document.getElementById('leader').value) || 0;
        
        // 基础金额计算
        let baseAmount = 0;
        baseAmount += meetings * 500;
        baseAmount += visits * 500;
        baseAmount += oneOnOne * 500;
        baseAmount += invitations * 500;
        baseAmount += introductions * 500;
        baseAmount += speeches * 5000;
        baseAmount += training * 500;
        
        // 计算加成系数
        let multiplier = 1;
        multiplier += years * 0.05; // 年限×5%
        if (goldMember) multiplier += 0.20; // 金章20%
        if (lt) multiplier += 0.15; // LT15%
        if (ambassador) multiplier += 0.25; // 董顾大使25%
        if (leader) multiplier += 0.10; // 组长10%
        
        // 最终金额
        let totalAmount = Math.round(baseAmount * multiplier);
        
        resultDiv.innerHTML = `
            <div>基础金额: ${baseAmount.toLocaleString()} 元</div>
            <div>加成系数: ${(multiplier * 100).toFixed(1)}%</div>
            <div><strong>总引荐金额: ${totalAmount.toLocaleString()} 元</strong></div>
        `;
        resultDiv.style.display = 'block';
        
        if (totalAmount >= 10000) {
            createRealisticCoinDrop();
        }
    });
    
    function createGalaxy() {
        const galaxy = document.createElement('div');
        galaxy.className = 'galaxy';
        document.body.appendChild(galaxy);
        
        for (let i = 0; i < 150; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'coin-fragment';
            fragment.style.left = Math.random() * 100 + '%';
            fragment.style.top = Math.random() * 100 + '%';
            fragment.style.animationDelay = Math.random() * 8 + 's';
            fragment.style.animationDuration = (Math.random() * 4 + 6) + 's';
            galaxy.appendChild(fragment);
        }
    }
    
    function createRealisticCoinDrop() {
        const coinCount = 30;
        const coins = [];
        
        for (let i = 0; i < coinCount; i++) {
            setTimeout(() => {
                const coin = document.createElement('div');
                coin.className = 'coin';
                
                // 随机起始位置
                const startX = Math.random() * window.innerWidth;
                const startY = -50;
                
                coin.style.left = startX + 'px';
                coin.style.top = startY + 'px';
                
                // 随机物理参数
                const velocityX = (Math.random() - 0.5) * 4; // 水平速度
                const velocityY = Math.random() * 2 + 1; // 垂直速度
                const rotationSpeed = (Math.random() - 0.5) * 10; // 旋转速度
                const gravity = 0.3; // 重力
                const bounce = 0.6; // 弹跳系数
                const friction = 0.98; // 摩擦力
                const coinRadius = 15; // 金币半径
                
                // 设置初始透明度
                coin.style.opacity = '1';
                
                let currentX = startX;
                let currentY = startY;
                let currentVelocityX = velocityX;
                let currentVelocityY = velocityY;
                let currentRotation = 0;
                let bounces = 0;
                const maxBounces = 3;
                
                // 金币对象
                const coinObj = {
                    element: coin,
                    x: currentX,
                    y: currentY,
                    vx: currentVelocityX,
                    vy: currentVelocityY,
                    radius: coinRadius
                };
                
                coins.push(coinObj);
                document.body.appendChild(coin);
                
                function animateCoin() {
                    // 更新位置
                    currentX += currentVelocityX;
                    currentY += currentVelocityY;
                    currentVelocityY += gravity; // 重力影响
                    currentRotation += rotationSpeed;
                    
                    // 更新金币对象位置
                    coinObj.x = currentX;
                    coinObj.y = currentY;
                    coinObj.vx = currentVelocityX;
                    coinObj.vy = currentVelocityY;
                    
                    // 金币碰撞检测
                    for (let j = 0; j < coins.length; j++) {
                        const otherCoin = coins[j];
                        if (otherCoin !== coinObj) {
                            const dx = coinObj.x - otherCoin.x;
                            const dy = coinObj.y - otherCoin.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            if (distance < coinRadius * 2 && distance > 0) {
                                // 碰撞发生
                                const angle = Math.atan2(dy, dx);
                                const sin = Math.sin(angle);
                                const cos = Math.cos(angle);
                                
                                // 交换速度
                                const vx1 = coinObj.vx * cos + coinObj.vy * sin;
                                const vy1 = coinObj.vy * cos - coinObj.vx * sin;
                                const vx2 = otherCoin.vx * cos + otherCoin.vy * sin;
                                const vy2 = otherCoin.vy * cos - otherCoin.vx * sin;
                                
                                coinObj.vx = vx2 * cos - vy1 * sin;
                                coinObj.vy = vy1 * cos + vx2 * sin;
                                otherCoin.vx = vx1 * cos - vy2 * sin;
                                otherCoin.vy = vy2 * cos + vx1 * sin;
                                
                                // 分离金币
                                const overlap = coinRadius * 2 - distance;
                                const separationX = (overlap / 2) * cos;
                                const separationY = (overlap / 2) * sin;
                                
                                currentX += separationX;
                                currentY += separationY;
                                otherCoin.x -= separationX;
                                otherCoin.y -= separationY;
                                
                                currentVelocityX = coinObj.vx;
                                currentVelocityY = coinObj.vy;
                            }
                        }
                    }
                    
                    // 边界检测和弹跳
                    if (currentX < 0 || currentX > window.innerWidth - 30) {
                        currentVelocityX *= -bounce;
                        currentX = Math.max(0, Math.min(window.innerWidth - 30, currentX));
                    }
                    
                    if (currentY > window.innerHeight - 30) {
                        if (bounces < maxBounces) {
                            currentVelocityY *= -bounce;
                            currentY = window.innerHeight - 30;
                            bounces++;
                        } else {
                            // 停止弹跳，开始滚动
                            currentVelocityY = 0;
                            currentY = window.innerHeight - 30;
                            
                            // 弹跳结束后，开始消失动画
                            if (!coinObj.fading) {
                                coinObj.fading = true;
                                setTimeout(() => {
                                    coin.style.transition = 'opacity 10s ease-out';
                                    coin.style.opacity = '0';
                                    
                                    setTimeout(() => {
                                        // 从数组中移除
                                        const index = coins.indexOf(coinObj);
                                        if (index > -1) {
                                            coins.splice(index, 1);
                                        }
                                        coin.remove();
                                    }, 10000);
                                }, 1000); // 弹跳结束后等待1秒再开始消失
                            }
                        }
                    }
                    
                    // 应用摩擦力
                    currentVelocityX *= friction;
                    
                    // 更新样式
                    coin.style.left = currentX + 'px';
                    coin.style.top = currentY + 'px';
                    coin.style.transform = `rotate(${currentRotation}deg)`;
                    
                    // 检查是否还在屏幕内或正在消失
                    if (currentY < window.innerHeight + 50 && !coinObj.fading) {
                        requestAnimationFrame(animateCoin);
                    } else if (coinObj.fading) {
                        // 金币正在消失，继续动画直到完全消失
                        requestAnimationFrame(animateCoin);
                    }
                }
                
                animateCoin();
                
            }, i * 50);
        }
    }
});
