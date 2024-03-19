<template>
  <div class="container">
    <h2>草稿箱</h2>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="pid" label="PID" width="150">
      </el-table-column>
      <el-table-column prop="title" label="文章标题"> </el-table-column>
      <el-table-column prop="tags" label="标签">
        <template slot-scope="scope">
          <template v-for="tag in scope.row.tags">
            <el-tag
              :key="tag.name"
              size="medium"
              style="margin: 0.5em 1em 0.5em 0"
              >{{ tag }}</el-tag
            >
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "Draf",
  data() {
    return {
      tableData: [
        {
          pid: "12987122",
          created_at: "2016-05-02",
          title: "男子被流浪猫绊倒 投喂者赔24万热",
          tags: ["猫", "宠物"],
        },
        {
          pid: "12987123",
          created_at: "2016-05-04",
          title: "许家印被限制高消费热",
          tags: ["消费"],
        },
        {
          pid: "12987125",
          created_at: "2016-05-01",
          title: "春来种下丰产粮",
          tags: ["粮", "种田"],
        },
        {
          pid: "12987126",
          created_at: "2016-05-03",
          title: "北大回应考生与前校长蔡元培同名",
          tags: ["北大", "蔡元培"],
        },
      ],
    };
  },
  methods: {
    handleClick(item) {
      this.$router.push({
        name: "posts/draf/detail",
        params: {
          id: item.pid,
        },
      });
    },
  },
};
</script>
