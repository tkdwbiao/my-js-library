// ==UserScript==
// @name         替换 JS 文件请求
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  替换指定的 JS 文件
// @author       你
// @match        http://newesxidian.chaoxing.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // 原始 JS 文件和替换的 URL
    const originalJsUrl = '/adminown/newvideo/video8.10.min.js';
    const replacementJsUrl = 'https://cdn.jsdelivr.net/gh/tkdwbiao/my-js-library@main/xd_js/wangke/xidian_video8.10.min.js';

    // 使用 MutationObserver 替换动态加载的 <script> 标签
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'SCRIPT' && node.src.includes(originalJsUrl)) {
                        console.log(`发现原始 JS 文件：${node.src}`);
                        // 替换 JS 文件
                        node.src = replacementJsUrl;
                        console.log(`替换为自定义 JS 文件：${replacementJsUrl}`);
                    }
                });
            }
        });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    console.log('JS 替换脚本已启动！');
})();
