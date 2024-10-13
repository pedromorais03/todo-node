const taskForm = document.getElementById('task-form')
const taskDiv = document.querySelector('.task-list')

taskForm.addEventListener('submit', async (e) => {
   e.preventDefault()

   const title = document.getElementById('task-title').value
   const desc = document.getElementById('task-desc').value
   const res = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, desc })
   })

   const task = await res.json()
   taskDiv.innerHTML += `<div class='task'> <h3>${task.title}</h3> <span>${task.desc}</span> </div>`
})