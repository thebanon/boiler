window.m = {};

window.onload = () => {

  /*Elements*/
  window.dom = {
    doc: document,
    body: document.body,
    file: document.getElementById('file'),
    main: document.body.querySelector("main")
  };

  /*Routing*/
  window.rout.ing = (GOT, n, m = GOT[n], root = GOT[0]) => {
    return (
      (root === "build" && GOT[1] == "er" && n === 2)
    )
  };

  /*Events*/
  dom.doc.onclick = (event) => on.touch.tap(event);
  byId('file').onchange = (event) => on.change.file(event);

  /*Database*/
  window.app = localStorage.app ? JSON.parse(localStorage.app) : null;
  window.db.name = 'database';
  window.db.schema = {
    app: {
      "keyPath": ["uid"],
      "indices": {
        "domain": { unique: true },
        "name": { unique: false }
      }
    },
    pages: {
      "keyPath": ["uid"],
      "indices": { 
        "path": { unique: false }
      }
    },
    posts: {
      "keyPath": ["uid"],
      "indices": {
        "html": { unique: false },
        "path": { unique: false }
      }
    },
    media: {
      "keyPath": ["uid"],
      "indices": {
        "app": { unique: false },
        "uid": { unique: true }
      }
    }
  };
  window.db.open(window.db.name,1,window.db.schema).then(e => init());

};

function init(path) {
  dom.body.dataset.load = "ed";
  dom.body.dataset.protocol = window.location.protocol;
  if(path) {
    path.router();
  } else {
    if(window.location.protocol === "file:") {
      if(window.location.hash) {
        window.location.hash.split('#')[1].router();
      } else {
        byId('boot').dataset.href.router();
      }
    } else {
      window.location.pathname.router();
    }
  }
}
