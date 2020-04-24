const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { url , title , techs } = request.body;
    const repositorie = {
      id:uuid(),
      title,
      url,
      techs,
      likes: 0
    }
  
    repositories.push(repositorie);
    
    return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const { title , url , techs, likes } = request.body;

    if(!isUuid(id)){
      return response.status(400).json({ error: 'Invalid Repositorie ID ! 😥'});
    }


    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if(0 === repoIndex.length) {
      return response.status(400).json({ error: 'Repositorie not found ! 😥'});
    }

    if( likes ) {
      return response.status(400).json(repositories[repoIndex])
    }

    const repositorie = {
      id,
      title,
      url,
      techs,
      likes: repositories[repoIndex].likes
    }

    repositories[repoIndex] = repositorie;
    
    return response.json(repositorie)
});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;

    if(!isUuid(id)){
      return response.status(400).json({ error: 'Invalid Repositorie ID ! 😥'});
    }

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if(0 === repoIndex.length) {
      return response.status(400).json({ error: 'Repositorie not found ! 😥'})
    }

    repositories.splice(repoIndex, 1);
    
    return response.status(204).json({success: 'Repositorie deleted with success 😁'})
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    if(!isUuid(id)){
      return response.status(400).json({ error: 'Invalid Repositorie ID ! 😥'});
    }

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if(0 === repoIndex.length) {
      return response.status(400).json({ error: 'Repositorie not found ! 😥'})
    }
    repositories[repoIndex].likes ++;
    const repositorie = repositories[repoIndex];
    
    return response.json(repositorie)
});

module.exports = app;
