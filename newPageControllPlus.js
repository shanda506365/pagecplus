/*
 //invoicePageControl.InitPageController 
    var invoicePageControl = createPageControllerPlus({
        containerId:containerId,
        totalCount: totalCount,
        pageSize: pageSize,
        firstBtn: document.getElementById('firstBtn'),
        preBtn: document.getElementById('preBtn'),
        nextBtn: document.getElementById('nextBtn'),
        lastBtn: document.getElementById('lastBtn'),
        pageText: document.getElementById('pageText'),
        msgText: document.getElementById('msgText'),
        validateFun: validateFun,
        loadPageJson: LoadPageJson
    });
*/
define(function(require, exports, module) {
    return function(param, $) {
        //var createPageControllerPlus = function(param) {
        var pageControllerPlus = {
            containerId:param.containerId,
            totalCount: param.totalCount,
            pageSize: param.pageSize,
            totalPage: 0,
            currPage: 1,
            firstBtn: param.firstBtn,
            preBtn: param.preBtn,
            nextBtn: param.nextBtn,
            lastBtn: param.lastBtn,
            pageText: param.pageText,
            msgText: param.msgText,
            validateFun: param.validateFun,
            loadPageJson: param.loadPageJson,

            firstPage: function() {
                var me = this;
                var oldPage = me.currPage;
                var page1 = 1;
                me.loadPageJson(page1, false, false, function() {
                    me.currPage = 1;
                    me.pageChange();
                }, function() {
                    me.currPage = oldPage;
                    me.pageChange();
                }, me.validateFun);
            },
            prePage: function() {
                var me = this;
                var oldPage = me.currPage;
                var page1 = me.currPage - 1;
                me.loadPageJson(page1, false, false, function() {
                    me.currPage--;
                    me.pageChange();
                }, function() {
                    me.currPage = oldPage;
                    me.pageChange();
                }, me.validateFun);
            },
            nextPage: function() {
                var me = this;
                var oldPage = me.currPage;
                var page1 = me.currPage + 1;
                me.loadPageJson(page1, false, false, function() {
                    me.currPage++;
                    me.pageChange();
                }, function() {
                    me.currPage = oldPage;
                    me.pageChange();
                }, me.validateFun);

            },
            lastPage: function() {
                var me = this;
                var oldPage = me.currPage;
                var page1 = me.totalPage;
                me.pageChange();
                me.loadPageJson(page1, false, false, function() {
                    me.currPage = me.totalPage;
                    me.pageChange();
                }, function() {
                    me.currPage = oldPage;
                    me.pageChange();
                }, me.validateFun);

            },
            gotoPage: function(newPage) {
                var me = this;
                var oldPage = me.currPage;
                //currPage++;
                var page1 = parseInt(newPage);

                //pageChange();

                me.loadPageJson(page1, false, false, function() {
                    //currPage++;
                    me.currPage = newPage;
                    me.pageChange();
                }, function() {
                    me.currPage = oldPage;
                    me.pageChange();
                }, me.validateFun);

            },
            SetGotoPageEnterCssEvent: function() {
                var me = this;
                if (me.msgText) {
                    //分页gotoPageEnter按钮样式
                    $("#"+me.containerId +" .gotoPageEnter").on({
                        "mouseover": function() {
                            var cursor = $(this).css("cursor");

                            $(this).css({
                                'color': '#fff',
                                'background-color': '#DD4400',
                                'border-color': '#DD4400'
                            });
                        },
                        "mouseout": function() {
                            var cursor = $(this).css("cursor");

                            $(this).css({
                                'color': '#000',
                                'background-color': '#fff',
                                'border-color': '#dddada'
                            });
                        },
                        "click": function() {
                            var gotoPageDom = $("#"+me.containerId +" .gotoPageEnter").parent('label').children('.gotoPage');
                            //alert(gotoPageDom.val());currPage > 1 && totalPage >= 1
                            if (gotoPageDom.val() <= 0) {
                                gotoPageDom.focus();
                                return;
                            }
                            if (gotoPageDom.val() == me.currPage) {
                                return;
                            }
                            if (gotoPageDom.val() > me.totalPage) {
                                gotoPageDom.focus();
                                return;
                            }
                            me.gotoPage(gotoPageDom.val());
                        }
                    });

                    //分页页码输入框样式
                    var gotoPageTrpronum = "";
                    $("#"+me.containerId +' .gotoPage').on({
                        "focus": function() {
                            var cursor = $(this).css("cursor");

                            $(this).css({
                                'border-color': '#DD4400'
                            });
                        },
                        "blur": function() {
                            var cursor = $(this).css("cursor");

                            $(this).css({
                                'border-color': '#dddada'
                            });
                        },
                        "keyup": function() {
                            var decimalReg = /^[1-9]\d{0,8}$/g;
                            if (this.value != "" && decimalReg.test(this.value)) {
                                gotoPageTrpronum = this.value;
                            } else {
                                if (this.value != "") {
                                    this.value = gotoPageTrpronum;
                                }
                            }
                        }
                    });
                };
                //分页页码样式
                $("#"+me.containerId +" .pageBtn").on({
                    "mouseover": function() {
                        if ($(this).hasClass('curPageBtn')) {
                            return;
                        }
                        $(this).css({
                            'color': '#fff',
                            'background-color': '#DD4400',
                            'border-color': '#DD4400'
                        });
                    },
                    "mouseout": function() {
                        if ($(this).hasClass('curPageBtn')) {
                            return;
                        }
                        $(this).css({
                            'color': '#000',
                            'background-color': '#fff',
                            'border-color': '#dddada'
                        });
                    },
                    "click": function(e) {
                        e.stopPropagation();
                        var goPage = $(this).attr('pageSeed');
                        //alert(gotoPageDom.val());currPage > 1 && totalPage >= 1

                        if (goPage == me.currPage) {
                            return;
                        }

                        me.gotoPage(goPage);
                    }
                });
            },
            pageChange: function() {
                var me = this;
                if (me.currPage > 1 && me.totalPage >= 1) {
                    me.firstBtn.style.cursor = "pointer";
                    me.firstBtn.style.color = 'black';
                    me.firstBtn.onclick = function() {
                        me.firstPage();
                    };

                    me.preBtn.style.cursor = "pointer";
                    me.preBtn.style.color = 'black';
                    me.preBtn.onclick = function() {
                        me.prePage();
                    };

                } else {
                    me.firstBtn.style.cursor = "default";
                    me.firstBtn.style.color = 'gray';
                    me.firstBtn.onclick = function() {};

                    me.preBtn.style.cursor = "default";
                    me.preBtn.style.color = 'gray';
                    me.preBtn.onclick = function() {};
                }
                if (me.currPage < me.totalPage) {
                    me.lastBtn.style.cursor = "pointer";
                    me.lastBtn.style.color = 'black';
                    me.lastBtn.onclick = function() {
                        me.lastPage();
                    };

                    me.nextBtn.style.cursor = "pointer";
                    me.nextBtn.style.color = 'black';
                    me.nextBtn.onclick = function() {
                        me.nextPage();
                    };

                } else {
                    me.lastBtn.style.cursor = "default";
                    me.lastBtn.style.color = 'gray';
                    me.lastBtn.onclick = function() {};

                    me.nextBtn.style.cursor = "default";
                    me.nextBtn.style.color = 'gray';
                    me.nextBtn.onclick = function() {};

                }
                //显示本页+-2的页码
                //pageText.innerHTML = '第 ' + currPage + '   页 ,共 ' + totalPage + ' 页';
                var pageTextHtml = "";
                var startPage = 1,
                    endPage = 5;

                startPage = me.currPage > 2 ? me.currPage - 2 : 1;
                endPage = me.currPage < (me.totalPage - 2) ? ((startPage + 4) > me.totalPage ? me.totalPage : startPage + 4) : me.totalPage;
                //总页面大于5页，当前范围不足5页
                if ((endPage - startPage) < 4 && me.totalPage >= 5) {
                    endPage = me.totalPage;
                    startPage = me.totalPage - 4 > 1 ? me.totalPage - 4 : 1;
                }

                if (startPage > 1) {
                    pageTextHtml += '<span class="pageControllS">...</span>';
                }

                for (var i = startPage; i <= endPage; i++) {
                    if (i == me.currPage) {
                        pageTextHtml += '<a class="pageBtn curPageBtn" style="color: #000;" pageSeed="' + i + '"  href="javascript:void(0)">' + i + '</a>';
                        continue;
                    }
                    pageTextHtml += '<a class="pageBtn" style="color: #000;" pageSeed="' + i + '"  href="javascript:void(0)">' + i + '</a>';
                }

                if (endPage < me.totalPage) {
                    pageTextHtml += '<span class="pageControllS">...</span>';
                }
                me.pageText.innerHTML = pageTextHtml;

                var gotoPageVal = parseInt(me.currPage) + 1 > me.totalPage ? me.totalPage : parseInt(me.currPage) + 1;
                if (me.msgText) {
                    me.msgText.innerHTML = '共 ' + me.totalPage + ' 页，到第' + '<input class="gotoPage" type="text" value="' + gotoPageVal + '"/>' + '页' + ' <input class="gotoPageEnter" type="button" value="确定"/>';

                };
                me.SetGotoPageEnterCssEvent();


            },
            InitPageController: function(isSearch) {
                var me = this;
                me.totalPage = 0;
                if (isSearch) {
                    me.currPage = 1;
                }

                if (me.totalCount % me.pageSize == 0) {
                    me.totalPage = me.totalCount / me.pageSize;
                } else {
                    me.totalPage = parseInt(me.totalCount / me.pageSize) + 1;
                }
                if (me.currPage > me.totalPage) {
                    me.currPage = 1;
                }
                me.pageChange();
            }

        };

        if (pageControllerPlus.totalCount % pageControllerPlus.pageSize == 0) {
            pageControllerPlus.totalPage = pageControllerPlus.totalCount / pageControllerPlus.pageSize;
        } else {
            pageControllerPlus.totalPage = parseInt(pageControllerPlus.totalCount / pageControllerPlus.pageSize) + 1;
        }

        //myInitPageController = pageControllerPlus.InitPageController;
        pageControllerPlus.pageChange();
        return pageControllerPlus;
        //};
    };

});
