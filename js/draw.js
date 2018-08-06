var drawingObj = {
    cavs: $('.cavs'),
    context: $('.cavs').get(0).getContext('2d'),
    btnList: $('.btn-list'),
    colorBoard: $('#colorBoard'),
    lineRuler: $('#lineRuler'),
    imgArr: [],
    init: function () {
        this.draw();
        this.btnFn();
    },
    draw: function () {
        var cavs = this.cavs,
            self = this,
            flag = 0;
        var c_x = cavs.offset().left,
            c_y = cavs.offset().top;
        // console.log(c_x + ' '+c_y);
        cavs[0].onmousedown = function (e) {
            flag = 1;
            var e = e || window.event;
            var disX = e.pageX - c_x;
            var disY = e.pageY - c_y;
            self.context.beginPath();
            self.context.moveTo(disX, disY);
            console.log(disX + ' ' + disY);
            var img = self.context.getImageData(0, 0, 600, 300);
            self.imgArr.push(img);
        }
        cavs[0].onmousemove = function (e) {
            var e = e || window.event;
            if (flag) {
                var m_x = e.clientX - c_x;
                var m_y = e.clientY - c_y;
                self.context.lineTo(m_x, m_y);
                // console.log(m_x+' '+m_y)
                self.context.stroke();
            }
        }
        document.onmouseup = function () {
            self.context.closePath();
            flag = 0;
        }
    },
    btnFn: function () {
        var self = this;
        this.btnList.on('click', function (e) {
            var e = e || window.event;
            var target = e.target;
            var idName = target.getAttribute('id');
            switch (idName) {
                case 'cleanBoard':
                    self.context.clearRect(0, 0, 600, 300);
                    break;
                case 'eraser':
                    self.context.strokeStyle = '#fff';
                    break;
                case 'rescind':
                    {
                        var len = self.imgArr.length;
                        if (len > 0) {
                            self.context.putImageData(self.imgArr.pop(), 0, 0);
                        }
                        break
                    }
            }
        })
        this.colorBoard.change(function () { //当颜色改变时触发
            self.context.strokeStyle = $(this).val(); //改变画笔颜色
        });
        this.lineRuler.change(function () {
            self.context.lineWidth = $(this).val();
        });
    }
}


drawingObj.init();