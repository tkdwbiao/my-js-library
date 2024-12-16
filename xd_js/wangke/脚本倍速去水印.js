// ==UserScript==
// @name         视频快进与水印去除脚本
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  使用方向键控制多个视频快进/后退，并去除页面水印，空格键控制视频暂停/播放
// @author       阿彪
// @match        http://newesxidian.chaoxing.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const WATERMARK_CHECK_INTERVAL = 10000; // 水印检查间隔（10秒）
    const WATERMARK_CHECK_LIMIT = 3; // 最大检查次数

    window.addEventListener('load', () => {
        // 页面加载后，启动水印移除检测
        startWatermarkRemoval();

        // 获取所有视频元素
        const videos = document.querySelectorAll('video');
        if (videos.length > 0) {
            console.log(`找到 ${videos.length} 个视频元素，启用同步快进/后退功能`);

            document.addEventListener('keydown', function (event) {
                // 遍历每个视频，应用同步控制逻辑
                videos.forEach(video => {
                    // 空格键暂停/播放视频
                    if (event.key === ' ' || event.key === 'Spacebar') {
                        if (video.paused) {
                            video.play();
                            console.log('所有视频播放');
                        } else {
                            video.pause();
                            console.log('所有视频暂停');
                        }
                    } else if (event.key === 'ArrowRight') {
                        video.currentTime += 10;
                        console.log(`快进 10 秒，当前时间: ${video.currentTime.toFixed(2)} 秒`);
                    } else if (event.key === 'ArrowLeft') {
                        video.currentTime -= 10;
                        console.log(`后退 10 秒，当前时间: ${video.currentTime.toFixed(2)} 秒`);
                    }
                });
            });
        } else {
            console.log('未找到视频元素，请确认页面是否有 <video> 标签');
        }
    });

    /**
     * 去除水印的函数
     */
    function removeWatermark() {
        const watermark = document.querySelector('.mark-content');
        if (watermark) {
            watermark.remove();
            console.log('水印已移除');
        } else {
            // console.log('未找到水印元素');
        }
    }

    /**
     * 启动水印检测并定时移除水印
     */
    function startWatermarkRemoval() {
        let checkCount = 0;

        const watermarkCheckInterval = setInterval(() => {
            checkCount++;

            if (checkCount > WATERMARK_CHECK_LIMIT) {
                clearInterval(watermarkCheckInterval); 
            } else {
                removeWatermark();
            }
        }, WATERMARK_CHECK_INTERVAL);
    }
})();
