const fetchPromise = fetch(" http://localhost:5000/api/v1/courses");

fetchPromise
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
  
