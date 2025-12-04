var app = new Vue({
            el: '#app',
            data: {
                timeHanlde: null,
                tim: 0,
                masterUrls: [
                    "https://okking61.com/",
                    "https://okking62.com/",
                    "https://okking63.com/",
                    "https://okking64.com/",
                    "https://okking65.com/",
                    "https://okking66.com/",
                    "https://okking67.com/",
                    "https://okking68.com/",
                    "https://okking70.com/",
                    "https://okking71.com/",
                    "https://okking73.com/",
                    "https://okking75.com/",
                    "https://okking77.com/",
                    "https://okking87.com/",
                    "https://okking89.com/",
                    "https://okking91.com/",
                    "https://okking93.com/",
                    "https://okking95.com/",
                    "https://okking79.com/",
                    "https://okking81.com/",
                    "https://okking83.com/",
                    "https://okking85.com/",
                    "https://okking72.com/",
                    "https://okking74.com/",
                    "https://okking78.com/",
                    "https://okking80.com/",
                    "https://okking82.com/",
                    "https://okking84.com/",
                    "https://okking86.com/",
                ],
                urls: [],
                moburls: [],
                waitingText: "đang kiểm duyệt ",
                connectTimeout: "hết hạn",
                connectFail: '9ms',
                name: 'okking.com/',
                kefuUrl: "https://0294k61.x0icj44b.com/chatwindow.aspx?siteId=65002300&planId=55c2d7f7-3521-4c8b-a842-347a0a5a8e4a&chatgroup=4&_=1762656733356",
                apkAppUrl: 'https://okking91.com/DownloadApp/',
                pcUrl: 'https://okking91.com/DownloadApp/',
            },
            mounted() {
                this.urls = this.getRandomUrls(5);
                this.moburls = this.getRandomUrls(5);
                this.startPingCheck();
            },
            methods: {
                getRandomUrls(count) {
                    const shuffled = this.masterUrls.slice().sort(() => 0.5 - Math.random());
                    const selectedUrls = shuffled.slice(0, count);
                    return selectedUrls.map((url, index) => ({
                        url: url,
                        title: `Link truy cập ${index + 1}`,
                        second: this.waitingText,
                        time: 0
                    }));
                },
                startPingCheck() {
                    this.timeHanlde = setInterval(() => {
                        this.tim++
                    }, 100)
                    for (let i = 0; i < this.urls.length; i++) {
                        this.send(this.urls[i].url, i, 'urls')
                    }
                    for (let j = 0; j < this.moburls.length; j++) {
                        this.send(this.moburls[j].url, j, 'moburls');
                    }
                    setTimeout(() => {
                        this.sortList(this.urls);
                        this.sortList(this.moburls);
                    }, 1000)
                },
                refresh() {
                    this.tim = 0
                    clearInterval(this.timeHanlde)
                    this.urls = this.getRandomUrls(5);
                    this.moburls = this.getRandomUrls(5);
                    this.startPingCheck();
                },
                sortOrder(filed, type = 'asc') {
                    return (a, b) => {
                        if (type === 'asc') return a[filed] > b[filed] ? 1 : -1;
                        return a[filed] > b[filed] ? -1 : 1;
                    }
                },
                sortList() {
                    this.urls.sort(this.sortOrder('time', 'asc'))
                    this.moburls.sort(this.sortOrder('time', 'asc'))
                },
                send(url, index, listName) {
                    const _this = this
                    $.ajax({
                        type: 'get',
                        url: url,
                        dataType: 'jsonp',
                        timeout: 1000,
                        complete: function (res) {
                            const targetList = _this[listName];
                            if (res.status == 200) {
                                if (_this.tim > 5000) {
                                    targetList[index].second = _this.connectTimeout;
                                }
                                else {
                                    targetList[index].second = _this.tim + 'ms';
                                }
                                targetList[index].time = _this.tim;
                            }
                            else {
                                targetList[index].second = _this.connectFail;
                                targetList[index].time = 999999;
                            }
                        },
                    })
                },
                down() {
                    if (this.browserDetection() == 'PC') {
                        window.location.href = this.pcUrl;
                    } else {
                        if (this.browserDetection() == 'iphone' || this.browserDetection() == 'ipad') {
                            window.location.href = this.ios_step_1
                            setTimeout(() => {
                                window.location.href = this.ios_step_2
                            }, 2000)
                        } else {
                            window.location.href = this.apkAppUrl;
                        }
                    }
                },
                browserDetection() {
                    var userAgent = window.navigator.userAgent.toLowerCase();
                    var browser = null;
                    if (userAgent.match(/ipad/i)) {
                        browser = 'ipad';
                    } else if (userAgent.match(/iphone os/i)) {
                        browser = 'iphone';
                    } else if (userAgent.match(/midp/i)) {
                        browser = 'midp'
                    } else if (userAgent.match(/rv:1.2.3.4/i)) {
                        browser = 'rv:1.2.3.4';
                    } else if (userAgent.match(/ucweb/i)) {
                        browser = 'ucweb';
                    } else if (userAgent.match(/android/i)) {
                        browser = 'android';
                    } else if (userAgent.match(/windows ce/i)) {
                        browser = 'windowsCe';
                    } else if (userAgent.match(/windows mobile/i)) {
                        browser = 'windowsMobile';
                    } else {
                        browser = 'PC'
                    }
                    return browser;
                }
            }
        })
        document.addEventListener("DOMContentLoaded", function () {
            const txtElements = document.querySelectorAll(".txt");

            function updateRandomPing() {
                txtElements.forEach(element => {
                    const randomPing = Math.floor(Math.random() * 10 + 1) + "ms";
                    element.textContent = randomPing;
                });
            }

            updateRandomPing();

            setTimeout(() => {
                setInterval(updateRandomPing, 1000);
            }, 1000);
        });