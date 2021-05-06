import React from 'react'
import ReactDOM from 'react-dom'
import Application from './Application'

const setTitle = (title: string, webtitle?: string) => {
  ReactDOM.render(<>{ title }</>, document.querySelector('.web-title'))
  ReactDOM.render(<>{ `${webtitle ?? title} | 岛风的博客` }</>, document.querySelector('title'))
}

console.log('Application running')
// Service Worker
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js',).then(registration => {
    console.log('ServiceWorker registered: ', registration)
  }).catch(registrationError => {
    console.log('ServiceWorker registration failed: ', registrationError)
  })
}

ReactDOM.render(<Application />, document.querySelector('main'))