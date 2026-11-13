(function(){
  // menú móvil
  var bg=document.querySelector('.burger'),nav=document.getElementById('nav');
  if(bg){bg.addEventListener('click',function(){var o=nav.classList.toggle('show');bg.setAttribute('aria-expanded',o);bg.querySelector('span').textContent=o?'Cerrar':'Menú';document.body.classList.toggle('lock',o)})}
  // desplegables
  var dds=document.querySelectorAll('.dd');
  function closeAll(ex){dds.forEach(function(d){if(d!==ex){d.classList.remove('open');d.firstElementChild.setAttribute('aria-expanded','false')}})}
  dds.forEach(function(d){
    var b=d.firstElementChild;
    b.addEventListener('click',function(e){e.stopPropagation();var o=!d.classList.contains('open');closeAll(d);d.classList.toggle('open',o);b.setAttribute('aria-expanded',o)});
    if(matchMedia('(hover:hover) and (min-width:981px)').matches){
      d.addEventListener('mouseenter',function(){closeAll(d);d.classList.add('open');b.setAttribute('aria-expanded','true')});
      d.addEventListener('mouseleave',function(){d.classList.remove('open');b.setAttribute('aria-expanded','false')});
    }
  });
  document.addEventListener('click',function(){closeAll()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeAll();if(nav&&nav.classList.contains('show'))bg.click()}});
  nav&&nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){if(nav.classList.contains('show'))bg.click();closeAll()})});

  // sub-menú: resaltar sección visible
  var sl=document.querySelectorAll('.subnav a');
  if(sl.length&&'IntersectionObserver' in window&&!document.getElementById('grid')){
    var map={};sl.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting&&map[en.target.id]){sl.forEach(function(x){x.classList.remove('on')});map[en.target.id].classList.add('on');map[en.target.id].scrollIntoView({block:'nearest',inline:'nearest'})}})},{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(map).forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el)});
  }

  // trabajos: filtros
  var btns=document.querySelectorAll('.filters button'),items=document.querySelectorAll('#grid figure');
  function filt(f){btns.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.f===f?'true':'false')});items.forEach(function(it){it.hidden=!(f==='all'||it.dataset.c===f)})}
  btns.forEach(function(b){b.addEventListener('click',function(){filt(b.dataset.f)})});
  function fromHash(){var h=location.hash.slice(1);if(items.length&&['calle','redes','web'].indexOf(h)>-1){filt(h);var g=document.getElementById('galeria');if(g)setTimeout(function(){g.scrollIntoView()},30);sl.forEach(function(x){x.classList.toggle('on',x.getAttribute('href')==='#'+h)})}else if(items.length&&(h==='galeria'||h==='')){filt('all');sl.forEach(function(x){x.classList.toggle('on',x.getAttribute('href')==='#galeria')})}else if(items.length&&h==='caso'){sl.forEach(function(x){x.classList.toggle('on',x.getAttribute('href')==='#caso')})}}
  window.addEventListener('hashchange',fromHash);fromHash();

  // lightbox
  var lb=document.getElementById('lb');
  if(lb){var li=document.getElementById('lb-img');
    document.querySelectorAll('#grid figure button').forEach(function(b){b.addEventListener('click',function(){var im=b.querySelector('img');li.src=im.src;li.alt=im.alt;if(lb.showModal)lb.showModal()})});
    document.getElementById('lb-close').addEventListener('click',function(){lb.close()});
    lb.addEventListener('click',function(e){if(e.target===lb)lb.close()});}

  // copiar correo
  var cm=document.getElementById('copy-mail'),msg=document.getElementById('copy-msg');
  if(cm){cm.addEventListener('click',function(){var v=cm.dataset.v;
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(function(){msg.textContent='Correo copiado ✓'},function(){location.href='mailto:'+v})}else{location.href='mailto:'+v}})}

  // contacto: arma el mensaje de WhatsApp
  var f=document.getElementById('wa-form');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();
    var n=f.nombre.value.trim(),ng=f.negocio.value.trim(),m=f.msg.value.trim(),s=[].map.call(f.querySelectorAll('input[name=s]:checked'),function(x){return x.value});
    if(!n){document.getElementById('f-msg').textContent='Escribe tu nombre para continuar.';f.nombre.focus();return}
    var t='Hola Éter Studio, soy '+n+(ng?' de '+ng:'')+'.';
    if(s.length)t+='\nMe interesa: '+s.join(', ')+'.';
    if(m)t+='\n'+m;
    window.open('https://wa.me/50687463346?text='+encodeURIComponent(t),'_blank','noopener');
  })}
})();
