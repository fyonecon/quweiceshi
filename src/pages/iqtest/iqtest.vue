<template>
    <div class="iqtest-container">
        <div id="test-question" class="iqtest-container iqtest-question" :style="{display: !end ? '' : 'none'}">
          <div class="title" :style="{display: questionIndex === 0 ? '' : 'none'}">
            <h2>厉害了~我的智商！</h2>
            <p>俗话说：“没事走两步。”你的智商今天有没有欠费呢，做几道简单的题目测试一下吧。</p>

            <button class="start" @click="start">开始测试</button>
          </div>

          <div class="questions" v-for="(que, _index) in questions" v-bind:key="_index"
               :style="{display: questionIndex === que.index ? '': 'none', zIndex: questionIndex === que.index ? 10 : 0}">
            <div class="question">
              <img :src="que.titleImg">
              <h2>{{que.title}}</h2>
              <button class="answer" @click="chose(__index, answer)" v-for="(answer, __index) in que.answers" v-bind:key="__index">
                {{latter[__index].text + answer.text }}
              </button>
            </div>
          </div>
        </div>

        <div id="test-end" class="iqtest-container end" v-if="end">
            <div class="end-title">长按下方图片保存-群发</div>
            <img v-if="resultImg" :src="resultImg">
            <div class="list" v-if="end">
              <list :_list="listDatas"></list>
            </div>
        </div>

    </div>
</template>

<script>

    import {Indicator, Toast} from "mint-ui"
    import DrawImg from '@js/DrawImg.js'
    import {getQueryString, randomWord, setDomin} from '@js/utils'
    import QRCode from 'qrcode'

    import List from '@c/list'
    import DATA from '../web/data/data.js'


    //厉害了~我的智商测试
    export default {
        name: "iqtest",
        data(){
          return {
            questions: iqTestDatas.questions,
            latter: iqTestDatas.latterSort,
            questionIndex: 0,
            end: false,
            resultImg: '',
            listDatas: DATA.limitTypes()
          }
        },
        methods: {
          start(){
            this.questionIndex = 1
          },
          chose(index, {index: questionIndex, score, redirect}){
            if(redirect < 70){
              //选中正确答案
              // 跳到下一题
              this.questionIndex ++
            } else{
              //选中错误答案
              this.end = true
              Indicator.open('生成中...')
              let options = this.questions[this.questionIndex - 1].result.drawOptions
              DrawImg.draw(options, (err, img) => {
                    Indicator.close()
                    this.resultImg = img
              }, this.handleDrawQrcode(options, redirect))
            }
          },
           handleDrawQrcode(drawOptions, redirect){
               return async (that, canvas, ctx, index) => {
                      let qrcodeDrawOptions = drawOptions.queue[index]
                      if(index === 0){
                        let resultImgUrl = `http://quweifiles.mukzz.pw/web/test/3/test/iqtest/${redirect}.png`
                        let img = await that.loadImg(resultImgUrl)
                        ctx.drawImage(img, ... qrcodeDrawOptions.drawParam)
                        return false
                      }
                     if(index === 1){

                       let {autoGenerate, url, drawParam} = qrcodeDrawOptions
                       let link = `http://${setDomin()}/ceshi/index.html#/iqTest`
                       if(autoGenerate){
                         //当前测试的跳转链接
                         //生成当前测试的链接二维码
                         // link 为当前测试的链接二维码
                       } else {
                         //使用datajs中指定的链接来生成二维码画上去
                         link = url || link
                       }
                       let qrcode = await QRCode.toDataURL(link, {margin: 1})
                       let img = await that.loadImg(qrcode)
                       ctx.drawImage(img, ... drawParam)
                       return false
                     }
                     return true
                   }
              }
        },
        components:{
          'list': List
        }
    }
    let iqTestDatas = {
        latterSort: [
          {text: 'A、'},
          {text: 'B、'},
          {text: 'C、'},
          {text: 'D、'},
          {text: 'E、'}
        ],
        questions: [
          {
            index: 1,
            title: '这个字是什么颜色的？',
            titleImg : 'http://quweifiles.mukzz.pw/web/test/3/test/iqtest/1q.png',
            answers: [
              {
                text: '红',
                score: 2,
                redirect: 70,
              },
              {
                text: '黄',
                score: 2,
                redirect: 70,
              },
              {
                text: '蓝',
                score: 3,
                redirect: 2,//第二题
              },
              {
                text: '白',
                score: 2,
                redirect: 70,
              },
            ],
            result: {
              drawOptions: {
                width: 1080,
                height: 1752,
                queue: [
                  {
                    type: 1,
                    url: '',
                    drawParam: [
                      0,0, 1080, 1752
                    ]
                  },
                  {
                    type: 1,
                    autoGenerate: true,//指定测试结果画的二维码是否取当前测试id生成还是直接指定一个二维码链接画
                    url: '',
                    drawParam: [
                      450, 1238, 150, 150
                    ]
                  }
                ]
              }
            }
          },
          {
            index: 2,//第二题
            title: '你看到了什么？',
            titleImg : 'http://quweifiles.mukzz.pw/web/test/3/test/iqtest/2q.png',
            answers: [
              {
                text: '黄',
                score: 3,
                redirect: 3,//第三题
              },
              {
                text: '绿',
                score: 2,
                redirect: 80,
              },
              {
                text: '白',
                score: 3,
                redirect: 80,
              },
              {
                text: '蓝',
                score: 2,
                redirect: 80,
              },
            ],
            result: {
              drawOptions: {
                width: 1080,
                height: 1752,
                queue: [
                  {
                    type: 1,
                    url: '',
                    drawParam: [
                      0,0, 1080, 1752
                    ]
                  },
                  {
                    type: 1,
                    autoGenerate: true,//指定测试结果画的二维码是否取当前测试id生成还是直接指定一个二维码链接画
                    url: '',
                    drawParam: [
                      450, 1238, 150, 150
                    ]
                  }
                ]
              }
            }
          },
          {
            index: 3,//第三题
            title: '“？”该填的数字是？',
            titleImg : 'http://quweifiles.mukzz.pw/web/test/3/test/iqtest/3q.png',
            answers: [
              {
                text: '7',
                score: 3,
                redirect: 4//第四题
              },
              {
                text: '8',
                score: 2,
                redirect: 90
              },
              {
                text: '9',
                score: 2,
                redirect: 90
              }
            ],
            result: {
              drawOptions: {
                width: 1080,
                height: 1752,
                queue: [
                  {
                    type: 1,
                    url: '',
                    drawParam: [
                      0,0, 1080, 1752
                    ]
                  },
                  {
                    type: 1,
                    autoGenerate: true,//指定测试结果画的二维码是否取当前测试id生成还是直接指定一个二维码链接画
                    url: '',
                    drawParam: [
                      450, 1238, 150, 150
                    ]
                  }
                ]
              }
            }
          },
          {
            index: 4,
            title: '图中面积最大的颜色是？',
            titleImg : 'http://quweifiles.mukzz.pw/web/test/3/test/iqtest/4q.png',
            answers: [
              {
                text: '红',
                score: 2,
                redirect: 100
              },
              {
                text: '黄',
                score: 2,
                redirect: 100
              },
              {
                text: '蓝',
                score: 2,
                redirect: 100
              },
              {
                text: '白',
                score: 3,
                redirect: 5//第五题
              }
            ],
            result: {
              drawOptions: {
                width: 1080,
                height: 1752,
                queue: [
                  {
                    type: 1,
                    url: '',
                    drawParam: [
                      0,0, 1080, 1752
                    ]
                  },
                  {
                    type: 1,
                    autoGenerate: true,//指定测试结果画的二维码是否取当前测试id生成还是直接指定一个二维码链接画
                    url: '',
                    drawParam: [
                      450, 1238, 150, 150
                    ]
                  }
                ]
              }
            }
          },
          {
            index: 5,
            title: '男女朋友喝一杯奶茶，男喝5分之4，女喝5分之1，男生比女生多花6元，请问奶茶多少钱？ ',
            titleImg : 'http://quweifiles.mukzz.pw/web/test/3/test/iqtest/5q.png',
            answers: [
              {
                text: 10,
                score: 2,
                redirect: 110,
              },
              {
                text: 12,
                score: 2,
                redirect: 110,
              },
              {
                text: 6,
                score: 3,
                redirect: 6,//第二题
              },
              {
                text: 8,
                score: 2,
                redirect: 110,
              },
            ],
            result: {
              drawOptions: {
                width: 1080,
                height: 1752,
                queue: [
                  {
                    type: 1,
                    url: '',
                    drawParam: [
                      0,0, 1080, 1752
                    ]
                  },
                  {
                    type: 1,
                    autoGenerate: true,//指定测试结果画的二维码是否取当前测试id生成还是直接指定一个二维码链接画
                    url: '',
                    drawParam: [
                      450, 1238, 150, 150
                    ]
                  }
                ]
              }
            }
          },
          {
            index: 6,
            title: '路边只有一辆共享单车，那么罗志祥和潘玮柏谁可以骑？',
            titleImg : 'http://quweifiles.mukzz.pw/web/test/3/test/iqtest/6q.png',
            answers: [
              {
                text: '罗志祥',
                score: 3,
                redirect: 120,
              },
              {
                text: '潘玮柏',
                score: 2,
                redirect: 130,
              }
            ],
            result: {
              drawOptions: {
                width: 1080,
                height: 1752,
                queue: [
                  {
                    type: 1,
                    url: '',
                    drawParam: [
                      0,0, 1080, 1752
                    ]
                  },
                  {
                    type: 1,
                    autoGenerate: true,//指定测试结果画的二维码是否取当前测试id生成还是直接指定一个二维码链接画
                    url: '',
                    drawParam: [
                      450, 1238, 150, 150
                    ]
                  }
                ]
              }
            }
          }
        ]
    }

</script>

<style scoped>
  .iqtest-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .iqtest-question {
    background-image: url("http://quweifiles.mukzz.pw/web/test/3/test/iqtest/bg.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .title {
    position: absolute;
    height: 700px;
    width: 100%;
    /*border: 1px solid red;*/
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    box-sizing: border-box;
  }
  .title h2 {
    /*margin-top: 46px;*/
    height: 182px;
    line-height: 182px;
    text-align: center;
    color: #774f2f;
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 46px;
  }
  .title p {
    height: 350px;
    box-sizing: border-box;
    padding: 0 80px;
    font-size: 32px;
    color: #774f2f;
    line-height: 60px;
  }
  .start {
    background-color: #774f2f;
    font-size: 32px;
    height: 80px;
    line-height: 80px;
    width: 630px;
    text-align: center;
    border: none;
    color: #fff;
    border-radius: 8px;
  }

  .questions, .question {
    width: 100%;
    /*height: 100%;*/
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
  }

  .question img {
    margin-top: 80px;
    margin-bottom: 50px;
    width: 100%;
  }
  .question h2 {
    height: 180px;
    width: 100%;
    text-align: center;
    color: #774f2f;
    box-sizing: border-box;
    padding: 0 80px;
    line-height: 46px;
    font-size: 35px;
    font-weight: bold;
  }

  .answer {
    background-color: #774f2f;
    height: 70px;
    line-height: 70px;
    width: 600px;
    /*width: 80%;*/
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    border: none;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .end img {
    width: 100%;
    height: 100%;
  }
  .end-title {
    width: 100%;
    height: 80px;
    min-height: 80px;
    max-height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #83D8AD;
    color: #fff;
  }

  .list {
      margin-bottom: 100px;
  }
</style>
