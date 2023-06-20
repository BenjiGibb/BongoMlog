const axios = require('axios');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const baseURL = 'https://eu-central-1.aws.data.mongodb-api.com/app/data-mbjsw/endpoint/data/v1/action/';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 8080;

app.listen(port, () => {
    console.log(`[server]: Server is listening on port ${port}`)
})

axios.interceptors.request.use((request) => {
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibWFpbCI6ImpvaG5AZG9lLmNvbSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMiwiYXVkIjoiZGF0YS1tYmpzdyIsImV4cCI6OTk5OTk5OTk5OX0.Tph-N5Q_PqzutWxCbi8FTiKquBp6B0eBwty1RqbkUjw';
    if (request.url.includes('mongodb-api.com')) {
        request.headers = {
            'jwtTokenString': jwt
        };
    }
    return request;
});

const entryPath = 'entry';
const entryBody = {
    collection: "entry",
    database: "bongo-mlog",
    dataSource: "Cluster0"
}

/**
 * Filter example
 * Documents are filtered by the filter-field in the request-body.
 *
 * Filter by id:
 * {
 *     "filter": {
 *         "_id": {
 *             "$oid": "64906b7e321ef7b245414d16"
 *         }
 *     }
 * }
 *
 * Filter by title:
 * {
 *     "filter": {
 *         "title": "Testartikel"
 *     }
 * }
 *
 * etc...
 *
 * The fields in filter are automatically getting mapped and filtered.
 *
 */

app.get(`/${entryPath}/`, (req, res) => {
    axios.post(baseURL + 'find', {
        ...entryBody,
        filter: {
            ...req.body.filter
        }
    }).then((result) => {
        res.json(result.data);
    });
});

app.post(`/${entryPath}/`, (req, res) => {
    axios.post(baseURL + 'insertOne', {
        ...entryBody,
        document: {
            id: parseInt(req.query.id),
            title: req.query.title,
            sub_title: req.query.subTitle,
            content: req.query.content,
            user_id: parseInt(req.query.userId),
            created_at: new Date(),
            updated_at: new Date()
        }
    }).then((result) => {
        res.json(result.data)
    });
});

app.delete(`/${entryPath}/`, (req, res) => {
    axios.post(baseURL + 'deleteOne', {
        ...entryBody,
        filter: {
            ...req.body.filter
        }
    }).then((result) => {
        res.json(result.data);
    });
});

app.put(`/${entryPath}/`, (req, res) => {
    axios.post(baseURL + 'updateOne', {
        ...entryBody,
        filter: {
            ...req.body.filter
        },
        update: {
            $set: {
                title: req.query.title,
                sub_title: req.query.subTitle,
                content: req.query.content,
                user_id: parseInt(req.query.userId),
                created_at: req.query.createdAt,
                updated_at: new Date()
            }
        }
    }).then((result) => {
        res.json(result.data);
    });
});

const commentPath = 'comment';
const commentBody = {
    collection: "comment",
    database: "bongo-mlog",
    dataSource: "Cluster0"
}

app.get(`/${commentPath}/`, (req, res) => {
    axios.post(baseURL + 'find', {
        ...commentBody,
        filter: {
            ...req.body.filter
        }
    }).then((result) => {
        res.json(result.data);
    });
});

app.post(`/${commentPath}/`, (req, res) => {
    axios.post(baseURL + 'insertOne', {
        ...commentBody,
        document: {
            id: parseInt(req.query.id),
            title: req.query.title,
            content: req.query.content,
            user_id: parseInt(req.query.userId),
            created_at: new Date(),
            blog_id: parseInt(req.query.blogId)
        }
    }).then((result) => {
        res.json(result.data)
    });
});

app.delete(`/${commentPath}/`, (req, res) => {
    axios.post(baseURL + 'deleteOne', {
        ...commentBody,
        filter: {
            ...req.body.filter
        }
    }).then((result) => {
        res.json(result.data);
    });
});

app.put(`/${commentPath}/`, (req, res) => {
    axios.post(baseURL + 'updateOne', {
        ...commentBody,
        filter: {
            ...req.body.filter
        },
        update: {
            $set: {
                title: req.query.title,
                content: req.query.content,
                user_id: parseInt(req.query.userId),
                created_at: new Date(),
                blog_id: parseInt(req.query.blogId)
            }
        }
    }).then((result) => {
        res.json(result.data);
    });
});

const userPath = 'user';
const userBody = {
    collection: "user",
    database: "bongo-mlog",
    dataSource: "Cluster0"
}

app.get(`/${userPath}/`, (req, res) => {
    axios.post(baseURL + 'find', {
        ...userBody,
        filter: {
            ...req.body.filter
        }
    }).then((result) => {
        res.json(result.data);
    });
});

app.post(`/${userPath}/`, (req, res) => {
    axios.post(baseURL + 'insertOne', {
        ...userBody,
        document: {
            id: parseInt(req.query.id),
            first_name: req.query.firstName,
            last_name: req.query.lastName,
            email: req.query.email,
            birth_date: req.query.birthDate,
        }
    }).then((result) => {
        res.json(result.data)
    });
});

app.delete(`/${userPath}/`, (req, res) => {
    axios.post(baseURL + 'deleteOne', {
        ...userBody,
        filter: {
            ...req.body.filter
        }
    }).then((result) => {
        res.json(result.data);
    });
});

app.put(`/${userPath}/`, (req, res) => {
    axios.post(baseURL + 'updateOne', {
        ...userBody,
        filter: {
            ...req.body.filter
        },
        update: {
            $set: {
                first_name: req.query.firstName,
                last_name: req.query.lastName,
                email: req.query.email,
                birth_date: req.query.birthDate,
            }
        }
    }).then((result) => {
        res.json(result.data);
    });
});
