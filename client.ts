async function createTask(title: string, description: string, status: string) {
  const url = 'http://localhost:5000/v1/tasks';
  let res = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      status,
    }),
  });

  let json = await res.json();
  return json;
}

async function getTasks() {
  const url = 'http://localhost:5000/v1/tasks';
  let res = await fetch(url);
  let json = await res.json();
  return json;
}

async function getTask(id: string) {
  const url = `http://localhost:5000/v1/tasks/${id}`;
  let res = await fetch(url);
  let json = await res.json();
  return json;
}

async function updateTask(id: string, title: string, description: string, status: string) {
  const url = `http://localhost:5000/v1/tasks/${id}`;
  let res = await fetch(url, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      status,
    }),
  });
  let json = await res.json();
  return json;
}

async function deleteTask(id: string) {
  const url = `http://localhost:5000/v1/tasks/${id}`;
  await fetch(url, { method: 'DELETE' });
}


async function main() {
  const createdTask = await createTask('T', 'T', 'pending');
  console.log(createdTask);
  let { data: tasks } = await getTasks();
  console.log(tasks);
  const id = tasks[0].id;
  const task = await getTask(id);
  console.log(task);
  const updatedTask = await updateTask(id, 'Task Update', 'Updated task', 'done');
  console.log(updatedTask);
  await deleteTask(id);
  const { data: newTasks } = await getTasks();
  console.log(newTasks);
}

main();
