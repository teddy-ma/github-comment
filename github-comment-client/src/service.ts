import axios from "axios";

class Service {
  getComments() {
    const r =  axios.create({
      baseURL: "http://localhost:8080/api",
      headers: {
        "Content-type": "application/json"
      }
    });

    return r.get('/comments')
  }

  getAuth() {
    const r =  axios.create({
      baseURL: "http://localhost:8080/api",
      headers: {
        "Content-type": "application/json"
      }
    });
    return r.get("/auth", {});
  }

  createComment() {
    const r =  axios.create({
      baseURL: "http://localhost:8080/api",
      headers: {
        "Content-type": "application/json"
      }
    });
    return r.post("/comment", {})
  }
}

export default new Service();
