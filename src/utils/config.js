
let baseUrl;
console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_MODE)
export const pickerOptionsApi = {
    shortcuts: [
      {
        text: "最近一周",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit("pick", [start, end]);
        }
      },
      {
        text: "最近一个月",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit("pick", [start, end]);
        }
      },
      {
        text: "最近三个月",
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit("pick", [start, end]);
        }
      }
    ]
  };
if(process.env.NODE_ENV  == 'development'){
    baseUrl = 'http://test.future-better.com/qd-admin';
}else if(process.env.VUE_APP_MODE  == 'production'){
    baseUrl = process.env.VUE_APP_API_URl;
}else if(process.env.VUE_APP_MODE  == 'test'){
    baseUrl = process.env.VUE_APP_API_URl;
}
export  { baseUrl };