import express from "express";
import crypto from "crypto";

const app = express();

app.use(express.json());

const users = [{
    id: "1663caf2-6f1d-4413-a114-b0cc62c352b8",
    name: "Mateus Nazaré",
    email: "mateus@gmail.com",
}];

app.get("/api/user", (request, response, next) => {
    return response.send(users);
});

app.get("/api/user/:id", (request, response, next) => {
    const id = request.params.id;

    const user = users.find((user) => user.id === id);

    if (!user) {
        return response.status(404).send({
            message: "User not exists"
        });
    }

    return response.send({
        user
    });
});

app.post("/api/user", (request, response, next) => {
    const {
        email,
        name
    } = request.body;

    const user = {
        email,
        name,
        id: crypto.randomUUID()
    };

    users.push(user);

    return response.send(user);
});

app.put("/api/user/:id", (request, response) => {
    // Retornar o usuário atualizado
    // Caso o usuário não exista, exibir status 404 e por uma message

    const id = request.params.id;
    const {
        email,
        name
    } = request.body;

    const user = users.find((user) => user.id === id);

    if (!user) {
        response.status(404).send({
            message: "User not exist"
        });
    }

    user.name = name;
    user.email = email;

    return response.send({
        user
    });
});

app.delete("/api/user/:id", (request, response) => {
    // Retornar status 200 caso o usuário seja removido
    // Retornar status 404 caso o usuário nao existe

    const id = request.params.id;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        response.status(404).send({
            message: "User not exist"
        });
    }

    users.splice(userIndex, 1);

    response.status(200).send();
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});