(function(){
  // Configuration initiale: à éditer par l'utilisateur
  window.CUSTOM_LIST = window.CUSTOM_LIST || [
    { title: "CMTV",  logo: "https://cdn.brandfetch.io/idaBgpGjjj/w/446/h/223/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B", type: "overlay", url: "//popcdn.day/player.php?stream=CMTVPT" },
    { title: "Sport tv 1",  logo: "https://cdn.brandfetch.io/idKvjRibkN/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B", type: "overlay", url: "//popcdn.day/go.php?stream=SPT1" },
    { title: "Sport tv 2",  logo: "https://cdn.brandfetch.io/idKvjRibkN/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B", type: "overlay", url: "//popcdn.day/go.php?stream=SPT2" },
    { title: "Sport tv 3",  logo: "https://cdn.brandfetch.io/idKvjRibkN/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B", type: "overlay", url: "//popcdn.day/go.php?stream=SPT3" },
    { title: "Sport tv 4",  logo: "https://cdn.brandfetch.io/idKvjRibkN/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B", type: "overlay", url: "//popcdn.day/go.php?stream=SPT4" },
    { title: "Sport tv 5",  logo: "https://cdn.brandfetch.io/idKvjRibkN/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B", type: "overlay", url: "//popcdn.day/go.php?stream=SPT5" },
    { title: "TVI",  logo: "https://upload.wikimedia.org/wikipedia/fr/6/63/TVI_logo_2017.png", type: "overlay", url: "https://vsalema.github.io/tvi2/" },
    { title: "SICN",  logo: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/29ad2013589855.562759e048ecd.png", type: "overlay", url: "https://vsalema.github.io/SICN/" },
    { title: "CNN",  logo: "https://e1.pngegg.com/pngimages/206/434/png-clipart-logo-cnn-actualites-logo-de-nbc-medias-texte-rouge-ligne.png", type: "overlay", url: "https://vsalema.github.io/CNN/" },
    { title: "BTV",  logo: "https://upload.wikimedia.org/wikipedia/commons/d/d8/BTV_Black.svg", type: "overlay", url: "//popcdn.day/go.php?stream=BTV1" },
    { title: "DAZN 1 PT",  logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/DAZN_Logo_Master.svg", type: "overlay", url: "//popcdn.day/go.php?stream=ELEVEN1" },
    { title: "DAZN 2 PT",  logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/DAZN_Logo_Master.svg", type: "overlay", url: "//popcdn.day/go.php?stream=ELEVEN2" },
    { title: "DAZN 3 PT",  logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/DAZN_Logo_Master.svg", type: "overlay", url: "//popcdn.day/go.php?stream=ELEVEN3" },
    { title: "DAZN 4 PT",  logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/DAZN_Logo_Master.svg", type: "overlay", url: "//popcdn.day/go.php?stream=ELEVEN4" },
    { title: "DAZN 5 PT",  logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/DAZN_Logo_Master.svg", type: "overlay", url: "//popcdn.day/go.php?stream=ELEVEN5" },
    { title: "Flux Démo",    logo: "https://via.placeholder.com/64x64?text=HLS", type: "media",   url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }
  ];

  function $(id){ return document.getElementById(id); }

  var btnToggle = $('btnToggleCustomList');
  var grp = $('customGroup');
  var list = $('customList');
  var cnt = $('customCount');
  var chan = $('channelList');

  if(!btnToggle || !grp || !list || !cnt || !chan){
    // Rien à faire si le DOM cible n'est pas là
    return;
  }

  function hasFn(name){ return typeof window[name] === 'function'; }

  function openOverlay(url){
    if(hasFn('showOverlay')){ window.showOverlay(url); return; }
    // fallback léger si showOverlay n'existe pas
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.cssText = 'position:fixed;inset:5% 5% auto 5%;width:90%;height:80%;z-index:99999;background:#111;border:1px solid #333;border-radius:12px';
    var close = document.createElement('button');
    close.textContent = '✕';
    close.style.cssText = 'position:fixed;top:6%;right:6%;z-index:100000';
    function cleanup(){ document.body.removeChild(iframe); document.body.removeChild(close); }
    close.onclick = cleanup;
    document.body.appendChild(iframe);
    document.body.appendChild(close);
  }

  function render(){
    list.innerHTML = '';
    var data = Array.isArray(window.CUSTOM_LIST) ? window.CUSTOM_LIST : [];
    cnt.textContent = String(data.length);
    if(!data.length){
      var empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'Aucune entrée dans la liste perso.';
      list.appendChild(empty);
      return;
    }
    data.forEach(function(item){
      var row = document.createElement('div');
      row.className = 'custom-item';
      row.title = item.title || '';

      var img = document.createElement('img');
      img.className = 'logo';
      img.alt = '';
      img.src = item.logo || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

      var name = document.createElement('div');
      name.className = 'name';
      name.textContent = item.title || '(Sans titre)';

      var badge = document.createElement('div');
      badge.className = 'badge';
      badge.textContent = item.type === 'overlay' ? 'Overlay' : 'Média';

      row.appendChild(img);
      row.appendChild(name);
      row.appendChild(badge);

      row.addEventListener('click', function(){
        if(item.type === 'overlay'){ openOverlay(item.url); }
        else if(hasFn('loadSource')){ window.loadSource(item.url); }
      });

      list.appendChild(row);
    });
  }

  var open = false;
  function setOpen(v){
    open = !!v;
    grp.style.display = open ? 'flex' : 'none';
    list.style.display = open ? 'flex' : 'none';
    chan.style.display = open ? 'none' : 'flex';
    btnToggle.setAttribute('aria-pressed', open ? 'true' : 'false');
  }

  btnToggle.addEventListener('click', function(){
    if(!open) render();
    setOpen(!open);
  });
})();
