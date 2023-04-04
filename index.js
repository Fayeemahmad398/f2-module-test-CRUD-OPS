const StudentsData = [];
var NoOfstudents = 0;

function addStudents() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const gpa = document.getElementById("gpa");
  const age = document.getElementById("age");
  const degree = document.getElementById("degree");
  // console.log(name.value);
  //   Checking All inputs ,those should not be empty
  if (
    name.value == "" ||
    email.value == "" ||
    gpa.value == "" ||
    age.value == "" ||
    degree.value == ""
  ) {
    alert("It is  mandatory to fill all the information");
    return;
  }

  NoOfstudents++;

  StudentsData.push({
    ID: NoOfstudents,
    name: name.value,
    age: age.value,
    grade: gpa.value,
    degree: degree.value,
    email: email.value,
  });

  localStorage.setItem(StudentsData, JSON.stringify(StudentsData));

  name.value = "";
  email.value = "";
  gpa.value = "";
  age.value = "";
  degree.value = "";

  // console.log(StudentsData);
  // document.getElementById("name").value="";
  // document.getElementById("email").value="";
  // document.getElementById("gpa").value="";
  // document.getElementById("age").value="";
  // document.getElementById("degree").value="";
  //  console.log(name.value)+" fdg";
  console.log(StudentsData);
  showTableData();
}

function showTableData() {
  var tableBody = document.getElementById("tablebody"); // find the table body as a element here
  while (tableBody.hasChildNodes()) {
    //deleting the child of table means rows
    tableBody.removeChild(tableBody.firstChild);
  }

  tableBody.value = "";

  StudentsData.forEach((studentProfile) => {
    // creating the html element here
    const eachRow = document.createElement("tr");
    const id = document.createElement("td");
    const name = document.createElement("td");
    const age = document.createElement("td");
    const grade = document.createElement("td");
    const degree = document.createElement("td");
    const email = document.createElement("td");

    var Allkeys = Object.keys(studentProfile);
    Allkeys.forEach((key) => {
      if (key == "ID") {
        id.innerHTML = studentProfile[key];
      } else if (key == "name") {
        name.innerHTML = studentProfile[key];
      } else if (key == "age") {
        age.innerHTML = studentProfile[key];
      } else if (key == "grade") {
        grade.innerHTML = studentProfile[key];
      } else if (key == "email") {
        email.innerHTML = studentProfile[key];
      } else {
        degree.innerHTML = `<div>${studentProfile[key]}</div>

         <div class="icons">
        <a onClick="editProfile(${studentProfile["ID"]})" class='fa'>&#xf044;</a>
        <a onClick="deleteProfile(${studentProfile["ID"]})" class='fa'>&#xf1f8;</a> 
        </div> `;
      }
      eachRow.appendChild(id);
      eachRow.appendChild(name);
      eachRow.appendChild(email);
      eachRow.appendChild(age);
      eachRow.appendChild(grade);
      eachRow.appendChild(degree);
  
    });
      tableBody.appendChild(eachRow);
  });
}

function deleteProfile(profileId, index) {
  StudentsData.forEach((eachProfile) => {
    if (eachProfile["ID"] == profileId) {
      StudentsData.splice(index, 1);
      showTableData();
      return;
    }
  });
}

function editProfile(profileid) {
  StudentsData.forEach((profile) => {
    if (profile["ID"] == profileid) {

      document.getElementById("name").value = profile["name"];
      document.getElementById("age").value = profile["age"];
      document.getElementById("degree").value = profile["degree"];
      document.getElementById("gpa").value = profile["grade"];
      document.getElementById("email").value = profile["email"];

      document.getElementById("Addbtn").innerText = "Edit Student";

      document.getElementById("addbtn").onclick() = function selfInvokeFunc() {

        profile["name"] = document.getElementById("name").value;
        profile["age"] = document.getElementById("age").value;
        profile["degree"] = document.getElementById("degree").value;
        profile["grade"] = document.getElementById("gpa").value;
        profile["email"] = document.getElementById("email").value;

        document.getElementById("age").value = "";
        document.getElementById("degree").value = "";
        document.getElementById("gpa").value = "";
        document.getElementById("email").value = "";
        document.getElementById("name").value = "";
        
        document.getElementById("addbtn").innerHTML = "Add Student";

        showTableData();
      };
    }
  });
}


function search() {
  var input, filter, table, tr, td, i, txtValue, txtValue1, txtValue2;
  input = document.getElementById("searching");
  filter = input.value.toUpperCase();
  table = document.getElementById("tablebody");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    td1 = tr[i].getElementsByTagName("td")[2];
    td2 = tr[i].getElementsByTagName("td")[5];

    if (td || td1 || td2) {
      txtValue = td.textContent || td.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;

      if (
        txtValue.toUpperCase().indexOf(filter) > -1 ||
        txtValue1.toUpperCase().indexOf(filter) > -1 ||
        txtValue2.toUpperCase().indexOf(filter) > -1
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

