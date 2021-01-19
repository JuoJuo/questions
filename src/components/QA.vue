<template>
  <div class="qa" id="ui">
    <div>
      <template v-if="isStartQuiz">
        <template v-if="data[i].nodes[j].options">
          <template v-for="txt in data[i].nodes[j].options">
            <el-radio
              class="com-font"
              v-model="data[i].nodes[j].userAnswer"
              :label="txt"
              :key="txt">
              {{ txt }}
            </el-radio>
          </template>
        </template>

        <template v-if="i === 0">
          <h3 class="titleer">练习部分</h3>
        </template>

        <template v-if="i === 2 && j === data[i].nodes.length - 1">
          <el-button type="primary" @click="handlePrac">正式答题</el-button>
          <el-button type="primary" @click="handlePrac">再练一次</el-button>
        </template>

        <template v-if="data[i].nodes[j].str">
          <h1 class="titleer">{{ data[i].nodes[j].str }}</h1>
        </template>
      </template>

      <template v-else>
        <h1>请填写您的编号，选择您的性别，按空格键进入答题。</h1>
        <el-row justify="center" class="row-bg">
          <el-col :span="6" :push="9">
            <el-input v-model="num" placeholder="请输入编号" @input="fmt"></el-input>
          </el-col>
        </el-row>
        <el-row justify="center" class="row-bg">
          <el-col :span="6" :push="9">
            <el-radio v-model="sex" label="男">男</el-radio>
            <el-radio v-model="sex" label="女">女</el-radio>
          </el-col>
        </el-row>
        <el-row justify="center" class="row-bg">
          <el-col :span="6" :push="9">
            <el-button type="primary" @click="handlePrac">进入练习</el-button>
          </el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    data() {
      return {
        num: '',
        sex: '',
        startTime: null,
        data: [],
        i: 0,
        j: 0,
        isStartQuiz: false,
        isRealStartQuiz: false,
      }
    },
    mounted() {
      document.addEventListener('keyup', (e) => {
        if (e.keyCode === 32) {
          //编号输入的情况
          // 问答开始了
          if (this.isStartQuiz) {
            if (!this.isRealStartQuiz && this.i > 2 && this.j ===
              this.data[i].nodes[j].length - 1) {

            }
            if (this.data[this.i].nodes.length - 1 === this.j) {
              if (!this.data[this.i].nodes[this.j].userAnswer) {
                return this.$message.error('必须作答！');
              }
            }

            const now = moment();
            const diff = now.diff(this.startTime, 'seconds');
            this.startTime = now;
            this.data[this.i].nodes[this.j].time = diff;

            if (this.j !== this.data[this.i].nodes.length - 1) {
              this.j += 1;
            } else {

              this.j = 0;

              if (this.i !== this.data.length - 1) {
                this.i += 1;
              } else {
                console.log('game over~~~~~~~');
                this.sendAns();
                this.open();
              }
            }

          } else {
            console.log('没有点击进入练习');
          }
        }
      });
      fetch('/questions', {
        method: 'GET',
        // body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then((data) => {
        this.data = data;
      });
    },
    methods: {
      handlePrac() {
        if (!this.num) {
          return this.$message.error('请先填写编号。');
        }

        if (!this.sex) {
          return this.$message.error('请选择性别。');
        }

        this.startQuiz();
      },
      sendAns() {
        fetch('/answers', {
          method: 'POST',
          body: JSON.stringify({ data: this.data, num: this.num, sex: this.sex }),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
          .then(response => response.json())
          .then((data) => {
            console.log('send done~');
          });
      },
      startQuiz() {
        console.log('get questions');
        console.log('transform questions');
        this.transform();
        this.isStartQuiz = true;
        this.startTime = moment();
        console.log('show text');
      },
      transform() {
        this.data = this.data.map((item) => {
          const {txt, options, answer} = item;
          const arr = txt.split('//').map((str) => ({
            str,
            time: '',
          }));

          arr.push({
            options,
            answer,
            time: '',
            userAnswer: '',
          });

          return {
            ...item,
            nodes: arr,
          };
        });
      },
      fmt() {
        this.num = this.num.replace(/\s/, '');
      },
      open() {
        this.$alert('问卷已结束，感谢参加.', '完成', {
          confirmButtonText: '确定',
          callback: action => {
          },
        });
      }
    }
  }
</script>

<style>
  .titleer {
    margin-bottom: 16%;
  }
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .row-bg {
    padding: 10px 0;
  }

  .qa {
    display: flex;
    justify-content: center;
    height: calc(100vh);
  }

  #ui .el-radio__label {
    font-size: 32px;
    font-weight: 700;
  }
</style>
