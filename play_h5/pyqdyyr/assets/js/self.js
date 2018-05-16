var documentWidth = document.body.clientWidth;
var documentHeight = document.body.clientHeight;
var birthday = "";
var shengao = "";
var gender = "";
var name = "";
var xingzuo = "";
var date = "";


function init() {
	var buttonWidth = documentWidth*0.8;
	var buttonHeight = buttonWidth*90/618;

	$('.button').css({
		'height': buttonHeight +'px',
		'z-index': 10,
		'line-height' : buttonHeight +'px'
	});

	var pictureBoxWidth = documentWidth*0.85;
	var pictureBoxHeight = pictureBoxWidth*884/643;
	$('.picture-box').css({
		'width': pictureBoxWidth +'px',
		'height': pictureBoxHeight +'px',
		'position': 'relative',

	});

	var pictureWidth = pictureBoxWidth*0.93;
	var pictureHeight = pictureWidth*710/600;
	var pictureleft = pictureBoxWidth*0.048;
	var picturetop = pictureBoxHeight*0.18;
	$('.picture').css({
		'width': pictureWidth +'px',
		'height': pictureHeight +'px',
		'position': 'absolute',
		'z-index': '1',
		'bottom': '2%',
		'left': pictureleft +'px',
		'top':picturetop+'px'
	});

	$('.scan').css({
		'width': pictureWidth +'px',
		'height': pictureHeight +'px',
		'position': 'absolute',
		'z-index': '2',
		'left': pictureleft +'px',
		'top':picturetop+'px'
	});

	var textWidth = documentWidth*0.82;
	var textleft = documentWidth*0.107;

	$('.text').css({
		'width': textWidth +'px',
		'margin-left': textleft +'px',
	});
}

function checkName() {
	$('.user-name').val($('.user-name').val().replace(/[^\u4E00-\u9FA5]/g,''));
}
var waitHandler = null;
function makePicture() {
 	name = $('.user-name').val();
	if(name == '') {
	alert('请输入姓名');return;
}


gender = $(".gender input:checked").val();
if(typeof(gender)==="undefined" )
{
alert("请选择性别")
return false;
}


	birthday = $('.user-birthday').val();

	if(birthday == '') {
		alert('请选择出生日期');return;
	}
	shengao = $("#shengao").val()
	if(shengao=="请选择身高")
	{
		alert("请选择身高");
		return;
	}
	$('.transparent-float').css('display', 'block');
	$('.float').css('display', 'block');
	$('.scan').css('display', 'block');

	$('.mypicture').attr('src', '');
	$('.mypicture').css('display', 'none');
	$('.button').css('display', 'none');

	make_txt()


	waitHandler = setInterval("waitLoading()", 1000)
}

var waitText = ['姓名计算中...', '年份计算中...', '生日计算中...'];
var waitNum = 0;
function waitLoading() {
	if(waitNum == waitText.length) {
		clearInterval(waitHandler);
		waitNum = 0;

		var imgUrl = $('.mypicture').attr('src');

		if(imgUrl == '') {
			//$('.mypicture').attr('src', "assets/tebie"+Math.floor(Math.random()*4+1)+".jpg");
			$('.mypicture').css('display', 'block');
			$('.scan').html('');
			$('.scan').css('display', 'none');

			return;
		}
		else {
			$('.mypicture').css('display', 'block');
			$('.scan').html('');
			$('.scan').css('display', 'none');
			return;
		}
	}

	var content = $('.scan').html();
		content += "<br/><br/>"+waitText[waitNum];;
	$('.scan').html(content);
	waitNum++;
}

function closeFloat() {
	$('.button').css('display', 'block');
	$('.transparent-float').css('display', 'none');
	$('.float').css('display', 'none');
}


//开始-将文字和图片合成到背景图当中//////////

/*
* 向原始背景图上面绘制文字和加图片水印（加二维码）：
*
*	<!--显示图片结果 1/2-->
	<img class="mypicture" id="mypicture"  border="0" src="">
	<!--二维码base64合成辅助区域 2/2-->
	<div class="qr" id="qr" ></div>
*
* 	思路：
* 		1/3：先合成加了文字的图片；
* 		2/3：将加了文字的图片作为背景图（1/3中生成的base64），去加水印图片；
* 		3/3：将目标2/3中生成的base64加入<img />的src里面。
*
* 	使用了promise .then()语法，逐条执行promise()后的函数
*
* */

var qr_base64 = "";
var bg_base64 = "";

function RandomNumBoth(Min,Max){
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}

function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + '年';
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
  D = date.getDate() + '';
  return Y+M+D;
}

// 将文字绘制到背景图上 1/3
function make_txt() {

    run_btn_cal()

    date = (new Date()).valueOf();
    console.log(date);
    console.log(date + RandomNumBoth(10000, 99999));
    date = timestampToTime(date + RandomNumBoth(10000000, 9999999999));
    console.log(date);


	  //生日转星座
    var dateStr = birthday;
    var reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    dateStr.match(reg);
	  var m = RegExp.$2*1;
	  var d = RegExp.$3*1;
    xingzuo = getAstro(m,d);

    //生成图片
    var _num = 1;
    var bg = "";
    if(gender === "女"){ //女
    	_num = Math.ceil(Math.random()*50)
        bg = "./images/nv"+_num+".jpg";
    }else{ //男
    	_num = Math.ceil(Math.random()*50)
    	var bg = "./images/nan"+_num+".jpg";
    }

    if(gender === "女"){ //女

      if(shengao > 149){
        shengao = 160;
        shengao = shengao*1 + Math.ceil(Math.random()*30)
      }

    }else{ //男

      if(shengao > 149){
        shengao = 155;
        shengao = shengao*1 + Math.ceil(Math.random()*25)
      }

    }




    //绘制目标画图区域
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    //生成新图然后加入画图区域
    var img = new Image();
    img.src = bg;
    img.crossOrigin = "anonymous";
    img.onload = function () {

        //初始化模板图，初始化图片尺寸
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        //绘制日期
        ctx.font = "500 40px MaiYa";
        ctx.fillStyle = '#000000';
        ctx.textAlign = "left";
        ctx.fillText(date, 55, 93);

        //绘制名字
        ctx.font = "600 50px ziti";
        ctx.fillStyle = '#000000';
        ctx.textAlign = "left";
        ctx.fillText(name, 360, 100);

        //绘制身高
        ctx.font = "500 35px MaiYa";
        ctx.fillStyle = '#000000';
        ctx.textAlign = "left";
        ctx.fillText(shengao, 224, 173);

        //绘制说明
        ctx.font = "500 24px MaiYa";
        ctx.fillStyle = '#000';
        ctx.textAlign = "left";
        ctx.fillText("识别二维码查看你的有缘人", 120, 655);

        //绘制星座
        ctx.font = "500 35px MaiYa";
        ctx.fillStyle = '#000000';
        ctx.textAlign = "left";
        ctx.fillText(xingzuo, 335, 173);


        //输出该画图区域base64码
        bg_base64 = canvas.toDataURL('image/jpeg');
        //$('.mypicture').attr('src', bg_base64);

		console.log("将文字合成在背景图完毕！");

        make_qr();

    }
}


// 将二维码绘制到背景图上面 2/3
function make_qr() {

    //生成url二维码 <script type="text/javascript" src="assets/js/qrcode.js"></script> https://github.com/davidshimjs/qrcodejs/

    var ip_src = get_user_ip();
    console.log(ip_src);
    var url = "/ip/"+ip_src;

    var defaultContent = "http://qwapi.mukzz.pw/public/?s=/api/jump/jp/p/pyqdyyr"+url; //取当前网址为二维码内容
    var content = document.getElementById("qr");
    var qrcode = new QRCode(content,{
        width:80,
        height:80,
        colorDark : "#000000",
        colorLight : "rgba(255, 255, 255, 0.8)",
		//容错度 L M Q H
        correctLevel : QRCode.CorrectLevel.L

    });
    var value = defaultContent;
    qrcode.makeCode(value);
    console.log("二维码生成完毕！");

    //绘制目标画图区域
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    //生成新图然后加入画图区域
	var bg = bg_base64;
    var img = new Image();
    img.src = bg;



    new Promise(function(resolve, reject) {

        //var img = new Image();
        img.src = bg;
        img.crossOrigin = "anonymous";
        img.onload = function () {

            //初始化模板图，初始化图片尺寸
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            resolve()

        }
    })
	.then(function(){

		return new Promise(function(resolve, reject){
			$(".qr_img").load(function () {
				qr_base64 = $(".qr_img").attr("src");
                console.log("二维码地址取出!");
                $(".qr_img").hide();
                console.log("二维码图片区域隐藏!");
				resolve()
			});

		})


	})
	.then(function(){

		return new Promise(function(resolve, reject){
			var img_qr = new Image();
            img_qr.crossOrigin = "anonymous";
            img_qr.src = qr_base64;
            img_qr.onload = function(){
				ctx.drawImage(img_qr, 475, 585, 110, 110);
				console.log("将二维码加入文字背景图完毕！");
				console.log(img_qr);
				resolve()
			}
		})

	})
	.then(function () {

		//展示结果图 3/3
		var bg_base64 = canvas.toDataURL('image/jpeg'); //最终base64码
		$('.mypicture').attr('src', bg_base64);
		console.log("展示结果图！");
		//console.log(bg_base64);

	})

}

// 根据生日的月份和日期，计算星座。
function getAstro(month,day){
    var s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    var arr=[20,19,21,21,21,22,23,23,23,23,22,22];
    return s.substr(month*2-(day<arr[month-1]?2:0),2);
}

function get_user_ip(){
  var user_ip = returnCitySN["cip"];
  console.log(user_ip);
  return user_ip;
}

//结束-将文字和图片合成到背景图当中////////////
