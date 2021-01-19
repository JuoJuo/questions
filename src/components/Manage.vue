<template>
  <div>
    <h1>Collected Data List</h1>
    <el-table
      border
      :data="dataArr"
      style="width: 100%">
      <el-table-column
        prop="str.num"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="str.sex"
        label="性别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="详情">
        <template slot-scope="scope">
          <div type="success" v-for="item in scope.row.str.data">

            <template v-for="o in item.nodes">
              <el-tag type="success">
                <template v-if="o.userAnswer">
                  用户答案: {{ o.userAnswer }} ----- {{ o.time }} s<br>
                  正确答案: {{ o.answer }}
                </template>
                <template v-else>
                  {{ o.str }} ----- {{ o.time }} s
                </template>
              </el-tag>
              <br>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Manage",
    data(){
      return {
        dataArr: [],
      };
    },
    mounted() {
      fetch('/manageQuestions', {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then(response => response.json())
        .then((data) => {
          (data || []).forEach((item) => {
            item.str = JSON.parse(item.str);
          });

          this.dataArr = data;
        });
    },
    methods: {
      test(data){
        console.log(data)
      }
    },
  }
</script>

<style scoped>

</style>
