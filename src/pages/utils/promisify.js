export default function promisify(f) {
  return function (...args) {
    // return a wrapper-function (*)
    return new Promise((resolve) => {
      args.push(resolve); // append our custom callback to the end of f arguments
      console.log(f);
      // f(...args);
      // f.call(this, ...args); // call the original function
    });
  };
}
