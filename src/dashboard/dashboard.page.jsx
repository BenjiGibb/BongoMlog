import axios from "axios";
import {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import "./dashboard.style.css";

export default function Dashboard() {

    const [entries, setEntries] = useState(undefined);

    useEffect(() => {
        axios.get('http://localhost:8080/entry').then((res) => {
            setEntries(res.data.documents);
        });
    }, []);

    if (entries) {
        return (
            <>
                <h1>Bongo-Mlog</h1>
                <h2>Dein lieblings Blog!</h2>
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
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
            </>
        );
    }
}
