;(function($){
    function Slide() {

        this.container = $('#container') ;
        this.list = this.container.find('#list') ;
        this.lists = this.list.children() ;
        this.buttons = this.container.find('#buttons').children();
        this.imgs = this.list.find('img');
        this.prevBtn = this.container.find('#prev');
        this.nextBtn = this.container.find('#next');
        this.rotateFlag   = true;
        this.time = null ;
        this.index = 0 ;
        this.settings = {
            width : 600 ,
            height : 400 ,
            autoPlay : true ,
            speed : 300 ,
            delay : 3000
        }
        $.extend(this.settings,this.options) ;


    }

    Slide.prototype = {
        constructor : Slide ,
        setDefaultSize : function(){
            var width = this.settings.width ,
                height = this.settings.height ;
            this.container.css({
                width : width ,
                height: height
            }) ;
            this.list.css({
                width : width*this.lists.length ,
                height: height
            }) ;
            this.lists.each(function () {
                $(this).css({
                    width : width ,
                    height: height
                })
            })
            this.imgs.each(function () {
                $(this).css({
                    width : width ,
                    height: height
                })
            })
        } ,
        autoPlaying : function(){
            var self = this ;
            if(this.settings.autoPlay === true){
                this.time = setInterval(function(){
                    var left = parseInt(self.list.css('left') );

                    self.list.animate({
                        left : left - self.settings.width
                    },self.settings.speed,function(){
                        self.rotateFlag = true ;
                        left = parseInt(self.list.css('left'));
                        if(left <-3000){
                            self.list.css('left',-600);
                            left = parseInt(self.list.css('left'));
                        }
                    });
                    self.index ++ ;
                    if(self.index > 4){
                        self.index = 0 ;
                    }
                    self.buttons.eq(self.index).attr('class','on');
                    self.buttons.eq(self.index).siblings().attr('class','');
                },self.settings.delay)
            }
        } ,
        haltPlay : function(){
            var self = this ;
            this.container.hover(function(){
                clearInterval(self.time) ;
                self.time = null ;
            },function(){
                self.autoPlaying() ;
            })

        } ,
        next : function(){
            var self = this ;

            this.nextBtn.click(function(){
                if(self.rotateFlag === true){

                    self.rotateFlag = false ;
                    var left = parseInt(self.list.css('left') );
                    self.list.animate({
                        left : left - self.settings.width
                    },self.settings.speed,function(){
                        self.rotateFlag = true ;
                        left = parseInt(self.list.css('left'));
                        if(left <-3000){
                            self.list.css('left',-600);
                            left = parseInt(self.list.css('left'));
                        }
                    });
                    self.index ++ ;
                    if(self.index > 4){
                        self.index = 0 ;
                    }
                    self.buttons.eq(self.index).attr('class','on');
                    self.buttons.eq(self.index).siblings().attr('class','');
                }

            });
        },
        prev : function(){
            var self = this ;

            this.prevBtn.click(function(){
                if(self.rotateFlag === true){
                    var left = parseInt(self.list.css('left')) ;
                    self.rotateFlag = false ;
                    self.list.animate({
                        left : left + self.settings.width
                    },self.settings.speed,function(){
                        self.rotateFlag = true ;
                        left = parseInt(self.list.css('left'));
                        if(left >-600){
                            self.list.css('left',-3000);
                            left = parseInt(self.list.css('left'));
                        }
                    })
                    self.index -- ;
                    if(self.index < 0){
                        self.index = 4 ;
                    }
                    self.buttons.eq(self.index).attr('class','on');
                    self.buttons.eq(self.index).siblings().attr('class','');
                }


            });
        },
        dotClick : function () {
            var self =this ;
            this.buttons.bind('click',function (e) {
                $(e.target).attr('class','on') ;
                $(e.target).siblings().attr('class','');
                var sum = $(e.target).attr('index') - (self.index) ;
                //if(sum>0) {

                    self.list.animate({
                        left: parseInt(self.list.css('left')) - self.settings.width * sum
                    }, self.settings.speed, function () {
                        self.index = $(e.target).attr('index');
                        sum = $(e.target).attr('index') - (self.index);
                    });
               // }
                // }else {
                //     console.log(111)
                //     self.list.animate({
                //         left : parseInt(self.list.css('left')) - self.settings.width*sum
                //     },self.settings.speed,function(){
                //         self.index = $(e.target).attr('index') ;
                //         sum = $(e.target).attr('index') - (self.index) ;
                //     });
                // }
            })
        }
    }

    var slide = new Slide();
    slide.setDefaultSize() ;
    slide.autoPlaying();
    slide.next();
    slide.prev();
    slide.dotClick();
    slide.haltPlay();
    window.Slide = Slide ;
})(jQuery);