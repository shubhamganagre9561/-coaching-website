// Simple slider
const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
let idx = 0;
function go(i){
  idx = i;
  slides.style.transform = `translateX(-${i*100}%)`;
  dots.forEach((d,j)=>d.classList.toggle('active', j===i));
}
dots.forEach((d,i)=>d.addEventListener('click', ()=>go(i)));
setInterval(()=>go((idx+1)%dots.length), 4000);

// Drag & drop posters
document.querySelectorAll('.poster').forEach(box=>{
  const input = box.querySelector('input[type=file]');
  input.addEventListener('change', e=>{
    const file = e.target.files[0];
    if(!file) return;
    const img = document.createElement('img');
    img.style.position='absolute';
    img.style.inset='0';
    img.style.width='100%';
    img.style.height='100%';
    img.style.objectFit='cover';
    box.innerHTML='';
    box.appendChild(img);
    const reader = new FileReader();
    reader.onload = ev => img.src = ev.target.result;
    reader.readAsDataURL(file);
  });
});

// Join Now buttons -> add to enrolled list (localStorage) and prompt login if needed
function addCourse(name){
  const user = localStorage.getItem('rps_user');
  if(!user){
    alert('Please login first to join a course.');
    window.location.href = 'login.html';
    return;
  }
  const enrolled = JSON.parse(localStorage.getItem('rps_enrolled')||'[]');
  if(!enrolled.includes(name)){
    enrolled.push(name);
    localStorage.setItem('rps_enrolled', JSON.stringify(enrolled));
    alert(`${name} added to your dashboard!`);
  }else{
    alert(`${name} is already in your dashboard.`);
  }
}
document.querySelectorAll('[data-course]').forEach(btn=>{
  btn.addEventListener('click', ()=>addCourse(btn.dataset.course));
});
