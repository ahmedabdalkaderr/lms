
const getUsers = async function (query = "") {
  try {
    const res = await axios.get(`http://localhost:5000/api/v1/users${query}`);
    console.log(res.data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const newData = {
  instructor: "y",
};

const updateUser = async function () {
  try {
    const res = await axios
      .put("http://localhost:5000/api/v1/courses/65f4f26f9854fa3d14702d4c", {
        instructor: "a",
      })
   const data = await res.data;
   console.log(data)
  } catch (error) {
    console.error("Error updating course:", error);
  }
};

updateUser()
