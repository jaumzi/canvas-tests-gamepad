
export const loadComponent = async (path) => {
  return fetch(path)
    .then(response => {
      return response.text()
    })
    .then(data => {
      document.getElementById('root').innerHTML = data;
    });
}

export const loadJS = (jsFilePath, callback = () => {}) => {
  var js = document.createElement("script");
  js.type = "module";
  js.src = jsFilePath;
  js.onreadystatechange = callback;
  js.onload = callback;
  document.head.appendChild(js);
}

export const showComponent = (componentId) => {
  document.getElementById(componentId).style.display = "block";
}

export const hideComponent = (componentId) => {
  document.getElementById(componentId).style.display = "none";
}