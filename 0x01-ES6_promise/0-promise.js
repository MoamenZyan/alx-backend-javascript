#!/usr/bin/node

function getResponseFromAPI() {
  return new Promise((resolve, reject) => {
    try {
      resolve('resolved !');
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { getResponseFromAPI };
