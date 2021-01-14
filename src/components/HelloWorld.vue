<template>
  <div class="hello">
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
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        num: '',
        sex: '男',
        startTime: null,

        data: [
          {
            txt: '我的邻居养了一只鸭子。这位邻居经常在院子里遛这只鸭子。//这位//正在//院子里//散步//的//邻居//非常//热心。//邻居正在做什么？',
            options: ['A: 下蛋', 'B: 散步'],
            answer: 'B',
          }
        ],
      }
    },
    mounted() {
      document.addEventListener('keyup', (e) => {
        if (e.keyCode === 32) {
          if (!this.num) {
            return this.$message.error('请先填写编号。');
          }
          if (this.num) {
            if (/^\d+$/.test(this.num)) {
              this.startTime = moment();
              this.startQuiz();
            } else {
              this.$message.error('只能输入数字！');
            }
          } else {
            const now = moment();
            const diff = now.diff(this.startTime, 'seconds');
            this.startTime = now;
            console.log(diff);
          }
        }
      })
    },
    methods: {
      startQuiz() {
        console.log('get questions');
        console.log('transform questions');

      },
      transform() {
        this.data.forEach((item) => {
          const { txt, options, answer } = item;
          const arr = txt.split('//').map((str) => ({
            str,
            time: '',
          }));

          arr.push({
            options,
            time: '',
          });

          arr.push({
            answer,
          });

          item.nodes = arr;
        });
      },
      fmt() {
        this.num = this.num.replace(/\s/, '');
      },
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
