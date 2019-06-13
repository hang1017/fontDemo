export const request = {
  prefix: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  errorHandler: (error) => {
    // 集中处理错误
    console.log(error);
  },
};