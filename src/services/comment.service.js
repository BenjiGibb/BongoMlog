const axios = require("axios");

class CommentService {

    getAll() {
        const body = {
            collection: "comment",
            database: "bongo-mlog",
            dataSource: "Cluster0"
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/find', body);
    }

    getById(id) {
        const body = {
            collection: "comment",
            database: "bongo-mlog",
            dataSource: "Cluster0",
            filter: `{"id": ${id}}`
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/find', body);
    }

    createNew(id, title, content, userId, createdAt, blogId) {
        const body = {
            collection: "comment",
            database: "bongo-mlog",
            dataSource: "Cluster0",
            document: {
                id: id,
                title: title,
                content: content,
                user_id: userId,
                created_at: createdAt,
                blog_id: blogId
            }
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/insertOne', body);
    }

    delete(id) {
        const body = {
            collection: "comment",
            database: "bongo-mlog",
            dataSource: "Cluster0",
            filter: `{"id": ${id}}`
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/deleteOne', body);
    }

    updateById(id, title, content, userId, createdAt, blogId, updatedAt) {
        const body = {
            collection: "comment",
            database: "bongo-mlog",
            dataSource: "Cluster0",
            filter: `{"id": ${id}}`,
            update: {
                $set: {
                    id: id,
                    title: title,
                    content: content,
                    user_id: userId,
                    created_at: createdAt,
                    blog_id: blogId
                }
            }
        }
        return axios.post('https://eu-central-1.aws.data.mongodb-api.com/app/data-tcely/endpoint/data/v1/action/updateOne', body);
    }
}
