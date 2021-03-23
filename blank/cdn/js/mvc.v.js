window.mvc ? null : window.mvc = { };
window.mvc.v ? null : window.mvc.v = (path) => {
  var state = rout.e(path);
  var get = state.GOT;
  var root = get[0];
  return new Promise(async function (resolve, reject) {
    window.audio ? window.audio.destroy() : null;
    if(root) {
      if(root === "about") {
        resolve(state);
      }
      if(root === "build") {
        if(get.length > 1) {

          if(get[1] === "er"){
            if(get.length > 2) {
              var project = app = get[2];
              //walkThrough(project);
              if(get.length > 3) {
                if(get[3] === "editor") {
                  var vp = byId('span-build-er-app-editor');
                  if(vp) {
                    vp.innerHTML = "";
                    var json = await db.read.table('pages',{app:get[2]})
                    if(json.length > 0) {
                      var j = 0; do {
                        var js = json[j];
                        var page = byId('html-page').content.firstElementChild.cloneNode(true);
                        var path = `/build/er/`+project+`/editor`+js.path;
                        page.firstElementChild.dataset.page = rout.e(path).page;
                        page.firstElementChild.dataset.path = path;
                        vp.insertAdjacentHTML('beforeend',page.innerHTML);
                      j++; } while(j < json.length);
                    }
                  }

                  if(get.length > 4) {

                  } else {
                    var page = byId('page-build-er-index');
                    page.dataset.path = state.path;
                  }

                  var href = state.path.split('/build/er/'+get[2]+'/editor')[1];
                  var page = dom.body.find('page[data-path="'+state.path+'"]');
                  page.innerHTML = byId('empty-page').innerHTML;
                  var json = await db.read.table('block',{path:state.path});
                  if(json.length > 0) {
                    var j = 0; do {
                      var block = json[j];
                      var html = block.html;
                      var path = block.path;
                      var uid = block.uid;
                      var page = dom.body.find('[data-path="'+path+'"]');
                      if(page) {
                        var blocks = page.find('blocks');
                        if(blocks) {
                          blocks.lastElementChild.insertAdjacentHTML('beforebegin',html);
                        }
                      }
                      //console.log(j,page,{html,path,uid},json.length);
                    j++; } while(j < json.length);
                  }

                  resolve(state);
                }
                else if(get[3] === "media") { //console.log("route.media",{project});
                  if(get.length > 4) {
                    //byId('file').remove();
                    //byId('body').insertAdjacentHTML('beforeend',`<input class="file" id="file" type="file">`);
                    //byId('file').onchange = (event) => on.change.file(event);
                    if(get.length > 5) {
                      if(["audio","photo","video","pages","merch"].includes(get[4])) {

                        var uid = get[5];
                        var json = await db.read.row('media',{uid}); //console.log({json});
                        var vp = byId('page-media-'+get[4]+'-id');
                        //vp.find('.tags').innerHTML = vp.find('.tags').firstElementChild.outerHTML;

                        if(get[4] == "audio") {
                          var html = ``;
                          if(json.images[0].includes("soundcloud")) {

                          }
                          else {
                            var container = viewport().find('.audio .player');
                            var audio = dataURItoBlob(json.files[0]); console.log({audio});
                            window.audio ? window.audio.destroy() : null;
                            window.audio = WaveSurfer.create({container, cursorColor: '#777', height: container.clientHeight, progressColor: '#000', responsive: true, waveColor: '#bbb'});
                            window.audio.loadBlob(audio);
                            //window.audio.on('ready',() => window.audio.play());

                            vp.find('.tags').innerHTML = vp.find('.tags').firstElementChild.outerHTML+tags(json.tags);
                            vp.find('.cover picture').innerHTML = `<img src="`+json.images[0]+`">`;
                            vp.find('.title').textContent = json.title;
                            vp.find('.description .textarea').textContent = json.description;
                            json.tags ? vp.find('.tags').innerHTML = vp.find('.tags').firstElementChild.outerHTML+tags(json.tags) : null;
                          }
                          resolve(state);
                        }
                        if(get[4] == "photo") {
                          var vp = byId('page-media-photo-id'); //alert(vp.dataset.page);
                          console.log({json});
                          vp.find('.photo img').src = json.images[0];
                          vp.find('.title').textContent = json.title;
                          vp.find('.caption').textContent = json.description;
                          vp.find('.tags').innerHTML = vp.find('.tags').firstElementChild.outerHTML+tags(json.tags);

                          //vp.find('#photo-promo-app').textContent = generateName();
                          //vp.find('#photo-promo-app-domain').textContent = '@'+editor.create.uid(11);
                          resolve(state);
                        }
                        if(get[4] == "video") {
                          var id = get[5];
                          var img = json.files[0];
                          var html = ``;

                          vp.find('.video').innerHTML = "";

                          if(img.includes('youtube')) {
                            var uid = img.split('img.youtube.com/vi/')[1].split('/')[0];
                            if(uid != null) {
                               console.log("video id = ",uid[1]);
                            } else {
                               console.log("The youtube url is not valid.");
                            }
                            html += `<iframe src="https://www.youtube.com/embed/`+uid+`"></iframe>`;
                            console.log({file,uid,img});
                          }
                          else if(img.includes('data:')) {console.log({vp,json},vp.find('.video'));
                            vp.find('.video').innerHTML = "<video></video>";
                            vp.find('.video video').src = json.files[0];
                          }

                          vp.find('#video-promo-app').textContent = generateName();
                          vp.find('#video-promo-app-domain').textContent = '@'+editor.create.uid(11);

                          vp.find('.title').innerHTML = "";
                          vp.find('.title').innerHTML = json.title;
                          vp.find('.title').contentEditable = true;

                          vp.find('.description').firstElementChild.textContent = "";
                          vp.find('.description').firstElementChild.textContent = json.description;

                          vp.find('.tags').innerHTML = vp.find('.tags').firstElementChild.outerHTML+tags(json.tags);

                          resolve(state);
                        }
                        if(get[4] == "merch") {
                          var id = get[5]; //alert(id);
                          var vp = rout.er(); //alert(vp.dataset.page);
                          var img = json.images[0];
                          //console.log({vp,json});

                          vp.find('.photo img').src = img;
                          var i = 1; do {
                            vp.all('.thumbnails picture')[i-1].innerHTML = '<img src="'+json.images[i]+'">';
                          i++ } while(i < json.images.length);

                          vp.find('.tags').innerHTML = vp.find('.tags').firstElementChild.outerHTML+tags(json.tags);              
                          
                          vp.find(".title") ? vp.find(".title").textContent = json.title : null;

                          priceHandler(vp.all('.pricing .amount'),json.pricing);

                      var variants = [];
                      var va = json.variations;
                      if(va && Object.keys(va).length > 0) {
                        var elem = vp.find('.variants > :last-child'); 
                        vp.find('.variants').innerHTML = elem.outerHTML; 
                        var v = 0; do {
                          var detail = Object.values(va)[v]; //console.log(Object.values(va)[v]);
                          if(detail) {
                              var clone = elem.cloneNode(true); //console.log({elem,clone},);
                              clone.find('.name [contenteditable]').textContent = Object.keys(json.variations)[v];
                              clone.find('.value [contenteditable]').textContent = Object.values(json.variations)[v];
                              clone.classList.add('submitted');
                              vp.find('.variants > :last-child').insertAdjacentHTML('beforebegin',clone.outerHTML);
                          }
                        v++; } while(v < Object.keys(va).length);
                        //json.details = details;
                      }

                      var details = [];
                      var li = json.details;
                      if(li && li.length > 0) {
                        var elem = vp.find('.details ul > :last-child');      
                        var clone = elem.cloneNode(true);
                        vp.find('.details ul').innerHTML = elem.outerHTML; 
                        var d = 0; do {
                          var detail = li[d]; 
                          if(detail) {                       
                              clone.textContent = json.details[d]
                              vp.find('.details ul > :last-child').insertAdjacentHTML('beforebegin',clone.outerHTML);
                          }
                        d++; } while(d < li.length);
                        json.details = details;
                      }

                      var variants = [];
                      var va = json.features;
                      if(va && Object.keys(va).length > 0) {
                        var elem = vp.find('.features > :last-child');   
                        vp.find('.features').innerHTML = elem.outerHTML;
                        var v = 0; do {
                          var detail = Object.values(va)[v]; //console.log(Object.values(va)[v]);   
                          if(detail) {                        
                              var clone = elem.cloneNode(true); //console.log({elem,clone},);
                              clone.classList.add('submitted');
                              clone.find('.name [contenteditable]').textContent = Object.keys(json.features)[v];
                              clone.find('.value [contenteditable]').textContent = Object.values(json.features)[v];
                              vp.find('.features > :last-child').insertAdjacentHTML('beforebegin',clone.outerHTML);
                          }
                          elem.find('.name [contenteditable]').textContent = ``;
                          elem.find('.value [contenteditable]').textContent = ``;
                        v++; } while(v < Object.keys(va).length);
                        //json.details = details;
                      }
                           vp.find('.wysiwyg .ql-editor') ? vp.find('.wysiwyg .ql-editor').innerHTML = "" : null;
                           vp.find('.wysiwyg .ql-toolbar') ? vp.find('.wysiwyg .ql-editor').innerHTML = json.description : new Quill(vp.find('.wysiwyg .editor'), {
                              modules: {
                                toolbar: [
                                  ['bold', 'italic', 'underline'],
                                  ['image', 'code-block']
                                ]
                              },
                            placeholder: "Write a detailed description",
                            theme: "snow"
                           }).container.firstChild.innerHTML = json.description;

                          resolve(state);
                        }
                        if(get[4] == "pages") {
                           var container = vp.find('.wysiwyg');
                           container.innerHTML = json.files[0].split("data:text/html;charset=UTF-8,")[1];
                           var wys = new Quill(container, {
                            placeholder: "Write a detailed description",
                            theme: "bubble"
                           });

                          var id = get[5];
                          var vp = byId('page-media-pages-id'); //alert(vp.dataset.page);
                          var file = byId('files').content.querySelectorAll("[data-id='"+id+"']")[0];
                          //vp.find('picture').innerHTML = file.find('img').outerHTML;
                          vp.find('picture').innerHTML = `<img src="`+json.images[0]+`">`;
                          vp.find('.title') ? vp.find('.title').textContent = json.title : null;
                          vp.find('.description') ? vp.find('.description').textContent = json.description : null;
                          resolve(state);
                        }
                      }
                      else {
                        resolve(state);
                      }
                    }
                    else {
                       if(["audio","photo","video","pages","merch"].includes(get[4])) {
                         var vp = viewport();
                         vp.find('.title').textContent = ``;
                         vp.find('.tags').innerHTML = vp.find('.tags').firstElementChild.outerHTML;

                         if(get[4] == "audio") {
                           resolve(state);
                         }
                         if(get[4] == "photo") {
                           vp.find('.photo img').removeAttribute('src');
                           vp.find('.tags').innerHTML = vp.find('.tags').firstElementChild.outerHTML;
                           //vp.find('.description').textContent = ``;
                           resolve(state);
                         }
                         if(get[4] == "video") {
                           var id = get[2];
                           vp.find('.video').innerHTML = "";
                           vp.find('.description').firstElementChild.innerHTML = "";
                           resolve(state);
                         }
                         if(get[4] == "merch") {
                           vp.find('img').removeAttribute('src');

                              vp.find("#dollar").onkeydown = (e) => {
                                var allowed = [8, 37, 39].includes(e.keyCode);
                                if (!allowed && e.target.value.length === e.target.maxLength) {
                                  e.preventDefault();
                                }
                                if (e.key === ".") {
                                  e.preventDefault();
                                  e.target.nextElementSibling.focus();
                                }
                              };
                              vp.find("#dollar").onkeyup = (e) => {
                                var w = byId("cents").clientWidth * e.target.value.length;
                                e.target.style.width = w + "px";
                              };
                              vp.find("#cents").onkeydown = (e) => {
                                var allowed = [8, 37, 39].includes(e.keyCode);
                                if (!allowed && e.target.value.length === e.target.maxLength) {
                                  e.preventDefault();
                                }
                              };

                           var wys = new Quill(vp.find('.wysiwyg .editor'), {
                              modules: {
                                toolbar: [
                                  ['bold', 'italic', 'underline'],
                                  ['image', 'code-block']
                                ]
                              },
                            placeholder: "Write a detailed description",
                            theme: "snow"
                           });
                           
                           resolve(state);
                         }
                         if(get[4] == "pages") {
                           var container = vp.find('.wysiwyg');
                           var wys = new Quill(container, {
                            placeholder: atob("TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gTW9yYmkgZWdldCB0ZW1wb3IgbmliaC4gSW4gbm9uIHB1bHZpbmFyIHRlbGx1cy4gTnVsbGFtIHBoYXJldHJhIGZldWdpYXQgbmlzbCBpZCBsb2JvcnRpcy4gTWF1cmlzIG1vbGxpcyBsYWN1cyBxdWlzIGVzdCBzb2RhbGVzIHNjZWxlcmlzcXVlLiBTZWQgYSBkYXBpYnVzIGxvcmVtLiBQZWxsZW50ZXNxdWUgaGFiaXRhbnQgbW9yYmkgdHJpc3RpcXVlIHNlbmVjdHVzIGV0IG5ldHVzIGV0IG1hbGVzdWFkYSBmYW1lcyBhYyB0dXJwaXMgZWdlc3Rhcy4gTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gQWVuZWFuIHBlbGxlbnRlc3F1ZSBuaXNsIG1vbGVzdGllIHNlbSBjdXJzdXMgZXVpc21vZC4gVmVzdGlidWx1bSBkaWduaXNzaW0gbGFjdXMgZXJhdCwgZXUgY29tbW9kbyBtYWduYSBwbGFjZXJhdCBlZ2V0LiBFdGlhbSBhdCBoZW5kcmVyaXQgbGVjdHVzLCBuZWMgYWNjdW1zYW4gZW5pbS4gVmVzdGlidWx1bSBzZW0gc2FwaWVuLCB1bHRyaWNpZXMgdmVsIHN1c2NpcGl0IHNlZCwgcG9ydHRpdG9yIHF1aXMgZmVsaXMuIFZlc3RpYnVsdW0gaGVuZHJlcml0IHJpc3VzIHF1aXMgYW50ZSBpYWN1bGlzLCBzZWQgcnV0cnVtIGVsaXQgcnV0cnVtLgoKUGVsbGVudGVzcXVlIG5vbiBjb25zZXF1YXQgbGFjdXMuIE51bGxhIGltcGVyZGlldCBwb3J0dGl0b3IgbGVjdHVzIHZpdGFlIHNlbXBlci4gRXRpYW0gYWxpcXVldCBzYXBpZW4gZXQgdHJpc3RpcXVlIGludGVyZHVtLiBEb25lYyB0ZW1wb3IgdmVsaXQgaWQgc29kYWxlcyBwb3N1ZXJlLiBJbiBldCBkb2xvciBwcmV0aXVtLCBkaWN0dW0gbGFjdXMgc2VkLCBtb2xlc3RpZSBtaS4gRG9uZWMgY29udmFsbGlzIHZlc3RpYnVsdW0gZW5pbS4gVmVzdGlidWx1bSB2aXRhZSBlbmltIGVzdC4gTnVsbGFtIHV0IHRlbGx1cyBub24gYXJjdSBwbGFjZXJhdCBhbGlxdWV0IHF1aXMgZXUgYW50ZS4gTnVsbGFtIHF1aXMgdWx0cmljZXMgbGlndWxhLCB2ZWwgY29uZGltZW50dW0gYXVndWUuIEludGVnZXIgdmVsIGNvbnZhbGxpcyBsZWN0dXMuIFNlZCBub24gdmVuZW5hdGlzIG9yY2ksIGV1IGV1aXNtb2QgcHVydXMuIEN1cmFiaXR1ciBlZmZpY2l0dXIsIGxvcmVtIGF0IGltcGVyZGlldCB0ZW1wdXMsIHB1cnVzIHJpc3VzIHRpbmNpZHVudCBtYXNzYSwgYXQgYWxpcXVhbSBzYXBpZW4gdmVsaXQgZWdldCBkdWkuIFBlbGxlbnRlc3F1ZSBmaW5pYnVzIHRlbGx1cyBuaXNsLCB0aW5jaWR1bnQgc2NlbGVyaXNxdWUgbmlzbCBhdWN0b3IgZWZmaWNpdHVyLiBEdWlzIHJ1dHJ1bSBlbmltIGlkIG1hdXJpcyBydXRydW0sIHNpdCBhbWV0IGJpYmVuZHVtIGxpYmVybyB2dWxwdXRhdGUuIFByb2luIG5lYyB0cmlzdGlxdWUgZXJhdC4KCkRvbmVjIGhlbmRyZXJpdCwgZHVpIGF0IHBvc3VlcmUgbG9ib3J0aXMsIG5pYmggZHVpIGRpZ25pc3NpbSBtZXR1cywgYWMgdWx0cmljaWVzIG9yY2kgbmlzaSBxdWlzIGVyb3MuIEV0aWFtIGZhdWNpYnVzIHNlbSBpbiBjb25zZXF1YXQgaW50ZXJkdW0uIENyYXMgZWZmaWNpdHVyIG51bmMgdG9ydG9yLCB2ZWwgZWxlbWVudHVtIHVybmEgcHVsdmluYXIgZXQuIE5hbSBlc3QgbGVvLCBoZW5kcmVyaXQgYWMgZXggcmhvbmN1cywgbHVjdHVzIGVnZXN0YXMgbmVxdWUuIE1hZWNlbmFzIHBvc3VlcmUgZHVpIGFjIHVybmEgZGlnbmlzc2ltIG9ybmFyZS4gUGVsbGVudGVzcXVlIGJpYmVuZHVtIG5pc2kgdXQgaGVuZHJlcml0IHRlbXB1cy4gTWF1cmlzIHNhZ2l0dGlzIHBoYXJldHJhIGRvbG9yLCBxdWlzIHZlc3RpYnVsdW0gZXJhdCBtYWxlc3VhZGEgc2VkLiBNb3JiaSBpbXBlcmRpZXQsIG51bmMgZXUgc29sbGljaXR1ZGluIGNvbnNlcXVhdCwgZXggcXVhbSBtYWxlc3VhZGEgZmVsaXMsIGluIGNvbmRpbWVudHVtIGFudGUgbWFnbmEgYWMgZG9sb3IuIE51bGxhIGZhY2lsaXNpLiBNYWVjZW5hcyBoZW5kcmVyaXQgc2FnaXR0aXMgb2RpbywgZXQgdWxsYW1jb3JwZXIgZXN0IGhlbmRyZXJpdCBldC4gQ3JhcyBkYXBpYnVzIGRhcGlidXMgdml2ZXJyYS4gSW50ZWdlciBsaWd1bGEgbmVxdWUsIHJob25jdXMgdHJpc3RpcXVlIGZlcm1lbnR1bSBub24sIHBvcnRhIGVnZXQgcXVhbS4KCkZ1c2NlIGV1IHVsbGFtY29ycGVyIGlwc3VtLCBldSB0aW5jaWR1bnQgZXJhdC4gUGhhc2VsbHVzIHZ1bHB1dGF0ZSwgdXJuYSBlZ2V0IG1hdHRpcyBpbnRlcmR1bSwgcHVydXMgZG9sb3IgcHJldGl1bSBlcm9zLCBzaXQgYW1ldCB0cmlzdGlxdWUganVzdG8gZW5pbSBpZCBtaS4gRHVpcyBldWlzbW9kIGxhY2luaWEgbnVsbGEsIGlkIGRhcGlidXMganVzdG8gc3VzY2lwaXQgcGxhY2VyYXQuIEFlbmVhbiBub24gbWF4aW11cyBvZGlvLiBJbnRlZ2VyIGV4IG9kaW8sIG1hdHRpcyBldWlzbW9kIHRvcnRvciBxdWlzLCBwb3N1ZXJlIG1vbGVzdGllIG5pYmguIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIEludGVnZXIgYmxhbmRpdCB2ZXN0aWJ1bHVtIGNvbW1vZG8uIER1aXMgaWQgYmliZW5kdW0gZHVpLCBhIGhlbmRyZXJpdCBuZXF1ZS4gU2VkIG5lYyBvcm5hcmUgbWFzc2EsIHZpdmVycmEgZWdlc3RhcyBlbmltLiBJbiB0dXJwaXMgbWV0dXMsIGZhdWNpYnVzIGF0IGxlbyBlZ2V0LCBjdXJzdXMgdWx0cmljZXMgc2VtLiBEdWlzIHRyaXN0aXF1ZSBhdWN0b3IgY29uc2VjdGV0dXIuIEludGVnZXIgZXUgZ3JhdmlkYSBsZWN0dXMuIFZpdmFtdXMgaW50ZXJkdW0gc2VkIHF1YW0gZXQgc29sbGljaXR1ZGluLgoKUGhhc2VsbHVzIGltcGVyZGlldCwganVzdG8gaWQgcnV0cnVtIGNvbW1vZG8sIHJpc3VzIGp1c3RvIGltcGVyZGlldCBtaSwgdXQgdmVzdGlidWx1bSBvZGlvIG9yY2kgbmVjIGxlby4gUXVpc3F1ZSBpZCBzYWdpdHRpcyBvZGlvLiBNYXVyaXMgbm9uIHR1cnBpcyB1dCBudWxsYSB0ZW1wdXMgcGxhY2VyYXQgYWMgcXVpcyBvZGlvLiBGdXNjZSBpYWN1bGlzIGxvcmVtIHZlbCBtYXNzYSBwcmV0aXVtIGRhcGlidXMuIE1hdXJpcyBpYWN1bGlzIHJpc3VzIHNvZGFsZXMgbG9ib3J0aXMgZGljdHVtLiBPcmNpIHZhcml1cyBuYXRvcXVlIHBlbmF0aWJ1cyBldCBtYWduaXMgZGlzIHBhcnR1cmllbnQgbW9udGVzLCBuYXNjZXR1ciByaWRpY3VsdXMgbXVzLiBQcm9pbiBjb25kaW1lbnR1bSwgbnVuYyB2aXRhZSBydXRydW0gdWxsYW1jb3JwZXIsIG1hdXJpcyBhbnRlIGJsYW5kaXQgaXBzdW0sIHZlaGljdWxhIG1heGltdXMgbWV0dXMgbWFnbmEgYXQgc2FwaWVuLg=="),
                            theme: "bubble"
                           });
                            //vp.find('img').removeAttribute('src');
                            vp.find('picture').innerHTML = ``;
                            vp.find('.description').textContent = ``;
                            //vp.find('.post').textContent = ``;
                            resolve(state);
                         }
                       }
                       else {
                         resolve(state);
                       }
                    }
                    function priceHandler(amounts,json) {
                            a = 0; do {
                              var vp = amounts[a];
                              vp.find(".dollar").value = json[Object.keys(json)[a]].toString().slice(0,-2);
                              vp.find(".dollar").style.width = (vp.find('.cents').clientWidth * (json[Object.keys(json)[a]].toString().length - 2))+"px";
                              //console.log(json[Object.keys(json)[a]].toString().length);
                              vp.find(".dollar").onkeydown = (e) => {
                                var allowed = [8, 37, 39].includes(e.keyCode);
                                if (!allowed && e.target.value.length === e.target.maxLength) {
                                  e.preventDefault();
                                }
                                if (e.key === ".") {
                                  e.preventDefault();
                                  e.target.nextElementSibling.focus();
                                }
                              };
                              vp.find(".dollar").onkeyup = (e) => { console.log(e.target);
                                var w = vp.find(".cents").clientWidth * e.target.value.length;
                                e.target.style.width = w + "px";
                              };
                              vp.find(".cents").value = json[Object.keys(json)[a]].toString().slice(-2);
                              vp.find(".cents").onkeydown = (e) => {
                                var allowed = [8, 37, 39].includes(e.keyCode);
                                if (!allowed && e.target.value.length === e.target.maxLength) {
                                  e.preventDefault();
                                }
                              };
                            a++; } while(a < amounts.length);
                    }
                    function tags(json) {
                      var html = ``;
                      if(json && json.length > 0) {
                        var d = 0; do { html += `<div>`+json[d]+`</div>`; d++; } while(d < json.length);
                        //console.log({json,html});
                      }
                      return html;
                    }
                  }
                  else {
                      var content = byId('media-files');
                      var files = byId('files').content.children;
                      var media = await db.read.table('media',{app:get[2]});
                      var f = 0, html = ``;
                      if(media.length > 0) { do {
                        var file = files[f];
                        var format = media[f].format;
                        var id = file.dataset.id;
                        var tag = file.cloneNode();
                        var uid = tag.dataset.id = tag.dataset.uid = media[f].uid;
                        tag.className = "figure figure-media media-"+format;
                        var icon = `icon-`+format;

                        file.find('picture img').src = media[f].images[0];
                        file.find('.icon');

                        var figcaption = byId('figcaption').content.firstElementChild.cloneNode(true);
                        figcaption.find('.icon').classList.add(icon);
                        figcaption.find('.glass').dataset.href = "/build/er/"+app+"/media/"+format+'/'+uid+'/';

                        var html1  = file.find('picture').outerHTML+figcaption.outerHTML;

                        tag.innerHTML = html1;
                        html += tag.outerHTML;
                      f++; } while(f < media.length); }
                      content.innerHTML = html; console.log({content,html});
                      resolve(state);
                  }
                }
                else {
                  resolve(state);
                }
              }
              else {
                resolve(state);
              }
            }
            else {
              resolve(state);
            }
          }

        }
        else {
          console.log('/build/',root,app);
          db.read.table('app').then((apps) => {
            console.log('mvc.v',{apps});
            if(apps.length > 0) {
              var projects = byId('projects');
              projects.closest('.projects').classList.remove('empty');
              projects.innerHTML = "";
              var a = 0; do {
                var app = apps[a];
                var project = byId('project').content.firstElementChild.cloneNode(true);
                project.dataset.uid = app.domain;
                project.find('picture').dataset.value = app.domain.charAt(0);
                project.find('.name').textContent = app.name;
                var picture = project.find('figcaption')
                picture.dataset.api = "editor"; // = '/build/er/'+app.domain+'/';
                picture.dataset.method = "project";
                picture.dataset.resource = "read";
                projects.appendChild(project);
              a++; } while(a < apps.length);
            }
          });
          resolve(state);
        }
      }
    } else {
      resolve(state);
    }
  });
}
