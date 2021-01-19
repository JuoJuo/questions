<template>
  <div class="hello">
    <h1 v-if="isStartQuiz">
      <template v-if="data[i].nodes[j].options">
        <template v-for="txt in data[i].nodes[j].options">
          <el-radio v-model="data[i].nodes[j].userAnswer" :label="txt"
                    :key="txt">
            {{ txt }}
          </el-radio>
        </template>
      </template>

      <template v-else>
        {{ data[i].nodes[j].str }}
      </template>
    </h1>

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
    </template>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        num: '',
        sex: '',
        startTime: null,
        data: [],
        i: 0,
        j: 0,
        isStartQuiz: false,
      }
    },
    mounted() {
      document.addEventListener('keyup', (e) => {
        if (e.keyCode === 32) {
          if (!this.num) {
            return this.$message.error('请先填写编号。');
          }

          if (!this.sex) {
            return this.$message.error('请选择性别。');
          }

          //编号输入的情况
          if (this.num) {
            // 编号输入合法
            if (/^\d+$/.test(this.num)) {
              // 问答开始了
              if (this.isStartQuiz) {
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
                // 开始问答
                this.startQuiz();
              }
            } else {
              // 编号输入不合法
              this.$message.error('只能输入数字！');
            }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
