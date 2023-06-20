import axios from "axios";
import {useEffect, useState} from "react";
import {Button, Card, Form, Offcanvas} from "react-bootstrap";
import "./dashboard.style.css";
import moment from "moment";

export default function Dashboard() {
    const url = 'http://localhost:8080/entry';
    const [entries, setEntries] = useState(undefined);
    const [show, setShow] = useState(false);
    const [formState, setFormState] = useState({
        title: '',
        sub_title: '',
        content: ''
    });
    const [currentPostId, setCurrentPostId] = useState(undefined);
    const [offCanvasParams, setOffCanvasParams] = useState({
        title: 'Neuer Post',
        placement: 'start',
        newPost: true
    });

    function handleClose() {
        setShow(false);
        setFormState({
            title: '',
            sub_title: '',
            content: ''
        });
        setOffCanvasParams({
            title: 'Neuer Post',
            placement: 'start',
            newPost: true
        });
        setCurrentPostId(undefined);
    }

    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(url).then((res) => {
            setEntries(res.data.documents);
        });
    }, [currentPostId]);

    function submitPost() {
        if (offCanvasParams.newPost) {
            uploadPost();
        } else {
            updatePost();
        }
    }

    function uploadPost() {
        handleClose();
        if (formState.title !== '' && formState.sub_title !== '' && formState.content !== '') {
            const params = `?title=${formState.title}&sub_title=${formState.sub_title}&content=${formState.content}&user_id=6481b75bd0aefbe149eece12`;
            axios.post(url + params).then((res) => {
                setCurrentPostId(res.data.insertedId);
                console.info('Uploaded new post', res.data.insertedId);
            });
        }
    }

    function deletePost(id) {
        const body = {
            filter: {
                _id: {
                    $oid: id
                }
            }
        };
        axios.delete(url, {data: body}).then((res) => {
            console.info(`Deleted ${res.data.deletedCount} objects`);
            setEntries(entries.filter(entry => entry['_id'] !== id));
        });
    }

    function prepareUpdatePost(id) {
        setCurrentPostId(id);
        setOffCanvasParams({
            title: 'Post aktualisieren',
            placement: 'end',
            newPost: false
        });
        const entry = entries.find((filteredEntry) => filteredEntry['_id'] === id);
        setFormState({
            title: entry.title,
            sub_title: entry.sub_title,
            content: entry.content
        });
        handleShow();
    }

    function updatePost() {
        const body = {
            filter: {
                _id: {
                    $oid: currentPostId
                }
            }
        };
        const params = `?title=${formState.title}&sub_title=${formState.sub_title}&content=${formState.content}`;
        axios.put(url + params, body).then((res) => {
            console.info(`Modified ${res.data.modifiedCount} objects`);
        });
    }

    if (entries) {
        return (
            <div id="content-wrapper">
                <h1>Bongo-Mlog</h1>
                <h2>Dein lieblings Blog!</h2>
                <Button variant="primary" onClick={handleShow}>Neuer Post</Button>
                <div id="entries">
                    {
                        entries.map((entry) => {
                            return (
                                <Card id="entry" key={entry['_id']}>
                                    <Card.Body>
                                        <Card.Title>
                                            <div id="title-wrapper">
                                                {entry.title}
                                                <div id="action-button-wrapper">
                                                    <Button onClick={() => prepareUpdatePost(entry['_id'])}
                                                            variant={"secondary"}>
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Button>
                                                    <Button onClick={() => deletePost(entry['_id'])} variant={"danger"}>
                                                        <i className="bi bi-trash3"></i>
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{entry.sub_title}</Card.Subtitle>
                                        <Card.Text>
                                            {entry.content}
                                            <div id="dates">
                                                <div
                                                    id="created">{moment(entry.created_at).format('MMMM Do YYYY HH:mm:ss')}</div>
                                                <div
                                                    id="created">{moment(entry.updated_at).format('MMMM Do YYYY HH:mm:ss')}</div>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
                <Offcanvas show={show} onHide={handleClose} placement={offCanvasParams.placement}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{offCanvasParams.title}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                <Form.Label>Titel</Form.Label>
                                <Form.Control type="text" placeholder="Anzeigetitel" value={formState.title}
                                              onChange={(e) => {
                                                  setFormState({
                                                      title: e.target.value,
                                                      sub_title: formState.sub_title,
                                                      content: formState.content
                                                  })
                                              }}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicSubTitle">
                                <Form.Label>Untertitel</Form.Label>
                                <Form.Control type="text" placeholder="Untertitel" value={formState.sub_title}
                                              onChange={(e) => {
                                                  setFormState({
                                                      title: formState.title,
                                                      sub_title: e.target.value,
                                                      content: formState.content
                                                  })
                                              }}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicContent">
                                <Form.Label>Inhalt</Form.Label>
                                <Form.Control as="textarea" rows={10} value={formState.content} onChange={(e) => {
                                    setFormState({
                                        title: formState.title,
                                        sub_title: formState.sub_title,
                                        content: e.target.value
                                    })
                                }}/>
                            </Form.Group>
                            <Button variant="primary" onClick={submitPost}>
                                Posten
                            </Button>
                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        );
    }
}
