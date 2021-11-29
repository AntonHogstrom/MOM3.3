const coursesDiv = document.getElementById("coursesDiv"); // getting the div

//GET for all courses
const getCourses = () => { 
    fetch('http://localhost:3000/courses/get') // fetching the courses from the server
    .then(response => response.json()) // converting the response to json
    .then(courses => { // courses is the response from the server
        const data = courses.courses; // getting the courses from the json
        coursesDiv.innerHTML = ""; // clearing the div
        data.forEach(course => { // for each course in the data
            coursesDiv.innerHTML += 
            `
            <div class="courseData_div" id="${course._id}">
                <ul>
                    <li><span class="bold">Course Code: </span>${course.courseCode}</li>
                    <li><span class="bold">Course Name: </span>${course.courseName}</li>
                    <li><span class="bold">Course Period: </span>${course.coursePeriod}</li>
                    <div>
                        <button onclick="deleteCourse('${course._id}')">Delete</button>
                    </div>
                </ul>
            </div>
            `
        });
    });
};

window.addEventListener("DOMContentLoaded", getCourses); // when the page loads, get the courses

//Delete
const deleteCourse = (_id) => { // takes in the id of the course to be deleted
    fetch('http://localhost:3000/courses/' + _id, { // fetching the course
        headers: {  // setting the headers
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        method: "DELETE",
    })
    .then(getCourses); // getting the courses
}

//Post
const addCourse = () => { // adding a course
    fetch('http://localhost:3000/courses/', { // fetching the courses
        headers: { // setting the headers
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ // converting the body to json
            "courseCode": document.getElementById("code").value,
            "courseName": document.getElementById("name").value,
            "coursePeriod": document.getElementById("period").value
        })
    })
    getCourses(); // getting the courses
}
const addSubmit = document.getElementById('addSubmit');
addSubmit.addEventListener('click', (e) => { // when the add button is clicked
    e.preventDefault(); // preventing the default
    addCourse(); // adding the course
})