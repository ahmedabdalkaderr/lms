const nameInput = document.getElementById("course-name");
const imageInput = document.getElementById("course-image");

const formData = new FormData();



const getCourses = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/courses");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};



const addCourse = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/courses",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error adding course:", error);
  }
};

nameInput.addEventListener("change", function () {
  formData.append("name", nameInput.value);
});

imageInput.addEventListener("change", function () {
  formData.append("image", imageInput.files[0]);
  addCourse(formData);
});

getCourses();
