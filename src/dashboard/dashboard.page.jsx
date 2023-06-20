import axios from "axios";
import {useEffect, useState} from "react";
import {Button, Card, Form, Offcanvas} from "react-bootstrap";
import "./dashboard.style.css";
import moment from "moment";

export default function Dashboard() {
    const [entries, setEntries] = useState(undefined);
    const [show, setShow] = useState(false);
    const [formState, setFormState] = useState({
        title: '',
        sub_title: '',
        content: ''
    });
    const [newPostedId, setNewPostedId] = useState(undefined);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get('http://localhost:8080/entry').then((res) => {
            setEntries(res.data.documents);
        });
    }, [newPostedId]);

    function uploadPost() {
        handleClose();
        if (formState.title !== '' && formState.sub_title !== '' && formState.content !== '') {
            const params = `?title=${formState.title}&sub_title=${formState.sub_title}&content=${formState.content}&user_id=6481b75bd0aefbe149eece12`;
            axios.post('http://localhost:8080/entry' + params).then((res) => {
                setNewPostedId(res.data.insertedId);
                console.info('Uploaded new post', res.data.insertedId);
            });
        }
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
                                <Card id="entry" key={entry.id}>
                                    <Card.Body>
                                        <Card.Title>{entry.title}</Card.Title>
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
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Neuer Post</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                <Form.Label>Titel</Form.Label>
                                <Form.Control type="text" placeholder="Anzeigetitel" onChange={(e) => {
                                    setFormState({
                                        title: e.target.value,
                                        sub_title: formState.sub_title,
                                        content: formState.content
                                    })
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicSubTitle">
                                <Form.Label>Untertitel</Form.Label>
                                <Form.Control type="text" placeholder="Untertitel"onChange={(e) => {
                                    setFormState({
                                        title: formState.title,
                                        sub_title: e.target.value,
                                        content: formState.content
                                    })
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicContent">
                                <Form.Label>Inhalt</Form.Label>
                                <Form.Control as="textarea" rows={3}onChange={(e) => {
                                    setFormState({
                                        title: formState.title,
                                        sub_title: formState.sub_title,
                                        content: e.target.value
                                    })
                                }}/>
                            </Form.Group>
                            <Button variant="primary" onClick={uploadPost}>
                                Posten
                            </Button>
                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        );
    }
}
