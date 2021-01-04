import App from "./App"

if (module.hot) {
  module.hot.accept(error => {
    if (error) {
      console.log('热更新出问题了')
    }
  })
}