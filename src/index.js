import Vue from 'vue'

const app = new Vue({
  data() {
    return {
      title: '学生列表',
      info: {
          a: {
            b: 1
          }
      },
      students: [
        {
          id: 1,
          name: '小明',
          age: 12
        },
        {
          id: 1,
          name: '小红',
          age: 12
        }
      ]
    }
  }
})
app.student.push({a: 1})
console.log(app.students);
