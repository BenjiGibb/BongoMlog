const axios = require("axios");

class UserService {

    getAll() {
        const body = {
            collection: "user",
            database: "bongo-mlog",
            dataSource: "Cluster0"
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/find', body);
    }

    getById(id) {
        const body = {
            collection: "user",
            database: "bongo-mlog",
            dataSource: "Cluster0",
            filter: `{"id": ${id}}`
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/find', body);
    }

    createNew(id, firstName, lastName, email, birthDate) {
        const body = {
            collection: "user",
            database: "bongo-mlog",
            dataSource: "Cluster0",
            document: {
                id: id,
                first_name: firstName,
                last_name: lastName,
                email: email,
                birth_date: birthDate,
            }
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/insertOne', body);
    }

    deleteById(id) {
        const body = {
            collection: "user",
            database: "bongo-mlog",
            dataSource: "Cluster0",
            filter: `{"id": ${id}}`
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/deleteOne', body);
    }

    updateById(id, firstName, lastName, email, birthDate) {
        const body = {
            collection: "user",
            database: "bongo-mlog",
            dataSource: "Cluster0",
            filter: `{"id": ${id}}`,
            update: {
                $set: {
                    id: id,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    birth_date: birthDate,
                }
            }
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/updateOne', body);
    }
}
