let tasks = [
  {
    title: "قراءة كتاب",
    date: "15/10/2030",
    isDone: false,
  },
  {
    title: "انهاء المشروع النهائي",
    date: "15/10/2030",
    isDone: true,
  },
  {
    title: "انهاء دورة الجافاسكريبت",
    date: "15/10/2030",
    isDone: false,
  },
];

function getTaskFromStroge()
{
  let retrivedTasks = JSON.parse(localStorage.getItem("tasks"));


  tasks = retrivedTasks ?? []

  // if (retrivedTasks == null)
  // {
  //   tasks = []
  // } else
  // {
  //   tasks = retrivedTasks
  //   }

}
getTaskFromStroge()


function fillTaskOnPage() {
          document.getElementById("tasks").innerHTML = "";
          let index = 0;
          for (task of tasks) {
            let content = `
        <div class="task ${task.isDone ? "done": ""}">
          <!-- TASK INFO -->
            <div class="task-info">
            <h2>${task.title}</h2>

            <div>
              <span class="material-symbols-outlined">
              calendar_month
              </span>
              <span>${task.date}</span>
            </div>
          </div>

        <!--// TASK INFO //-->

        <!-- TASKS ACTION -->
          <div class="task-actions">
            <button onclick="deleteTask(${index})" class="circular btn-delete">
              <span class="material-symbols-outlined">
              delete
              </span>
          </button>
              ${task.isDone ? `
              <button onclick="toggleTaskCompletion(${index})" class="circular btn-done">
              <span class="material-symbols-outlined">
              cancel
              </span>
            </button>
              
              ` : 
              `
              <button onclick="toggleTaskCompletion(${index})" class="circular btn-isDone">
              <span class="material-symbols-outlined">
              check
              </span>
            </button>
              `}
            
            

          <button onclick="editTask(${index})" class="circular btn-edit">
              <span class="material-symbols-outlined">
              edit
              </span>
            </button>
          </div>

        <!--// TASKS ACTION //-->

        </div>`;
            document.getElementById("tasks").innerHTML += content;
            index++;
  }
}

fillTaskOnPage();

let taskName;
document.getElementById("add-button").addEventListener("click", function () {
  swal({
    text: " 👌أدخل عنوان المهمة يا بطل",
    content: "input",
    button: {
      text: "تأكيد",
      closeModal: true,
    },
  }).then((value) => {
    taskName = value;
    let now = new Date();
    let date =
      now.getDate() +
      "/" +
      (now.getMonth() + 1) +
      "/" +
      now.getFullYear() +
      " | " +
      now.getHours() +
      ":" +
      now.getMinutes();

    let taskObj = {
      title: taskName,
      date: date,
      isDone: false,
    };
    tasks.push(taskObj);
    storeTasks()
    fillTaskOnPage();
  });
});

function deleteTask(index) {
  let task = tasks[index];
  swal({
    title: "هل أنت متأكد من حذف  مهمة: " + task.title,
    text: "للذتكير بمجرد الحذف, لن تتمكن من استعادة هذه المهمة",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((value) => {
    let isConfirmed = value;
    if (isConfirmed == true) {
      tasks.splice(index, 1);
      storeTasks()
      fillTaskOnPage();
    }
  });
}

function editTask(index) {
  let task = tasks[index];
  swal("🤏🏼أدخل عنوان المهمة الجديد", {
    content: {
      element: "input",
      attributes: {
        value: task.title,
      },
    },
    button: {
      text: "تأكيد",
      closeModal: true,
    },
  }).then((value) => {
    let newTaskTitle = value;
    if (newTaskTitle != undefined) {
      task.title = newTaskTitle;
      storeTasks()
      fillTaskOnPage();
    }
  });
}


function toggleTaskCompletion(index)
{
  let task = tasks[index];
  task.isDone = !task.isDone;
  storeTasks()
  fillTaskOnPage()
}

// =========== STORAGE FUNCTION ==============
function storeTasks()
{
  let taskString = JSON.stringify(tasks)
  localStorage.setItem("tasks", taskString)
}
