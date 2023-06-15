const axios = require("axios");

class EntryService {

    getAll() {
        const body = {
            collection: "entry",
            database: "bongo-mlog",
            dataSource: "Cluster0"
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/find', body);
    }

    getById(id) {
        const body = {
            collection: "entry",
            database: "bongo-mlog",
            dataSource: "Cluster0",
            filter: `{"id": ${id}}`
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/find', body);
    }

    createNew(id, title, subTitle, content, userId, createdAt, updatedAt) {
        const body = {
            collection: "entry",
            database: "bongo-mlog",
            dataSource: "Cluster0",
            document: {
                id: id,
                title: title,
                sub_title: subTitle,
                content: content,
                user_id: userId,
                created_at: createdAt,
                updated_at: updatedAt
            }
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/insertOne', body);
    }

    deleteById(id) {
        const body = {
            collection: "entry",
            database: "bongo-mlog",
            dataSource: "Cluster0",
            filter: `{"id": ${id}}`
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/deleteOne', body);
    }

    updateById(id, title, subTitle, content, userId, createdAt, updatedAt) {
        const body = {
            collection: "entry",
            database: "bongo-mlog",
            dataSource: "Cluster0",
            filter: `{"id": ${id}}`,
            update: {
                $set: {
                    title: title,
                    sub_title: subTitle,
                    content: content,
                    user_id: userId,
                    created_at: createdAt,
                    updated_at: updatedAt
                }
            }
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/updateOne', body);
    }
}
