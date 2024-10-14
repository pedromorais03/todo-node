const taskForm = document.getElementById('task-form')
const taskDiv = document.querySelector('.task-list')

let bgColor = ''
let msg = ''

window.addEventListener('load', () => {
   const xhr = new XMLHttpRequest
   xhr.open('GET', 'http://localhost:3000/api/tasks', true)
   xhr.onload = () => {
      if(xhr.status === 200){
         const res = JSON.parse(xhr.responseText)

         res.forEach(data => {
            if(data.completed){
               bgColor = '#0041C2'
               msg ='A tarefa está completa!'
            }else{
               bgColor = '#E1C16E'
               msg = 'A tarefa não está completa!'
            }
            taskDiv.innerHTML += `<div style='background-color: ${bgColor}' class='task'> 
                                    <span class='task-id'> ${data.taskId} </span>
                                    <h3>${data.title}</h3> 
                                    <span>${data.description}</span>
                                    <span>${msg}</span> 
                                    <button onclick='delete_task("${data._id}")' type="submit" class="btn-delete">Deletar</button>
                                    <button onclick='update_task("${data._id}", "${data.completed}")' type="submit" class="btn-update">Concluir Tarefa</button>
                                  </div>`
         });
         // taskDiv.innerHTML += `<div class='task'> <h3>${res.title}</h3> <span>${res.desc}</span> </div>`
      }
   }
   xhr.send()
})

async function insert_task(){
   const title = document.getElementById('task-title').value
   const desc = document.getElementById('task-desc').value

   const xhr = new XMLHttpRequest
   xhr.open('POST', 'http://localhost:3000/api/tasks', true)
   xhr.setRequestHeader('Content-Type', 'application/json')

   xhr.onload = () => {
      if(xhr.status === 200){
         const res = JSON.parse(xhr.responseText)
         console.log(`Response: ${res}`)
      }
   }

   const data = JSON.stringify({
      title: title,
      description: desc
   })

   xhr.send(data)
}

async function delete_task(id){
   console.log(id)
   const taskId = id

   const xhr = new XMLHttpRequest
   xhr.open('DELETE', `http://localhost:3000/api/tasks/${taskId}`, true)
   xhr.setRequestHeader('Content-Type', 'application/json')

   xhr.onload = () => {
      if(xhr.status === 200){
         const res = JSON.parse(xhr.responseText)
         console.log(`Response: ${res}`)
      }
   }

   xhr.send()
   location.reload()
}

async function update_task(id, isCompleted){
   console.log(id)
   const taskId = id 

   const xhr = new XMLHttpRequest
   xhr.open('PUT', `http://localhost:3000/api/tasks/${taskId}`, true)
   xhr.setRequestHeader('Content-Type', 'application/json')

   xhr.onload = () => {
      if(xhr.status === 200){
         const res = JSON.parse(xhr.responseText)
         console.log(`Response: ${res}`)
      }
   }

   
   const data = JSON.stringify({
      completed: true,
   })

   xhr.send(data)
   location.reload()
}